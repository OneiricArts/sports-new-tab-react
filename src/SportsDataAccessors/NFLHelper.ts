import { NFLSchedule } from './types';

function convertToTypes(unTypedData: any) {
  const schedule:NFLSchedule = {
    displayDate: `Week ${unTypedData.w}`,
    games: []
  };

  unTypedData.gms.map((g:any) => {
    const {
      id,
      status,
      awayTeam,             homeTeam,
      awayTeamHasPosession, homeTeamHasPosession,
      awayTeamWinning,      homeTeamWinning,
      awayTeamScore,        homeTeamScore
    } = g.organizedInfo;

    let statusToDisplay = '';
    try {
      if (status.type === 'DATETIME') {
        const date = new Date(g.organizedInfo.status.value);

        const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' };
        statusToDisplay = date.toLocaleString("en-US", options).replace(/AM|PM/, '').trim();
      } else {
        statusToDisplay = status.value;
      }
    } finally {}

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

    return g;
  });
  return schedule;
}

function carryOverHiddenGames(schedule: NFLSchedule, cachedSchedule: NFLSchedule) {
  if (schedule.displayDate !== cachedSchedule.displayDate) return schedule;

  schedule.games.map((g, i) => {
    // if (g.id !== cachedSchedule.games[i].id)
    // g.hidden = cachedSchedule.games[i].hidden;

    // shouldn't this be of type Game | undefined
    const cachedGame = cachedSchedule.games.filter(cg => cg.id === g.id)[0];
    if (cachedGame) g.hidden = cachedGame.hidden;

    // need a better way to do this

    return g;
  });

  return schedule;
}

function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchNFLDataAsync(cachedSchedule: NFLSchedule|undefined): Promise<NFLSchedule> {
  const url = 'https://sports-new-tab-page.appspot.com/nfl';
  const unTypedData = await (await fetch(url)).json();
  const typedData = convertToTypes(unTypedData);

  if (!cachedSchedule) return typedData;

  const typedDataWithHiddens = carryOverHiddenGames(typedData, cachedSchedule);
  return typedDataWithHiddens;
}
