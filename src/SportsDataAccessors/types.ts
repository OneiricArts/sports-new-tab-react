import { ReactNode } from 'react';

export interface Game {
  id: number | string;

  status: GameStatus;
  startTime?: string;
  awayTeam: string;
  homeTeam: string;
  awayTeamWinning?: boolean;
  homeTeamWinning?: boolean;
  awayTeamScore?: number | string;
  homeTeamScore?: number | string;

  isOnNationalTv?: boolean;

  hidden?: boolean;

  awayTeamDisplay?: () => ReactNode;
  homeTeamDisplay?: () => ReactNode;
  expandedContent?: () => ReactNode;
}

export interface Schedule {
  displayDate: string;
  //  playoffs?: boolean;
  games: Game[];
}

export type GameStatus =
  | { type: 'UTC_TIME'; value: number }
  | { type: 'TIME_STRING'; value: string; format?: 'DAY_TIME' | 'SHORT_TIME' }
  | { type: 'DATE_STRING'; value: string }
  | { type: 'GAMESTATUS_STRING'; value: string };

export interface NFLGame extends Game {
  // teamHasPossession?: (team: string) => boolean;
  awayTeamHasPosession?: boolean;
  homeTeamHasPosession?: boolean;
  redzone: boolean;
}

export interface NFLSchedule {
  displayDate: string;
  games: NFLGame[];
}
