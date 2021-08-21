import { GameStatus, NFLGame, NFLSchedule } from '../types';
import { EspnNfl, EventsEntity } from './EspnNflTypes';

const getEspnNflData = async (): Promise<NFLSchedule | undefined> => {
  const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`;

  try {
    const response = await fetch(url);
    const data: EspnNfl = await response.json();

    return labelData(data);
  } catch {
    return undefined;
  }
};

const labelData = (data: EspnNfl): NFLSchedule => {
  const games = data.events?.map(g => labelGame(g)) ?? [];

  const seasonName = data.leagues[0].season.type.name;
  const weekNumber = data.week.number;

  const displayDate = `${seasonName} week ${weekNumber}`;

  return { displayDate, games };
};

const labelGame = (game: EventsEntity): NFLGame => {
  const homeCompetitor = game?.competitions?.[0]?.competitors?.find(
    e => e.homeAway === 'home'
  );

  const awayCompetitor = game?.competitions?.[0]?.competitors?.find(
    e => e.homeAway === 'away'
  );

  let homeTeam = homeCompetitor?.team.name || '';
  let awayTeam = awayCompetitor?.team.name || '';

  if (homeCompetitor?.team.location.toLocaleLowerCase() === 'washington')
    homeTeam = 'Football Team';

  if (awayCompetitor?.team.location.toLocaleLowerCase() === 'washington')
    awayTeam = 'Football Team';

  let status: GameStatus = {
    type: 'TIME_STRING',
    value: game.date,
    format: 'DAY_TIME'
  };

  if (game.status.type.state === 'postponed') {
    status = { type: 'GAMESTATUS_STRING', value: 'Postponed' };
  }

  if (game.status.type.state === 'post') {
    status = { type: 'GAMESTATUS_STRING', value: 'Final' };
  }

  let startTime = game.date;

  const homeTeamScore = game.competitions?.[0]?.competitors?.[0].score;
  const awayTeamScore = game.competitions?.[0]?.competitors?.[1].score;

  let homeTeamWinning;
  let awayTeamWinning;

  if (homeTeamScore && awayTeamScore) {
    homeTeamWinning = parseInt(homeTeamScore) > parseInt(awayTeamScore);
    awayTeamWinning = parseInt(awayTeamScore) > parseInt(homeTeamScore);
  }

  return {
    id: game.id,
    status,
    startTime,
    homeTeam,
    awayTeam,
    redzone: false,
    homeTeamScore,
    awayTeamScore,
    homeTeamWinning,
    awayTeamWinning
  };
};

export default getEspnNflData;
