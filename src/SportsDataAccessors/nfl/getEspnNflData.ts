import { GameStatus, NFLGame } from '../types';
import { EspnNfl, EventsEntity } from './EspnNflTypes';

type EspnGame = Partial<NFLGame>;

export type EsnpSchedule = {
  displayDate?: string;
  games?: EspnGame[];
};

const getEspnNflData = async (): Promise<EsnpSchedule | undefined> => {
  const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`;

  try {
    const response = await fetch(url);
    const data: EspnNfl = await response.json();

    return labelData(data);
  } catch {
    return undefined;
  }
};

const labelData = (data: EspnNfl): EsnpSchedule => {
  const games = data.events?.map(g => labelGame(g));

  const seasonName = data.leagues[0].season.type.name;
  const weekNumber = data.week.number;

  const displayDate = `${seasonName} week ${weekNumber}`;

  return { displayDate, games };
};

const labelGame = (game: EventsEntity): EspnGame => {
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

  let startTime = game.date;

  return {
    status,
    startTime,
    homeTeam,
    awayTeam
  };
};

export default getEspnNflData;
