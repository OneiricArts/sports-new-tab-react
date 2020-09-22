import { formatDate } from '../helpers';
import { Game, GameStatus, Schedule } from '../types';
import { GamesEntity, NHLApi } from './apiTypes';

const nhlDataUrl = (date: Date) => {
  const startDate = formatDate(
    date,
    ({ yyyy, mm, dd }) => `${yyyy}-${mm}-${dd}`
  );
  const endDate = formatDate(date, ({ yyyy, mm, dd }) => `${yyyy}-${mm}-${dd}`);

  const expandOptions = [
    'schedule.teams',
    'schedule.linescore'
    // 'schedule.broadcasts.all',
    // 'schedule.ticket',
    // 'schedule.game.content.media.epg',
    // 'schedule.radioBroadcasts',
    // 'schedule.metadata',
    // 'schedule.game.seriesSummary,seriesSummary.series',
  ].join(',');

  const paramOptions = [
    // 'leaderCategories=',
    // 'leaderGameTypes=R',
    // 'site=en_nhl',
    // 'teamId=',
    // 'gameType=',
    // 'timecode=',
  ].join('&');

  const url = [
    `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${startDate}&endDate=${endDate}`,
    `&expand=${expandOptions}`,
    `&${paramOptions}`
  ].join('');

  return url;
};

const getNhlData = async (date = new Date()) => {
  const data: NHLApi = await (await fetch(nhlDataUrl(date))).json();

  return labelData(data, date);
};

const labelData = (data: NHLApi, date: Date): Schedule => {
  const games: Game[] | undefined = data.dates?.[0]?.games
    ?.filter(g => g)
    ?.map(g => labelGame(g));

  return {
    displayDate: formatDate(date, ({ mm, dd }) => `${mm}.${dd}`),
    games: games || []
  };
};

const labelGame = (game: GamesEntity): Game => {
  const homeTeamScore = game.teams.home.score;
  const awayTeamScore = game.teams.away.score;

  const homeTeamWinning = homeTeamScore > awayTeamScore;
  const awayTeamWinning = awayTeamScore > homeTeamScore;

  let status: GameStatus;
  if (game.status.abstractGameState === 'Final') {
    status = { type: 'GAMESTATUS_STRING', value: game.status.detailedState };
  } else if (game.status.abstractGameState === 'Live') {
    // use game.linescore.currentPeriodOrdinal if includes "OT"?
    status = {
      type: 'GAMESTATUS_STRING',
      value: `${game.linescore.currentPeriodOrdinal} ${game.linescore.currentPeriodTimeRemaining}`
    };
  } else {
    status = {
      type: 'TIME_STRING',
      value: game.gameDate
    };
  }

  return {
    id: game.gamePk,
    status: status,

    awayTeam: game.teams.away.team.teamName,
    awayTeamScore,
    awayTeamWinning,

    homeTeam: game.teams.home.team.teamName,
    homeTeamScore,
    homeTeamWinning
  };
};

export default getNhlData;
