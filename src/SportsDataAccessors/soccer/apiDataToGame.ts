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
  if (
    matchInfo.homeTeamScore?.aggregatedScore &&
    matchInfo.awayTeamScore?.aggregatedScore
  ) {
    homeTeamWinning =
      matchInfo.homeTeamScore.aggregatedScore >
      matchInfo.awayTeamScore.aggregatedScore;

    awayTeamWinning =
      matchInfo.awayTeamScore.aggregatedScore >
      matchInfo.homeTeamScore.aggregatedScore;
  } else if (matchInfo.homeTeamScore?.score && matchInfo.awayTeamScore?.score) {
    homeTeamWinning =
      matchInfo.homeTeamScore.score > matchInfo.awayTeamScore.score;
    awayTeamWinning =
      matchInfo.awayTeamScore.score > matchInfo.homeTeamScore.score;
  }

  let homeTeamScore: number | string | undefined =
    matchInfo.homeTeamScore?.score;

  let awayTeamScore: number | string | undefined =
    matchInfo.awayTeamScore?.score;

  if (matchInfo?.leg?.legNumber === 2) {
    homeTeamScore = `${matchInfo.homeTeamScore?.score} (${matchInfo.homeTeamScore?.aggregatedScore})`;
    awayTeamScore = `${matchInfo.awayTeamScore?.score} (${matchInfo.awayTeamScore?.aggregatedScore})`;
  }

  let status: GameStatus = {
    type: 'GAMESTATUS_STRING',
    value: matchInfo.status.toLowerCase()
  };

  if (matchInfo.status === 'UPCOMING') {
    status = { type: 'TIME_STRING', value: matchInfo.matchDateTime };
  }

  if (matchInfo.status === 'LIVE') {
    status = { type: 'GAMESTATUS_STRING', value: `${matchInfo.minute}'` };
  }

  return {
    id: matchInfo.id,
    status,
    homeTeam: matchInfo.homeTeam.displayNameShort,
    awayTeam: matchInfo.awayTeam.displayNameShort,
    homeTeamScore,
    awayTeamScore,
    homeTeamWinning,
    awayTeamWinning
  };
};
