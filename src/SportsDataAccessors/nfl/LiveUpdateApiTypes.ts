import { nflTeamCodes } from './teamInfo';

export interface LiveUpdateApiI {
  [key: string]: LiveUpdateGameObjI;
}

export interface LiveUpdateGameObjI {
  home: HomeOrAway;
  away: HomeOrAway;
  bp: number;
  down: number | null;
  togo: number | null;
  clock: string | null;
  posteam: string | null;
  note: null;
  redzone: boolean | null;
  stadium: string;
  media: Media | null;
  yl: string | null;
  qtr: string | null;
}

interface HomeOrAway {
  score: Score;
  abbr: nflTeamCodes;
  to: number | null;
}

interface Score {
  1: number | null;
  2: number | null;
  3: number | null;
  4: number | null;
  5: number | null;
  T: number | null;
}

interface Media {
  radio: Radio;
  tv: string;
  sat: null;
  sathd: null;
}

interface Radio {
  home: null;
  away: null;
}
