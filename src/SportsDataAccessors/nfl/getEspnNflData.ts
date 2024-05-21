import { getExpandedContent } from '../../components/NFL';
import { GameStatus, NFLGame, NFLSchedule } from '../types';
import { EspnNfl, EventsEntity } from './EspnNflTypes';

const seasonTypeNames = {
  1: 'Preseason',
  2: 'Regular Season',
  3: 'Postseason',
  4: 'Off Season'
} as const;

type SeasonNames = typeof seasonTypeNames[keyof typeof seasonTypeNames];

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

  // const seasonName = data.leagues?.[0].season.type.name;
  const weekNumber = data.week.number;
  let displayDate: string;

  // TODO cleanup
  const seasonName = seasonTypeNames[data.season.type as 1 | 2 | 3 | 4] as
    | SeasonNames
    | undefined;
  if (seasonName) displayDate = `${seasonName} week ${weekNumber}`;
  else displayDate = `week ${weekNumber}`;

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

  // if (homeCompetitor?.team.location.toLocaleLowerCase() === 'washington')
  //   homeTeam = 'Football Team';

  // if (awayCompetitor?.team.location.toLocaleLowerCase() === 'washington')
  //   awayTeam = 'Football Team';

  let status: GameStatus = {
    type: 'TIME_STRING',
    value: game.date,
    format: 'DAY_TIME'
  };

  if (game.status.type.state === 'postponed') {
    status = { type: 'GAMESTATUS_STRING', value: 'Postponed' };
  } else if (game.status.type.name === 'STATUS_HALFTIME') {
    status = { type: 'GAMESTATUS_STRING', value: 'Half' };
  } else if (game.status.type.state === 'post') {
    status = { type: 'GAMESTATUS_STRING', value: 'Final' };
  } else if (game.status.type.state === 'in') {
    status = {
      type: 'GAMESTATUS_STRING',
      value: `${game.status.displayClock} ${
        game.status.period > 4 ? 'OT' : `${game.status.period}Q`
      }`
    };
  }

  let startTime = game.date;

  let homeTeamScore = game.competitions?.[0]?.competitors?.[0].score;
  let awayTeamScore = game.competitions?.[0]?.competitors?.[1].score;

  // do not show 0 as score if pregame
  if (
    homeTeamScore === '0' &&
    awayTeamScore === '0' &&
    game.status.type.state === 'pre'
  ) {
    homeTeamScore = undefined;
    awayTeamScore = undefined;
  }

  let homeTeamWinning;
  let awayTeamWinning;

  if (homeTeamScore && awayTeamScore) {
    homeTeamWinning = parseInt(homeTeamScore) > parseInt(awayTeamScore);
    awayTeamWinning = parseInt(awayTeamScore) > parseInt(homeTeamScore);
  }

  let broadcaster: string | undefined;
  let lastPlay: string | undefined;

  if (game.competitions?.[0]?.broadcasts?.[0]?.names?.length) {
    broadcaster = game.competitions?.[0]?.broadcasts?.[0]?.names?.join(', ');
  }

  if (game.competitions?.[0].situation?.lastPlay?.text) {
    lastPlay = game.competitions?.[0].situation?.lastPlay?.text;
  }

  const expandedContent =
    broadcaster || lastPlay
      ? getExpandedContent(broadcaster, lastPlay)
      : undefined;

  // let homeTeamIndex = game.competitions?.[0]?.competitors?.find(
  //   c => c.homeAway === 'home'
  // );

  // let awayTeamIndex = game.competitions?.[0]?.competitors?.find(
  //   c => c.homeAway === 'away'
  // );

  // TODO fix typo in posession
  let awayTeamHasPosession = false;
  let homeTeamHasPosession = false;
  if (
    game.competitions?.[0]?.competitors?.[0]?.id ===
    (game as any).competitions?.[0]?.situation?.possession
  ) {
    homeTeamHasPosession = true;
  } else if (
    game.competitions?.[0].competitors?.[1]?.id ===
    (game as any).competitions?.[0]?.situation?.possession
  ) {
    awayTeamHasPosession = true;
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
    awayTeamWinning,
    homeTeamHasPosession,
    awayTeamHasPosession,
    expandedContent
  };
};

export default getEspnNflData;
