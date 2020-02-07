import { NFLSchedule } from './types';

function convertToTypes(unTypedData: any) {
  const schedule: NFLSchedule = {
    displayDate: unTypedData.w,
    games: []
  };

  unTypedData.gms.forEach((g: any) => {
    const {
      id,
      status,
      awayTeam,             homeTeam,
      awayTeamHasPosession, homeTeamHasPosession,
      awayTeamWinning,      homeTeamWinning,
      awayTeamScore,        homeTeamScore
    } = g;

    let statusToDisplay = '';
    try {
      if (status.type === 'DATETIME') {
        const date = new Date(status.value);

        const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' };
        statusToDisplay = date.toLocaleString("en-US", options).replace(/AM|PM/, '').trim();
      } else {
        statusToDisplay = status.value;
      }
    } finally { }

    schedule.games.push(
      {
        id,
        status: statusToDisplay,
        awayTeam,             homeTeam,
        awayTeamWinning,      homeTeamWinning,
        awayTeamScore,        homeTeamScore,
        awayTeamHasPosession, homeTeamHasPosession,
        hidden: false
      }
    );
  });
  return schedule;
}

// use: await sleep();
function sleep(ms: number) { // eslint-disable-line @typescript-eslint/no-unused-vars
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchNFLDataAsync(cachedSchedule: NFLSchedule | undefined): Promise<NFLSchedule> {
  // await sleep(1000);
  // const url = 'http://localhost:8080/nfl'; // TODO have env flag to develop with local service
  const url = 'https://sports-new-tab-page.appspot.com/nfl';
  const unTypedData = await (await fetch(url)).json();
  const typedData = convertToTypes(unTypedData);

  if (!cachedSchedule) return typedData;

  return typedData;
}
