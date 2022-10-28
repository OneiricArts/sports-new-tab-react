import { teamCodeInfoEspn } from './espnTeamInfo';

export interface EspnNbaTeam {
  team: Team;
}
export interface Team {
  id: string;
  uid: string;
  slug: string;
  location: string;
  name: string;
  abbreviation: keyof typeof teamCodeInfoEspn;
  displayName: string;
  shortDisplayName: string;
  color: string;
  alternateColor: string;
  isActive: boolean;
  logos?: LogosEntity[] | null;
  record: Record;
  groups: Groups;
  links?: LinksEntity[] | null;
  franchise: Franchise;
  nextEvent?: NextEventEntity[] | null;
  standingSummary: string;
}
export interface LogosEntity {
  href: string;
  width: number;
  height: number;
  alt: string;
  rel?: string[] | null;
  lastUpdated: string;
}
export interface Record {
  items?: ItemsEntity[] | null;
}
export interface ItemsEntity {
  description: string;
  type: string;
  summary: string;
  stats?: StatsEntity[] | null;
}
export interface StatsEntity {
  name: string;
  value: number;
}
export interface Groups {
  id: string;
  parent: Parent;
  isConference: boolean;
}
export interface Parent {
  id: string;
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
export interface Franchise {
  $ref: string;
  id: string;
  uid: string;
  slug: string;
  location: string;
  name: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  color: string;
  isActive: boolean;
  venue: Venue;
  team: Team1;
}
export interface Venue {
  $ref: string;
  id: string;
  fullName: string;
  shortName: string;
  address: Address;
  capacity: number;
  grass: boolean;
  indoor: boolean;
  images?: ImagesEntity[] | null;
}
export interface Address {
  city: string;
  state: string;
}
export interface ImagesEntity {
  href: string;
  width: number;
  height: number;
  alt: string;
  rel?: string[] | null;
}
export interface Team1 {
  $ref: string;
}
export interface NextEventEntity {
  id: string;
  date: string;
  name: string;
  shortName: string;
  season: Season;
  seasonType: SeasonType;
  timeValid: boolean;
  competitions?: CompetitionsEntity[] | null;
  links?: LinksEntity[] | null;
}
export interface Season {
  year: number;
  displayName: string;
}
export interface SeasonType {
  id: string;
  type: number;
  name: string;
  abbreviation: string;
}
export interface CompetitionsEntity {
  id: string;
  date: string;
  attendance: number;
  type: Type;
  timeValid: boolean;
  neutralSite: boolean;
  boxscoreAvailable: boolean;
  ticketsAvailable: boolean;
  venue: Venue1;
  competitors?: CompetitorsEntity[] | null;
  notes?: null[] | null;
  broadcasts?: null[] | null;
  tickets?: TicketsEntity[] | null;
  status: Status;
}
export interface Type {
  id: string;
  text: string;
  abbreviation: string;
  slug: string;
  type: string;
}
export interface Venue1 {
  fullName: string;
  address: Address;
}
export interface CompetitorsEntity {
  id: string;
  type: string;
  order: number;
  homeAway: string;
  team: Team2;
}
export interface Team2 {
  id: string;
  location: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  logos?: LogosEntity[] | null;
  links?: LinksEntity1[] | null;
}
export interface LinksEntity1 {
  rel?: string[] | null;
  href: string;
  text: string;
}
export interface TicketsEntity {
  id: string;
  summary: string;
  description: string;
  maxPrice: number;
  startingPrice: number;
  numberAvailable: number;
  totalPostings: number;
  links?: LinksEntity2[] | null;
}
export interface LinksEntity2 {
  rel?: string[] | null;
  href: string;
}
export interface Status {
  clock: number;
  displayClock: string;
  period: number;
  type: Type1;
}
export interface Type1 {
  id: string;
  name: string;
  state: string;
  completed: boolean;
  description: string;
  detail: string;
  shortDetail: string;
}
