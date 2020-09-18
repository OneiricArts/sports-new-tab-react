export interface Game {
  id: number | string;

  status: GameStatus;
  awayTeam: string;
  homeTeam: string;
  awayTeamWinning?: boolean;
  homeTeamWinning?: boolean;
  awayTeamScore?: number;
  homeTeamScore?: number;

  hidden?: boolean;
}

export interface Schedule {
  displayDate: string;
  //  playoffs?: boolean;
  games: Game[];
}

export type GameStatus =
  | { type: 'UTC_TIME'; value: number }
  | { type: 'TIME_STRING'; value: string }
  | { type: 'GAMESTATUS_STRING'; value: string };

export interface NFLGame extends Game {
  // teamHasPossession?: (team: string) => boolean;
  awayTeamHasPosession?: boolean;
  homeTeamHasPosession?: boolean;
}

export interface NFLSchedule {
  displayDate: string;
  games: NFLGame[];
}
