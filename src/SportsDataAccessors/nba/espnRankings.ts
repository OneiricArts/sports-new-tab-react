import { EspnNbaTeam } from './EspnNbaTeam';
import { teamCodeInfoEspn } from './espnTeamInfo';

export type TeamRecords = Record<keyof typeof teamCodeInfoEspn, EspnNbaTeam>;

export type EspnNbaStandings = {
  east: EspnNbaStats[];
  west: EspnNbaStats[];
};

export type EspnNbaStats = ReturnType<typeof stats>;

export const stats = (t: keyof TeamRecords, teamRecords: TeamRecords) => {
  const overallRecord = teamRecords[t].team.record.items?.find(
    i => i.description === 'Overall Record'
  );

  const stat = (statName: string) =>
    overallRecord?.stats?.find(s => s.name === statName)?.value!;

  let streak = stat('streak');
  const isWinStreak = streak > 0;

  return {
    isWinStreak,
    record: overallRecord?.summary!,
    confRank: stat('playoffSeed'),
    streak: Math.abs(streak),

    conference: teamCodeInfoEspn[t].conference,
    name: teamRecords[t].team.name,

    wins: stat('wins'),
    losses: stat('losses')
  };
};

export const rankings = async () => {
  const teams = Object.keys(
    teamCodeInfoEspn
  ) as unknown as (keyof typeof teamCodeInfoEspn)[];

  const teamStats = await Promise.all(teams.map(t => getTeamStats(t)));
  const teamRecords: Record<string, {}> = {};

  teamStats.forEach(t => {
    teamRecords[t.team.abbreviation] = t;
  });

  const standings = teamStats
    .map(t => stats(t.team.abbreviation, teamRecords as TeamRecords))
    .sort((a, b) => a.confRank - b.confRank);

  const east = standings.filter(s => s.conference === 'EAST');
  const west = standings.filter(s => s.conference === 'WEST');

  return {
    teamRecords: teamRecords as TeamRecords,
    standings: { east, west }
  };
};

const getTeamStats = async (team: string): Promise<EspnNbaTeam> => {
  const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${team}`;
  const response = await fetch(url);
  return await response.json();
};
