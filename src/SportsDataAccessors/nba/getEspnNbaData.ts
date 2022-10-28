import { ReactNode } from 'react';
import { nbaDisplayName } from '../../components/NBADisplayName';
import { getNbaExpandedContent } from '../../components/NBAExpandedContent';
import { Game, GameStatus, Schedule } from '../types';
import { EspnNbaScoreboard, EventsEntity } from './EspnNbaScoreboard';
import { EspnNbaStandings, rankings, stats, TeamRecords } from './espnRankings';

const getEspnNbaData = async (): Promise<{
  schedule: Schedule;
  standings?: EspnNbaStandings;
}> => {
  const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard`;

  const response = await fetch(url);
  const data: EspnNbaScoreboard = await response.json();

  const rankingInfo = await rankings();

  return {
    schedule: labelData(data, rankingInfo.teamRecords),
    standings: rankingInfo.standings
  };
};

const labelData = (data: EspnNbaScoreboard, teamRecords: TeamRecords) => {
  const games = data.events?.map(g => labelGame(g, teamRecords)) ?? [];

  let displayDate = data.day.date;
  try {
    const dayArr = data.day.date.split('-');
    displayDate = `${dayArr[1]}.${dayArr[2]}`;
  } catch {}

  return { games, displayDate };
};

const labelGame = (game: EventsEntity, teamRecords: TeamRecords): Game => {
  // TODO if these arent found?
  const homeCompetitor = game?.competitions?.[0]?.competitors?.find(
    e => e.homeAway === 'home'
  )!;

  const awayCompetitor = game?.competitions?.[0]?.competitors?.find(
    e => e.homeAway === 'away'
  )!;

  let homeTeam = homeCompetitor.team.name;
  let awayTeam = awayCompetitor.team.name;

  let homeTeamAbrv = homeCompetitor.team.abbreviation;
  let awayTeamAbrv = awayCompetitor.team.abbreviation;

  let status: GameStatus = {
    type: 'TIME_STRING',
    value: game.date
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
  if (game.competitions?.[0]?.broadcasts?.[0]?.names?.length) {
    broadcaster = game.competitions?.[0]?.broadcasts?.[0]?.names?.join(', ');
  }

  let isOnNationalTv = Boolean(broadcaster);

  const homeStats = stats(homeTeamAbrv, teamRecords);
  const awayStats = stats(awayTeamAbrv, teamRecords);

  const expandedContent = getNbaExpandedContent({
    broadcaster,
    awayTeam,
    homeTeam,
    awayTeamRecord: awayStats?.record,
    homeTeamRecord: homeStats?.record,
    awayTeamRank: awayStats.confRank?.toString(),
    homeTeamRank: homeStats.confRank?.toString()
  });

  const awayTeamDisplay = () => getDisplayName(awayTeam, awayStats);
  const homeTeamDisplay = () => getDisplayName(homeTeam, homeStats);

  return {
    id: game.id,
    status,
    startTime,
    homeTeam,
    awayTeam,
    homeTeamScore,
    awayTeamScore,
    homeTeamWinning,
    awayTeamWinning,
    awayTeamDisplay,
    homeTeamDisplay,
    expandedContent,
    isOnNationalTv
  };
};

export default getEspnNbaData;

const getDisplayName = (
  team: string,
  rank?: { isWinStreak: boolean; streak: number; confRank: number }
): ReactNode => {
  if (!rank) return team;

  const winStreak = rank.isWinStreak ? rank.streak : 0;
  const loseStreak = rank.isWinStreak ? 0 : rank.streak;
  const confRank = rank.confRank;

  return nbaDisplayName(team, confRank, winStreak, loseStreak);
};
