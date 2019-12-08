import { NFLSchedule } from './types';

function convertToTypes(unTypedData: any) {
  const schedule:NFLSchedule = {
    displayDate: `Week ${unTypedData.w}`,
    games: []
  };

  unTypedData.gms.map((g:any) => {
    let statusToDisplay = '';
    try {
      if (g.organizedInfo.status.type === 'DATETIME') {
        const date = new Date(g.organizedInfo.status.value);

        const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' };
        statusToDisplay = date.toLocaleString("en-US", options).replace(/AM|PM/, '').trim();
      } else {
        statusToDisplay = g.organizedInfo.status.value;
      }
    } finally {}

    let awayTeam: string;
    if (g.extrainfo) {
      awayTeam = g.extrainfo.gameSchedule.visitorNickname;
    } else {
      awayTeam = g.away.abbr;
    }

    let homeTeam: string;
    if (g.extrainfo) {
      homeTeam = g.extrainfo.gameSchedule.homeNickname;
    } else {
      homeTeam = g.home.abbr;
    }

    schedule.games.push(
      {
        id: g.eid,
        status: statusToDisplay,
        awayTeam: awayTeam,
        homeTeam: homeTeam,
        awayTeamWinning: g.visitor_winning,
        homeTeamWinning: g.home_winning,
        awayTeamScore: g.away.score.T,
        homeTeamScore: g.home.score.T,
        awayTeamHasPosession: g.visitor_pos,
        homeTeamHasPosession: g.home_pos,
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
