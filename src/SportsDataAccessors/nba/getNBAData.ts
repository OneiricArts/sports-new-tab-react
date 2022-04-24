import { Playoffs, StatsNbaScoreboardI } from './StatsNbaScoreboardI';
import { teamCodeInfo } from './teamInfo';
import { Game, GameStatus, Schedule } from '../types';
import { dateFormatters, formatDate, isSameDate } from '../helpers';
import { INBATeamRank, INbaStandings } from '../../components/INbaStandings';
import { getNbaExpandedContent } from '../../components/NBAExpandedContent';
import { ReactNode } from 'react';
import { nbaDisplayName } from '../../components/NBADisplayName';

const today = () => new Date();

const getNBAData = async (
  date = today()
): Promise<{
  schedule: Schedule;
  standings?: INbaStandings;
}> => {
  const formatter = dateFormatters['yyyymmdd'];

  const isNotToday = !isSameDate(date, today());

  const urlDate = formatDate(date, formatter);
  const url = `https://data.nba.net/prod/v1/${urlDate}/scoreboard.json`;

  const standingsUrl =
    'https://data.nba.net/10s/prod/v1/current/standings_conference.json';

  const [scoreboardData, standingsData] = (await Promise.allSettled([
    fetch(url, { mode: 'cors' }).then(r => r.json()),
    fetch(standingsUrl).then(r => {
      if (r.status === 200) return r.json();
    })
  ]).then(promises => {
    return promises.map(p => (p.status === 'fulfilled' ? p.value : undefined));
  })) as [StatsNbaScoreboardI | undefined, INbaStandings | undefined];

  if (!scoreboardData) throw Error('Could not retrieve NBA scoreboard');

  return {
    schedule: {
      displayDate: `${urlDate.substr(4, 2)}.${urlDate.substr(
        6
      )}${getPlayoffRound(scoreboardData)}`,
      games: labelData(scoreboardData, isNotToday, standingsData) ?? []
    },
    standings: standingsData
  };
};

type LabelDataI = (
  data: StatsNbaScoreboardI,
  isNotToday: boolean,
  standings?: INbaStandings
) => Game[] | undefined;

const getPeriod = (period: number) =>
  period > 4 ? `OT${period - 4}` : `${period}Q`;

