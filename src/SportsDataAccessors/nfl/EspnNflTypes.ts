export interface EspnNfl {
  leagues?: LeaguesEntity[] | null;
  season: Season;
  week: Week;
  events?: EventsEntity[] | null;
}

export interface LeaguesEntity {
  id: string;
  uid: string;
  name: string;
  abbreviation: string;
  slug: string;
  season: Season1;
  calendarType: string;
  calendarIsWhitelist: boolean;
  calendarStartDate: string;
  calendarEndDate: string;
  calendar?: CalendarEntity[] | null;
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

export interface CalendarEntity {
  label: string;
  value: string;
  startDate: string;
  endDate: string;
  entries?: EntriesEntity[] | null;
}

export interface EntriesEntity {
  label: string;
  alternateLabel: string;
  detail: string;
  value: string;
  startDate: string;
  endDate: string;
}

export interface Season {
  type: number;
  year: number;
}

export interface Week {
  number: number;
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
  weather?: Weather1 | null;
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
  situation?: Situation | null;
  status: Status;
  broadcasts?: (BroadcastsEntity | null)[] | null;
  leaders?: LeadersEntity[] | null;
  startDate: string;
  geoBroadcasts?: (GeoBroadcastsEntity | null)[] | null;
  headlines?: HeadlinesEntity[] | null;
  tickets?: TicketsEntity[] | null;
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
  linescores?: LinescoresEntity[] | null;
  statistics?: null[] | null;
  records?: RecordsEntity[] | null;
  winner?: boolean | null;
}

export interface Team {
  id: string;
  uid: string;
  location: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  color: string;
  alternateColor: string;
  isActive: boolean;
  venue: VenueOrTeam;
  links?: LinksEntity1[] | null;
  logo: string;
  name?: string | null;
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

export interface LinescoresEntity {
  value: number;
}

export interface RecordsEntity {
  name: string;
  abbreviation?: string | null;
  type: string;
  summary: string;
}

export interface Situation {
  $ref: string;
  lastPlay: LastPlay;
  down: number;
  yardLine: number;
  distance: number;
  downDistanceText: string;
  shortDownDistanceText: string;
  possessionText: string;
  isRedZone: boolean;
  homeTimeouts: number;
  awayTimeouts: number;
  possession: string;
}

export interface LastPlay {
  id: string;
  type: Type2;
  text: string;
  scoreValue: number;
  team: VenueOrTeam;
  probability: Probability;
  drive: Drive;
  start: StartOrEnd;
  end: StartOrEnd;
  statYardage: number;
  athletesInvolved?: AthletesInvolvedEntity[] | null;
}

export interface Type2 {
  id: string;
  text: string;
  abbreviation: string;
}

export interface Probability {
  tiePercentage: number;
  homeWinPercentage: number;
  awayWinPercentage: number;
  secondsLeft: number;
}

export interface Drive {
  description: string;
  start: Start;
  timeElapsed: TimeElapsed;
}

export interface Start {
  yardLine: number;
  text: string;
}

export interface TimeElapsed {
  displayValue: string;
}

export interface StartOrEnd {
  yardLine: number;
  team: VenueOrTeam;
}

export interface AthletesInvolvedEntity {
  id: string;
  fullName: string;
  displayName: string;
  shortName: string;
  links?: LinksEntity2[] | null;
  headshot: string;
  jersey: string;
  position: string;
  team: VenueOrTeam;
}

export interface LinksEntity2 {
  rel?: string[] | null;
  href: string;
}

export interface Status {
  clock: number;
  displayClock: string;
  period: number;
  type: Type3;
}

export interface Type3 {
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
  headshot?: string | null;
  jersey: string;
  position: Position;
  team: VenueOrTeam;
  active: boolean;
}

export interface Position {
  abbreviation: string;
}

export interface GeoBroadcastsEntity {
  type: Type4;
  market: Market;
  media: Media;
  lang: string;
  region: string;
}

export interface Type4 {
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

export interface HeadlinesEntity {
  description: string;
  type: string;
  shortLinkText: string;
  video?: VideoEntity[] | null;
}

export interface VideoEntity {
  id: number;
  source: string;
  headline: string;
  thumbnail: string;
  duration: number;
  tracking: Tracking;
  deviceRestrictions: DeviceRestrictions;
  geoRestrictions: GeoRestrictions;
  links: Links;
}

export interface Tracking {
  sportName: string;
  leagueName: string;
  coverageType: string;
  trackingName: string;
  trackingId: string;
}

export interface DeviceRestrictions {
  type: string;
  devices?: string[] | null;
}

export interface GeoRestrictions {
  type: string;
  countries?: string[] | null;
}

export interface Links {
  api: Api;
  web: Web;
  source: Source;
  mobile: Mobile;
}

export interface Api {
  self: SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity;
  artwork: SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity;
}

export interface SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity {
  href: string;
}

export interface Web {
  href: string;
  short: SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity;
  self: SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity;
}

export interface Source {
  mezzanine: SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity;
  flash: SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity;
  hds: SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity;
  HLS: HLS;
  HD: SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity;
  full: SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity;
  href: string;
}

export interface HLS {
  href: string;
  HD: SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity;
}

export interface Mobile {
  alert: SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity;
  source: SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity;
  href: string;
  streaming: SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity;
  progressiveDownload: SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity;
}

export interface TicketsEntity {
  summary: string;
  numberAvailable: number;
  links?:
    | SelfOrArtworkOrShortOrHDOrMezzanineOrFlashOrHdsOrFullOrAlertOrSourceOrStreamingOrProgressiveDownloadOrLinksEntity[]
    | null;
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

export interface Weather1 {
  displayValue: string;
  temperature: number;
  conditionId: string;
}
