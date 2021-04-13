import { ApiMatchType } from './apiMatchType';
import { ChampionsLeagueGame } from './getChampionsLeagueData';
import { GameStatus } from '../types';

export const apiDataToGame = (matchInfo: ApiMatchType): ChampionsLeagueGame => {
  /**
   * Score
   */
  // TODO fix if only one match
  let homeTeamWinning = false;
  let awayTeamWinning = false;

  const score = matchInfo.relatedMatches?.[0]?.score ?? matchInfo.score;

  const aggregateHomeScore = score?.aggregate?.home;
  const aggregateAwayScore = score?.aggregate?.away;
  const homeScore = score?.total?.home;
  const awayScore = score?.total?.away;

  homeTeamWinning =
    matchInfo.relatedMatches?.[0]?.winner?.match?.team?.teamCode ===
    matchInfo.relatedMatches?.[0].homeTeam?.teamCode;

  awayTeamWinning =
    matchInfo.relatedMatches?.[0]?.winner?.match?.team?.teamCode ===
    matchInfo.relatedMatches?.[0]?.awayTeam?.teamCode;

  let homeTeamScore: number | string | undefined = homeScore;
  let awayTeamScore: number | string | undefined = awayScore;

  if (
    matchInfo?.leg.number === 2 &&
    [homeScore, aggregateHomeScore, awayScore, aggregateAwayScore].every(
      s => s !== undefined
    )
  ) {
    homeTeamScore = `${homeScore} (${aggregateHomeScore})`;
    awayTeamScore = `${awayScore} (${aggregateAwayScore})`;
  }

  let status: GameStatus = {
    type: 'GAMESTATUS_STRING',
    value: matchInfo.status.toLowerCase()
  };

  if (matchInfo.status === 'UPCOMING') {
    status = { type: 'TIME_STRING', value: matchInfo.kickOffTime.dateTime };
  }

  // TODO CONFIRM
  if (matchInfo.status === 'LIVE') {
    // TODO
    if (false) {
      status = { type: 'GAMESTATUS_STRING', value: 'Half' };
    } else {
      status = {
        type: 'GAMESTATUS_STRING',
        value: `${matchInfo.kickOffTime.dateTime}'`
      };
    }
  }

  return {
    id: matchInfo.id,
    status,
    homeTeam: matchInfo.homeTeam.internationalName,
    awayTeam: matchInfo.awayTeam.internationalName,
    homeTeamScore,
    awayTeamScore,
    homeTeamWinning,
    awayTeamWinning
  };
};
