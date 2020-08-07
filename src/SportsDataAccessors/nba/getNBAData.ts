import { StatsNbaScoreboardI } from "./StatsNbaScoreboardI";
import teamCodeInfo from "./teamInfo";
import { NBAGameI, NBADataI, StatusI } from "./NbaDatatypes";


const getNBAData = async (): Promise<NBADataI> => {
  const today = formatDate(new Date());
  const url = `https://data.nba.net/prod/v1/${today}/scoreboard.json`;

  const response = await fetch(url, { mode: 'cors' });
  const data = await response.json();

  return {
    displayDate: `${today.substr(4, 2)}.${today.substr(6)}`,
    games: labelData(data)
  };
};


type LabelDataI = (data: StatsNbaScoreboardI) => NBAGameI[] | undefined;

const getPeriod = (period: number) => period > 4 ? `OT${period - 4}` : `${period}Q`;

const labelData: LabelDataI = (data) => {
  const labeledData = data.games?.map((d) => {
    /**
     * Status
     */
    const utcTime = Date.parse(d.startTimeUTC);

    // client does:
    // const date = new Date(utcTime);
    // const timeString = date.toLocaleTimeString();

    // const [h, m] = timeString.split(" ")[0].split(":");
    // const time = `${ h }: ${ m }`;


    /**
     * Status
     */

    let status: StatusI;

    // pregame
    if (!d.isGameActivated && d.period.current === 0) {
      status = { type: 'UTC_TIME', value: utcTime } as const;
    }

    // postgame
    else if (!d.isGameActivated && d.period.current > 1) {
      const value = d.period.current > 4 ? `Final OT${d.period.current - 4} ` : 'Final';
      status = { type: 'GAMESTATUS_STRING', value };
    }

    // playing
    else {

      if (d.period.isHalftime) {
        status = { type: 'GAMESTATUS_STRING', value: 'Half' };
      }

      else {
        const suffix = d.period.isEndOfPeriod ? 'End of' : d.clock;
        const value = `${suffix} ${getPeriod(d.period.current)}`

        status = { type: 'GAMESTATUS_STRING', value: value };
      }
    }

    /**
     * Score
     */
    const homeTeamScore = d.hTeam.score ? parseInt(d.hTeam.score, 10) : undefined;
    const awayTeamScore = d.vTeam.score ? parseInt(d.vTeam.score, 10) : undefined;

    let homeTeamWinning: boolean | undefined;
    let awayTeamWinning: boolean | undefined;

    if (homeTeamScore && awayTeamScore) {
      homeTeamWinning = homeTeamScore > awayTeamScore;
      awayTeamWinning = awayTeamScore > homeTeamScore;

    }

    // TODO make it nullable (if not found)
    const homeTeamInfo = teamCodeInfo[d.hTeam.triCode as keyof typeof teamCodeInfo];
    const awayTeamInfo = teamCodeInfo[d.vTeam.triCode as keyof typeof teamCodeInfo];

    const homeTeam = homeTeamInfo?.nickname ?? d.hTeam.triCode;
    const awayTeam = awayTeamInfo?.nickname ?? d.vTeam.triCode;

    return {
      id: d.gameId,
      status,
      homeTeam,
      homeTeamScore,
      homeTeamWinning,
      awayTeam,
      awayTeamScore,
      awayTeamWinning
    };
  });

  return labeledData
};

function formatDate(date: Date) {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const twoDigits = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return `${yyyy}${twoDigits(mm)}${twoDigits(dd)}`;
}

// const getSeasonYear = async () => {
//   const url = "https://data.nba.net/prod/v1/today.json";
//   const response = await fetch(url);
//   const data = await response.json();

//   return data.seasonScheduleYear as number;
// };

export default getNBAData;
