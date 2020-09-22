export interface NHLApi {
  copyright: string;
  totalItems: number;
  totalEvents: number;
  totalGames: number;
  totalMatches: number;
  wait: number;
  dates?: DatesEntity[] | null;
}

export interface DatesEntity {
  date: string;
  totalItems: number;
  totalEvents: number;
  totalGames: number;
  totalMatches: number;
  games?: GamesEntity[] | null;
  events?: null[] | null;
  matches?: null[] | null;
}

export interface GamesEntity {
  gamePk: number;
  link: string;
  gameType: string;
  season: string;
  gameDate: string;
  status: Status;
  teams: Teams;
  linescore: Linescore;
  venue: ConferenceOrTeamOrVenue;
  content: Content;
}

export interface Status {
  abstractGameState: string;
  codedGameState: string;
  detailedState: string;
  statusCode: string;
  startTimeTBD: boolean;
}

export interface Teams {
  away: Away;
  home: Home;
}

export interface Away {
  leagueRecord: LeagueRecord;
  score: number;
  team: Team;
}

export interface LeagueRecord {
  wins: number;
  losses: number;
  ot: number;
  type: string;
}

export interface Team {
  id: number;
  name: string;
  link: string;
  venue: Venue;
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  division: Division;
  conference: ConferenceOrTeamOrVenue;
  franchise: Franchise;
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: boolean;
}

export interface Venue {
  id: number;
  name: string;
  link: string;
  city: string;
  timeZone: TimeZone;
}

export interface TimeZone {
  id: string;
  offset: number;
  tz: string;
}

export interface Division {
  id: number;
  name: string;
  nameShort: string;
  link: string;
  abbreviation: string;
}

export interface ConferenceOrTeamOrVenue {
  id: number;
  name: string;
  link: string;
}

export interface Franchise {
  franchiseId: number;
  teamName: string;
  link: string;
}

export interface Home {
  leagueRecord: LeagueRecord;
  score: number;
  team: Team1;
}

export interface Team1 {
  id: number;
  name: string;
  link: string;
  venue: Venue1;
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  division: Division;
  conference: ConferenceOrTeamOrVenue;
  franchise: Franchise;
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: boolean;
}

export interface Venue1 {
  name: string;
  link: string;
  city: string;
  timeZone: TimeZone;
}

export interface Linescore {
  currentPeriod: number;
  currentPeriodOrdinal: string;
  currentPeriodTimeRemaining: string;
  periods?: PeriodsEntity[] | null;
  shootoutInfo: ShootoutInfo;
  teams: Teams1;
  powerPlayStrength: string;
  hasShootout: boolean;
  intermissionInfo: IntermissionInfo;
  powerPlayInfo: PowerPlayInfo;
}

export interface PeriodsEntity {
  periodType: string;
  startTime: string;
  endTime?: string | null;
  num: number;
  ordinalNum: string;
  home: HomeOrAway;
  away: HomeOrAway;
}

export interface HomeOrAway {
  goals: number;
  shotsOnGoal: number;
  rinkSide: string;
}

export interface ShootoutInfo {
  away: AwayOrHome;
  home: AwayOrHome;
}

export interface AwayOrHome {
  scores: number;
  attempts: number;
}

export interface Teams1 {
  home: HomeOrAway1;
  away: HomeOrAway1;
}

export interface HomeOrAway1 {
  team: ConferenceOrTeamOrVenue;
  goals: number;
  shotsOnGoal: number;
  goaliePulled: boolean;
  numSkaters: number;
  powerPlay: boolean;
}

export interface IntermissionInfo {
  intermissionTimeRemaining: number;
  intermissionTimeElapsed: number;
  inIntermission: boolean;
}

export interface PowerPlayInfo {
  situationTimeRemaining: number;
  situationTimeElapsed: number;
  inSituation: boolean;
}

export interface Content {
  link: string;
}
