import { nflTeamsInfo } from './teamInfo';
import { GameStatus, NFLGame, NFLSchedule } from '../types';
import { LiveUpdateApiI, LiveUpdateGameObjI } from './LiveUpdateApiTypes';
import getEspnNflData, { EsnpSchedule } from './getEspnNflData';

const getNFLData = async (): Promise<NFLSchedule> => {
  const url = `https://static.nfl.com/liveupdate/scores/scores.json`;

  const response = await fetch(url, { mode: 'cors' });
  const data: LiveUpdateApiI = await response.json();

  const schedule = labelData(data);

  const espnSchedule = await getEspnNflData();
  if (espnSchedule) return mergeEspnData(schedule, espnSchedule);

  return schedule;
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
   * Score
   */

  let homeTeamScore = game.home.score.T ?? undefined;
  let awayTeamScore = game.away.score.T ?? undefined;

  // do not show 0 as score if pregame
  if (homeTeamScore === 0 && awayTeamScore === 0 && game.qtr === 'Pregame') {
    homeTeamScore = undefined;
    awayTeamScore = undefined;
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
    if (playing) {
      const quarter = parseInt(game.qtr, 10) > 4 ? 'OT' : `${game.qtr}Q`;
      status = {
        type: 'GAMESTATUS_STRING',
        value: `${quarter}, ${game.clock}`
      };
    } else {
      let value = game.qtr;
      if (game.qtr === 'final overtime') value = 'final OT';
      status = {
        type: 'GAMESTATUS_STRING',
        value: value
      };
    }
  } else {
    const t = `${id.substring(4, 6)}.${id.substring(6, 8)}`;

    status = {
      type: 'DATE_STRING',
      value: t
    };
  }

  return {
    id,
    status,
    redzone: game.redzone ?? false,

    homeTeam: nflTeamsInfo[game.home.abbr]?.name || game.home.abbr,
    homeTeamScore,
    homeTeamWinning,
    homeTeamHasPosession,

    awayTeam: nflTeamsInfo[game.away.abbr]?.name || game.away.abbr,
    awayTeamScore,
    awayTeamWinning,
    awayTeamHasPosession
  };
};

const mergeEspnData = (
  season: NFLSchedule,
  espnSchedule: EsnpSchedule
): NFLSchedule => {
  const mergedSchedule: NFLSchedule = { ...season };

  // are the two APIs on the same week? if we've found a matching game, yes
  let foundAtLeastOneMatchingGame = false;

  mergedSchedule.games = season.games.map(g => {
    // find by home and away team because no guarantee the weeks are lined up
    // between the two APIs (e.g. when do weeks switch to next, tues, mon midnight)
    const espnMatchingGame = espnSchedule?.games?.find(
      eg => eg.homeTeam === g.homeTeam && eg.awayTeam === g.awayTeam
    );

    if (espnMatchingGame) foundAtLeastOneMatchingGame = true;

    if (g.status.type === 'DATE_STRING' && espnMatchingGame?.status) {
      return { ...g, status: espnMatchingGame.status };
    }

    return { ...g };
  });

  // only override the display date if the two APIs are on the same week
  if (foundAtLeastOneMatchingGame)
    mergedSchedule.displayDate = espnSchedule.displayDate ?? season.displayDate;

  return mergedSchedule;
};

export default getNFLData;
