export type StatusI =
  { type: 'UTC_TIME', value: number } |
  { type: 'GAMESTATUS_STRING', value: string };

export interface NBAGameI {
  id: string;
  status: StatusI;

  homeTeam: string;
  homeTeamScore?: number;
  homeTeamWinning?: boolean;

  awayTeam: string;
  awayTeamScore?: number;
  awayTeamWinning?: boolean;
}

export interface NBADataI {
  displayDate: string;
  games?: NBAGameI[];
}
