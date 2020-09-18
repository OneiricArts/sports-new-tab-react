import { formatDate } from '../helpers';
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
  let date = new Date(); // '2020/02/25' '2020/08/19'

  const ids = await getMatchIdsForWeek(date);
  if (!ids.length) return {};

  const gamesData = await getMatchesData(ids);

  const schedule = await groupMatchesByRoundDate(gamesData);

  return schedule;
};

const groupMatchesByRoundDate = async (gamesData: ApiMatchType[]) => {
  const schedule: { [key: string]: ChampionsLeagueGame[] } = {};

  gamesData.forEach(e => {
    const date = new Date(e.matchDateTime);
    let displayDate = formatDate(date, ({ mm, dd }) => `${mm}-${dd}`);
    const key = `${displayDate} ${e.round.shortName}`;

    if (schedule[key]) schedule[key].push(apiDataToGame(e));
    else schedule[key] = [apiDataToGame(e)];
  });

  return schedule;
};

const getMatchIdsForWeek = (date: Date) => getMatchIdsForNDays(date, 7);

const getMatchIdsForNDays = async (
  startDate: Date,
  numDays: number
): Promise<string[]> => {
  let matchIds: string[] = [];
  let date = startDate;

  for (let i = 0; i < numDays; i += 1) {
    const ids = await fetchMatchIdsForDate(date);
    matchIds.push(...ids);

    date.setDate(date.getDate() + 1);
  }

  return matchIds;
};

const fetchMatchIdsForDate = async (date: Date): Promise<string[]> => {
  const apiDate = formatDate(date, ({ yyyy, mm, dd }) => `${yyyy}-${mm}-${dd}`);
  const url = `https://match.uefa.com/v1/matches/versions?date=${apiDate}&competitionId=1`;

  const response = await fetch(url, { mode: 'cors' });
  const json = await response.json();

  return Object.keys(json);
};

const getMatchesData = async (
  ids: string[],
  filterPrelimRound = true
): Promise<ApiMatchType[]> => {
  //https://match.uefa.com/v1/matches/?matchId=2027126,2027123,2027127,2027121&style=SHORT&language=EN
  const url = `https://match.uefa.com/v1/matches/?matchId=${ids.join(
    ','
  )}&style=SHORT&language=EN`;

  const response = await fetch(url, { mode: 'cors' });
  const matchesData: ApiMatchType[] = await response.json();

  if (filterPrelimRound)
    return matchesData.filter(e => e.round.phase !== 'QUALIFYING');

  return matchesData;
};

export default getChampionsLeagueData;
