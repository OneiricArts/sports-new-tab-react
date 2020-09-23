import { formatDate, isDaylightSavingsTimeOn } from '../helpers';
import { Game, GameStatus, Schedule } from '../types';
import { GameEntity, MLBApi } from './apiTypes';

const getMlbData = async (date = new Date()) => {
  const url = `https://gd2.mlb.com/components/game/mlb/${formatDate(
    date,
    ({ yyyy, mm, dd }) => `year_${yyyy}/month_${mm}/day_${dd}`
  )}/master_scoreboard.json`;

  const data: MLBApi = await (await fetch(url)).json();

  return labelData(data, date);
};

const labelData = (data: MLBApi, date: Date): Schedule => {
  let games: GameEntity[] = [];

  if (!data.data.games.game) {
    games = [];
  } else if (!Array.isArray(data.data.games.game)) {
    games = [data.data.games.game];
  } else {
    games = data.data.games.game;
  }

  return {
    displayDate: formatDate(date, ({ mm, dd }) => `${mm}.${dd}`),
    games: games.map(g => labelGame(g, date))
  };
};

const labelGame = (game: GameEntity, date: Date): Game => {
  let awayTeamWinning: boolean | undefined;
  let homeTeamWinning: boolean | undefined;

  let awayTeamScore: number | undefined;
  let homeTeamScore: number | undefined;

  if (game.linescore) {
    awayTeamScore = parseInt(game.linescore.r.away, 10);
    homeTeamScore = parseInt(game.linescore.r.home, 10);

    homeTeamWinning = homeTeamScore > awayTeamScore;
    awayTeamWinning = awayTeamScore > homeTeamScore;
  }

  /**
   * Clear out random 0's in score columns for games that have not started yet
   */
  if (
    game.status.status !== 'In Progress' &&
    awayTeamScore === 0 &&
    homeTeamScore === 0
  ) {
    awayTeamScore = undefined;
    homeTeamScore = undefined;
  }

  let status: GameStatus;
  const timezone = isDaylightSavingsTimeOn(date) ? 'EDT' : 'EST';

  if (
    game.status.status === 'Final' ||
    game.status.status === 'Postponed' ||
    game.status.status === 'Delayed' ||
    game.time === 'TBD'
  ) {
    status = { type: 'GAMESTATUS_STRING', value: game.status.status };
  } else if (game.tbd_flag === 'Y') {
    status = { type: 'GAMESTATUS_STRING', value: 'TBD' };
  } else if (game.status.status === 'Game Over') {
    status = { type: 'GAMESTATUS_STRING', value: 'Final' };
  } else if (game.status.status === 'In Progress') {
    let symbol = '';
    // TODO top/bottom of inning flag
    if (game.status.inning_state === 'Top') symbol = ' ▲';
    if (game.status.inning_state === 'Bottom') symbol = ' ▼';

    // status = { type: 'GAMESTATUS_STRING', value: game.status.inning };
    status = {
      type: 'GAMESTATUS_STRING',
      value: `${game.status.inning}${symbol}`
    };
  } else {
    // game.status.status === 'Preview' ||
    // game.status.status === 'Pre-Game' ||
    // game.status.status === 'Warmup'
    status = {
      type: 'TIME_STRING',
      value: `${game.time_date} ${game.ampm} ${timezone}` // TODO verify
    };
  }

  return {
    id: game.game_pk,
    status,

    awayTeam: game.away_team_name,
    awayTeamScore,
    awayTeamWinning,

    homeTeam: game.home_team_name,
    homeTeamScore,
    homeTeamWinning
  };
};

export default getMlbData;
