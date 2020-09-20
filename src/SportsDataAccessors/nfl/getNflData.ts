import { nflTeamsInfo } from './teamInfo';
import { GameStatus, NFLGame, NFLSchedule } from '../types';
import { LiveUpdateApiI, LiveUpdateGameObjI } from './LiveUpdateApiTypes';

const getNFLData = async (): Promise<NFLSchedule> => {
  const url = `https://static.nfl.com/liveupdate/scores/scores.json`;

  const response = await fetch(url, { mode: 'cors' });
  const data: LiveUpdateApiI = await response.json();

  return labelData(data);
};

type LabelDataI = (data: LiveUpdateApiI) => NFLSchedule;

const labelData: LabelDataI = data => {
  const games: NFLSchedule['games'] = [];

  Object.entries(data)
    .sort(([gameId1], [gameId2]) => gameId1.localeCompare(gameId2))
    .forEach(([gameId, gameData]) => {
      games.push(labelGame(gameId, gameData));
    });

  return { displayDate: '', games };
};

const labelGame = (id: string, game: LiveUpdateGameObjI): NFLGame => {
  /**
   * Is the game currently playing?
   */
  let playing = false;

  // https://github.com/microsoft/TypeScript/issues/4002 isNaN only accepts numbers
  if (game.qtr && !game.qtr.includes('Final') && !isNaN(game.qtr as any)) {
    playing = true;
  }

  /**
   * Who is winning
   */
  let homeTeamWinning: boolean | undefined;
  let awayTeamWinning: boolean | undefined;

  if (game.home.score.T !== null && game.away.score.T !== null) {
    const homeScore = game.home.score.T;
    const visitorScore = game.away.score.T;

    if (homeScore > visitorScore) {
      homeTeamWinning = true;
    }
    if (visitorScore > homeScore) {
      awayTeamWinning = true;
    }
  }

  /**
   * Who has possession
   */
  let homeTeamHasPosession: boolean | undefined;
  let awayTeamHasPosession: boolean | undefined;

  if (playing && game.posteam === game.home.abbr) {
    homeTeamHasPosession = true;
  } else if (playing && game.posteam === game.away.abbr) {
    awayTeamHasPosession = true;
  }

  /**
   * Status
   */
  let status: GameStatus;

  if (game.qtr && game.qtr !== 'Pregame') {
    status = {
      type: 'GAMESTATUS_STRING',
      value: playing ? `${game.qtr}Q, ${game.clock}` : game.qtr
    };
  } else {
    const t = `${id.substring(4, 6)}.${id.substring(6, 8)}`;

    status = {
      type: 'GAMESTATUS_STRING',
      value: t
    };
  }

  return {
    id,
    status,
    redzone: game.redzone ?? false,

    homeTeam: nflTeamsInfo[game.home.abbr]?.name || game.home.abbr,
    homeTeamScore: game.home.score.T ?? undefined,
    homeTeamWinning,
    homeTeamHasPosession,

    awayTeam: nflTeamsInfo[game.away.abbr]?.name || game.away.abbr,
    awayTeamScore: game.away.score.T ?? undefined,
    awayTeamWinning,
    awayTeamHasPosession
  };
};

export default getNFLData;
