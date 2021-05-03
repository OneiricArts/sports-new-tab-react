import { dateFormatters, formatDate } from '../helpers';
import { Game } from '../types';
import { ApiMatchType } from './apiMatchType';
import { apiDataToGame } from './apiDataToGame';

export interface ChampionsLeagueGame extends Game {}

export interface ChampionsLeagueScoreboardI {
  [displayDate: string]: ChampionsLeagueGame[];
}

const getChampionsLeagueData = async (): Promise<
  ChampionsLeagueScoreboardI
> => {
  const startDate = new Date(); // '2020/02/25' '2020/08/19'
  // startDate.setDate(startDate.getDate() - 7);
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);

  //https://match.uefa.com/v2/matches?fromDate=2021-04-13&toDate=2021-04-13&competitionId=1&offset=0&limit=100
  const url = `https://match.uefa.com/v2/matches?fromDate=${formatDate(
    startDate,
    dateFormatters['yyyy-mm-dd']
  )}&toDate=${formatDate(
    endDate,
    dateFormatters['yyyy-mm-dd']
  )}&competitionId=1&offset=0&limit=100`;

  const response = await fetch(url, { mode: 'cors' });
  const matchesData: ApiMatchType[] = await response.json();

  const matches = matchesData.filter(e => e.round.phase !== 'QUALIFYING');
  return await groupMatchesByRoundDate(matches);
};

const groupMatchesByRoundDate = async (gamesData: ApiMatchType[]) => {
  const schedule: { [key: string]: ChampionsLeagueGame[] } = {};

  gamesData.forEach(e => {
    const date = new Date(e.kickOffTime.date);
    let displayDate = formatDate(date, ({ mm, dd }) => `${mm}-${dd}`);
    const key = `${displayDate} ${e.round.metaData.name}`;

    if (schedule[key]) schedule[key].push(apiDataToGame(e));
    else schedule[key] = [apiDataToGame(e)];
  });

  return schedule;
};

export default getChampionsLeagueData;
