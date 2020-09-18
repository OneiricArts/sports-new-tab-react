import { GameStatus } from '../types';

export interface NBAGameI {
  id: string;
  status: GameStatus;

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
