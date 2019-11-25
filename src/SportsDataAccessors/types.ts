export interface Game {
  id: number;

  status: string;
  awayTeam: string;
  homeTeam: string;
  awayTeamWinning?: boolean;
  homeTeamWinning?: boolean;
  awayTeamScore?: number;
  homeTeamScore?: number;

  hidden: boolean;
}

export interface Schedule {
  displayDate: string;
  //  playoffs?: boolean;
  games: Game[];
}

export interface NFLGame extends Game {
  // teamHasPossession?: (team: string) => boolean;
  awayTeamHasPosession?: boolean;
  homeTeamHasPosession?: boolean;
}

export interface NFLSchedule {
  displayDate: string;
  games: NFLGame[];
}
