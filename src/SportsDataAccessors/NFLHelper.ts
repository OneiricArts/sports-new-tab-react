import { Game, Schedule } from './types';

export function getNFLData(): Schedule {
  const games: Game[] = [
    {
      id: 123123,
      status: '3:04 4Qtr',
      awayTeam: 'Rams',
      homeTeam: '49ers',
      awayTeamWinning: true,
      homeTeamWinning: false,
      awayTeamScore: 49,
      homeTeamScore: 78,
      hidden: false,
    },
    {
      id: 123124,
      status: '1:24 2Qtr',
      awayTeam: 'Chargers',
      homeTeam: 'Patriots',
      awayTeamWinning: true,
      homeTeamWinning: false,
      awayTeamScore: 23,
      homeTeamScore: 21,
      hidden: false,
    },
    {
      id: 123125,
      status: '10:04 1Qtr',
      awayTeam: 'Seahaws',
      homeTeam: 'Cardinals',
      awayTeamWinning: true,
      homeTeamWinning: false,
      awayTeamScore: 4,
      homeTeamScore: 2,
      hidden: false,
    },
    {
      id: 123126,
      status: '3:04 4thQtr',
      awayTeam: 'Rams',
      homeTeam: '49ers',
      awayTeamWinning: true,
      homeTeamWinning: false,
      awayTeamScore: 32,
      homeTeamScore: 21,
      hidden: false,
    },
  ];
  return {
    displayDate: '0',
    games,
  };
}

export async function fetchNFLDataAsync(): Promise<Schedule> {
  return Promise.resolve(getNFLData());
}
