import { TeamRecords } from './espnRankings';

export interface EspnNbaScoreboard {
  leagues?: LeaguesEntity[] | null;
  season: Season;
  day: Day;
  events?: EventsEntity[] | null;
}
export interface LeaguesEntity {
  id: string;
  uid: string;
  name: string;
  abbreviation: string;
  slug: string;
  season: Season1;
  logos?: LogosEntity[] | null;
  calendarType: string;
  calendarIsWhitelist: boolean;
  calendarStartDate: string;
  calendarEndDate: string;
  calendar?: string[] | null;
}
export interface Season1 {
  year: number;
  startDate: string;
  endDate: string;
  type: Type;
}
export interface Type {
  id: string;
  type: number;
  name: string;
  abbreviation: string;
}
export interface LogosEntity {
  href: string;
  width: number;
  height: number;
  alt: string;
  rel?: string[] | null;
  lastUpdated: string;
}
export interface Season {
  type: number;
  year: number;
}
export interface Day {
  date: string;
}
export interface EventsEntity {
  id: string;
  uid: string;
  date: string;
  name: string;
  shortName: string;
  season: Season2;
  competitions?: CompetitionsEntity[] | null;
  links?: LinksEntity[] | null;
  status: Status;
}
export interface Season2 {
  year: number;
  type: number;
  slug: string;
}
export interface CompetitionsEntity {
  id: string;
  uid: string;
  date: string;
  attendance: number;
  type: Type1;
  timeValid: boolean;
  neutralSite: boolean;
  conferenceCompetition: boolean;
  recent: boolean;
  venue: Venue;
  competitors?: CompetitorsEntity[] | null;
  notes?: null[] | null;
  status: Status;
  broadcasts?: (BroadcastsEntity | null)[] | null;
  format: Format;
  tickets?: TicketsEntity[] | null;
  startDate: string;
  geoBroadcasts?: (GeoBroadcastsEntity | null)[] | null;
  odds?: OddsEntity[] | null;
}
export interface Type1 {
  id: string;
  abbreviation: string;
}
export interface Venue {
  id: string;
  fullName: string;
  address: Address;
  capacity: number;
  indoor: boolean;
}
export interface Address {
  city: string;
  state: string;
}
export interface CompetitorsEntity {
  id: string;
  uid: string;
  type: string;
  order: number;
  homeAway: string;
  team: Team;
  score: string;
  statistics?: StatisticsEntity[] | null;
  records?: RecordsEntity[] | null;
  leaders?: LeadersEntity[] | null;
}
export interface Team {
  id: string;
  uid: string;
  location: string;
  name: string;
  abbreviation: keyof TeamRecords;
  displayName: string;
  shortDisplayName: string;
  color: string;
  alternateColor: string;
  isActive: boolean;
  venue: VenueOrTeam;
  links?: LinksEntity1[] | null;
  logo: string;
}
export interface VenueOrTeam {
  id: string;
}
export interface LinksEntity1 {
  rel?: string[] | null;
  href: string;
  text: string;
  isExternal: boolean;
  isPremium: boolean;
}
export interface StatisticsEntity {
  name: string;
  abbreviation: string;
  displayValue: string;
  rankDisplayValue?: string | null;
}
export interface RecordsEntity {
  name: string;
  abbreviation?: string | null;
  type: string;
  summary: string;
}
export interface LeadersEntity {
  name: string;
  displayName: string;
  shortDisplayName: string;
  abbreviation: string;
  leaders?: LeadersEntity1[] | null;
}
export interface LeadersEntity1 {
  displayValue: string;
  value: number;
  athlete: Athlete;
  team: VenueOrTeam;
}
export interface Athlete {
  id: string;
  fullName: string;
  displayName: string;
  shortName: string;
  links?: LinksEntity2[] | null;
  headshot: string;
  jersey: string;
  position: Position;
  team: VenueOrTeam;
  active: boolean;
}
export interface LinksEntity2 {
  rel?: string[] | null;
  href: string;
}
export interface Position {
  abbreviation: string;
}
export interface Status {
  clock: number;
  displayClock: string;
  period: number;
  type: Type2;
}
export interface Type2 {
  id: string;
  name: string;
  state: string;
  completed: boolean;
  description: string;
  detail: string;
  shortDetail: string;
}
export interface BroadcastsEntity {
  market: string;
  names?: string[] | null;
}
export interface Format {
  regulation: Regulation;
}
export interface Regulation {
  periods: number;
}
export interface TicketsEntity {
  summary: string;
  numberAvailable: number;
  links?: LinksEntity3[] | null;
}
export interface LinksEntity3 {
  href: string;
}
export interface GeoBroadcastsEntity {
  type: Type3;
  market: Market;
  media: Media;
  lang: string;
  region: string;
}
export interface Type3 {
  id: string;
  shortName: string;
}
export interface Market {
  id: string;
  type: string;
}
export interface Media {
  shortName: string;
}
export interface OddsEntity {
  provider: Provider;
  details: string;
  overUnder: number;
}
export interface Provider {
  id: string;
  name: string;
  priority: number;
}
export interface LinksEntity {
  language: string;
  rel?: string[] | null;
  href: string;
  text: string;
  shortText: string;
  isExternal: boolean;
  isPremium: boolean;
}
