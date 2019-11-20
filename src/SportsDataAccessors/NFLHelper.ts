import { Schedule } from './types';

function convertToTypes(unTypedData: any) {
  const schedule:Schedule = {
    displayDate: `Week ${unTypedData.w}`,
    games: []
  };

  unTypedData.gms.map((g:any) => {
    let status: string;
    if (g.qtr) {
      if (g.playing) {
        status = `${g.qtr}Q, ${g.clock}`;
      } else {
        status = g.qtr;
      }
    } else {
      if (g.extrainfo) {
        status = `${g.extrainfo.gameSchedule.gameDate} ${g.t}`;
      } else {
        status = g.t;
      }
    }

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

    if (g.visitor_pos) { awayTeam = `${awayTeam} 🏈` } // TODO remove
    if (g.home_pos) { homeTeam = `${homeTeam} 🏈` } // TODO remove

    schedule.games.push(
      {
        id: g.eid,
        status: status,
        awayTeam: awayTeam,
        homeTeam: homeTeam,
        awayTeamWinning: g.visitor_winning,
        homeTeamWinning: g.home_winning,
        awayTeamScore: g.away.score.T,
        homeTeamScore: g.home.score.T,
        hidden: false
      }
    );

    return g;
  });
  return schedule;
}

function carryOverHiddenGames(schedule: Schedule, cachedSchedule: Schedule) {
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

export async function fetchNFLDataAsync(cachedSchedule: Schedule|undefined): Promise<Schedule> {
  const url = 'https://us-central1-sports-new-tab.cloudfunctions.net/nfl-data';
  const unTypedData = await (await fetch(url)).json();
  const typedData = convertToTypes(unTypedData);

  if (!cachedSchedule) return typedData;

  const typedDataWithHiddens = carryOverHiddenGames(typedData, cachedSchedule);
  return typedDataWithHiddens;
}