const labelData: LabelDataI = (data, isNotToday, standings) => {
  const teamRanks: Record<string, INBATeamRank | undefined> = {};
  if (standings) {
    [
      standings.league.standard.conference.east,
      standings.league.standard.conference.west
    ].forEach(arr =>
      arr.forEach(t => {
        teamRanks[t.teamSitesOnly.teamNickname] = t;
      })
    );
  }

  const labeledData = data.games?.map(d => {
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

    let status: GameStatus;

    // pregame
    if (
      (!d.isGameActivated && d.period.current === 0) ||
      (d.period.current <= 1 && d.clock === '' && d.gameDuration.minutes === '')
    ) {
      status = { type: 'UTC_TIME', value: utcTime } as const;
    }

    // postgame
    else if (!d.isGameActivated && d.period.current > 1) {
      const value =
        d.period.current > 4 ? `Final OT${d.period.current - 4} ` : 'Final';
      status = { type: 'GAMESTATUS_STRING', value };
    }

    // playing
    else {
      if (d.period.isHalftime) {
        status = { type: 'GAMESTATUS_STRING', value: 'Half' };
      } else {
        const suffix = d.period.isEndOfPeriod ? 'End of' : d.clock;
        const value = `${suffix} ${getPeriod(d.period.current)}`;

        status = { type: 'GAMESTATUS_STRING', value: value };
      }
    }

    /**
     * Score
     */
    const homeTeamScore = d.hTeam.score
      ? parseInt(d.hTeam.score, 10)
      : undefined;
    const awayTeamScore = d.vTeam.score
      ? parseInt(d.vTeam.score, 10)
      : undefined;

    let homeTeamWinning: boolean | undefined;
    let awayTeamWinning: boolean | undefined;

    if (homeTeamScore && awayTeamScore) {
      homeTeamWinning = homeTeamScore > awayTeamScore;
      awayTeamWinning = awayTeamScore > homeTeamScore;
    }

    // TODO make it nullable (if not found)
    const homeTeamInfo =
      teamCodeInfo[d.hTeam.triCode as keyof typeof teamCodeInfo];
    const awayTeamInfo =
      teamCodeInfo[d.vTeam.triCode as keyof typeof teamCodeInfo];

    const homeTeam = homeTeamInfo?.nickname ?? d.hTeam.triCode;
    const awayTeam = awayTeamInfo?.nickname ?? d.vTeam.triCode;

    let broadcaster: string | undefined;
    let isOnNationalTv = false;
    try {
      const national =
        d.watch?.broadcast?.broadcasters?.national?.[0]?.shortName;

      if (national) {
        broadcaster = `(National) ${national}`;
        isOnNationalTv = true;
      } else {
        const htB = d.watch?.broadcast?.broadcasters?.hTeam?.[0]?.shortName;
        const vtB = d.watch?.broadcast?.broadcasters?.vTeam?.[0]?.shortName;

        if (htB && vtB) broadcaster = `${htB}, ${vtB}`;
      }
    } catch {}

    const expandedContent = getNbaExpandedContent({
      broadcaster,
      awayTeam,
      homeTeam,
      awayTeamRecord: `${d.vTeam.win}-${d.vTeam.loss}`,
      homeTeamRecord: `${d.hTeam.win}-${d.hTeam.loss}`,
      awayTeamRank: teamRanks[awayTeam]?.confRank,
      homeTeamRank: teamRanks[homeTeam]?.confRank
    });

    const awayTeamDisplay = () =>
      getDisplayName(
        isNotToday,
        'away',
        awayTeam,
        teamRanks[awayTeam],
        d.playoffs
      );
    const homeTeamDisplay = () =>
      getDisplayName(
        isNotToday,
        'home',
        homeTeam,
        teamRanks[homeTeam],
        d.playoffs
      );

    return {
      id: d.gameId,
      status,
      homeTeam,
      homeTeamScore,
      homeTeamWinning,
      awayTeam,
      awayTeamScore,
      awayTeamWinning,
      awayTeamDisplay,
      homeTeamDisplay,
      expandedContent,
      isOnNationalTv
    };
  });

  return labeledData;
};

const getDisplayName = (
  isNotToday: boolean,
  awayOrHome: 'away' | 'home',
  team: string,
  rank?: INBATeamRank,
  playoffs?: Playoffs
): ReactNode => {
  if (!!playoffs) {
    if (playoffs?.hTeam.seriesWin === '0' && playoffs.vTeam.seriesWin === '0') {
      return team;
    }

    return `${team} (${
      awayOrHome === 'home'
        ? playoffs.hTeam.seriesWin
        : playoffs.vTeam.seriesWin
    })`;
  }

  if (isNotToday) return team;
  if (!rank) return team;

  const winStreak = rank.isWinStreak ? parseInt(rank.streak, 10) : 0;
  const loseStreak = rank.isWinStreak ? 0 : parseInt(rank.streak, 10);
  const confRank = parseInt(rank.confRank, 10);

  return nbaDisplayName(team, confRank, winStreak, loseStreak);
};

const getPlayoffRound = (scoreboardData: StatsNbaScoreboardI) => {
  let playoffTxt = '';
  const roundNums = scoreboardData.games?.map(d => d.playoffs?.roundNum);

  if (
    roundNums &&
    roundNums[0] &&
    roundNums.every(rdNum => rdNum === roundNums[0])
  ) {
    let roundNum = roundNums[0];

    if (scoreboardData.games?.[0]?.seasonStageId === 5) {
      // TODO confirm if this is always true
      playoffTxt = ` // Play-in Round ${roundNum}`;
    } else if (roundNum === '1') playoffTxt = ' // Round 1';
    else if (roundNum === '2') playoffTxt = ' // Conf Semis';
    else if (roundNum === '3') playoffTxt = ' // Conf Finals';
    else if (roundNum === '4') playoffTxt = ' // Finals';
  }

  return playoffTxt;
};

// const getSeasonYear = async () => {
//   const url = "https://data.nba.net/prod/v1/today.json";
//   const response = await fetch(url);
//   const data = await response.json();

//   return data.seasonScheduleYear as number;
// };

export default getNBAData;
