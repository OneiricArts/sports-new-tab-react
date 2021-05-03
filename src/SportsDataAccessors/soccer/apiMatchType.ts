export interface ApiMatchType {
  awayTeam: TeamOrAwayTeamOrHomeTeam;
  competition: Competition;
  condition: Condition;
  fullTimeAt: string;
  homeTeam: TeamOrAwayTeamOrHomeTeam;
  id: string;
  kickOffTime: KickOffTime;
  leg: Leg;
  lineupStatus: string;
  matchAttendance: number;
  matchday: Matchday;
  playerEvents: PlayerEvents;
  referees?: RefereesEntity[] | null;
  relatedMatches?: RelatedMatchesEntity[] | null;
  round: Round;
  score: Score;
  seasonYear: string;
  sessionNumber: number;
  stadium: Stadium;
  status: string;
  type: string;
  winner: Winner;
}
export interface TeamOrAwayTeamOrHomeTeam {
  associationLogoUrl: string;
  bigLogoUrl: string;
  countryCode: string;
  id: string;
  idProvider: string;
  internationalName: string;
  isPlaceHolder: boolean;
  logoUrl: string;
  mediumLogoUrl: string;
  teamCode: string;
  teamTypeDetail: string;
  translations: Translations;
  typeIsNational: boolean;
  typeTeam: string;
}
export interface Translations {
  countryName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  displayName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  displayOfficialName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  displayTeamCode: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
}
export interface CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName {
  EN: string;
  FR: string;
  DE: string;
  ES: string;
  PT: string;
  IT: string;
  RU: string;
  JA: string;
  ZH: string;
  HU: string;
  RO: string;
  DA: string;
  NL: string;
  AZ: string;
}
export interface Competition {
  age: string;
  code: string;
  id: string;
  images: Images;
  metaData: MetaData;
  region: string;
  sex: string;
  sportsType: string;
  teamCategory: string;
  translations: Translations1;
  type: string;
}
export interface Images {
  FULL_LOGO: string;
}
export interface MetaData {
  name: string;
}
export interface Translations1 {
  name: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  qualifyingName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  tournamentName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
}
export interface Condition {
  humidity: number;
  pitchCondition: string;
  temperature: number;
  translations: Translations2;
  weatherCondition: string;
  windSpeed: number;
}
export interface Translations2 {
  pitchConditionName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  weatherConditionName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
}
export interface KickOffTime {
  date: string;
  dateTime: string;
  utcOffsetInHours: number;
}
export interface Leg {
  dateTimeFrom: string;
  dateTimeTo: string;
  number: number;
  translations: Translations3;
}
export interface Translations3 {
  name: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
}
export interface Matchday {
  competitionId: string;
  dateFrom: string;
  dateTo: string;
  id: string;
  longName: string;
  name: string;
  roundId: string;
  seasonYear: string;
  sequenceNumber: string;
  translations: Translations4;
  type: string;
}
export interface Translations4 {
  longName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  name: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
}
export interface PlayerEvents {
  redCards?: RedCardsEntity[] | null;
  scorers?: ScorersEntity[] | null;
}
export interface RedCardsEntity {
  id: string;
  player: Player;
  teamId: string;
  teamIdProvider: string;
  time: Time;
}
export interface Player {
  age: string;
  birthDate: string;
  countryCode: string;
  detailedFieldPosition: string;
  fieldPosition: string;
  id: string;
  imageUrl: string;
  internationalName: string;
  translations: Translations5;
}
export interface Translations5 {
  countryName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  fieldPosition: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  firstName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  lastName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  name: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  shortName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
}
export interface Time {
  minute: number;
  second: number;
}
export interface ScorersEntity {
  goalType: string;
  id: string;
  player: Player1;
  teamId: string;
  teamIdProvider: string;
  time: Time;
  totalScore: TotalScoreOrAggregateOrRegularOrTotal;
}
export interface Player1 {
  age: string;
  birthDate: string;
  countryCode: string;
  detailedFieldPosition: string;
  fieldPosition: string;
  height?: number | null;
  id: string;
  imageUrl: string;
  internationalName: string;
  translations: Translations6;
  weight?: number | null;
}
export interface Translations6 {
  countryName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  fieldPosition: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  firstName: FirstName;
  lastName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  name: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  shortName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
}
export interface FirstName {
  RU: string;
  ZH: string;
  EN?: string | null;
  FR?: string | null;
  DE?: string | null;
  ES?: string | null;
  PT?: string | null;
  IT?: string | null;
  JA?: string | null;
  HU?: string | null;
  RO?: string | null;
  DA?: string | null;
  NL?: string | null;
  AZ?: string | null;
}
export interface TotalScoreOrAggregateOrRegularOrTotal {
  away: number;
  home: number;
}
export interface RefereesEntity {
  images: Images1;
  person: Person;
  role: string;
  translations: Translations7;
}
export interface Images1 {
  SMALL_SQUARE: string;
}
export interface Person {
  countryCode: string;
  id: string;
  translations: Translations8;
}
export interface Translations8 {
  countryName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  firstName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  lastName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  name: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  shortName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
}
export interface Translations7 {
  roleName: RoleName;
}
export interface RoleName {
  EN: string;
  FR: string;
  DE: string;
  ES: string;
  PT: string;
  IT: string;
  RU: string;
  JA: string;
  ZH: string;
  HU?: string | null;
  RO?: string | null;
  DA?: string | null;
  NL?: string | null;
  AZ?: string | null;
}
export interface RelatedMatchesEntity {
  awayTeam: TeamOrAwayTeamOrHomeTeam;
  homeTeam: TeamOrAwayTeamOrHomeTeam;
  id: string;
  kickOffTime: KickOffTime;
  score: Score;
  status: string;
  type: string;
  winner: Winner1;
}
export interface Score {
  aggregate: TotalScoreOrAggregateOrRegularOrTotal;
  regular: TotalScoreOrAggregateOrRegularOrTotal;
  total: TotalScoreOrAggregateOrRegularOrTotal;
}
export interface Winner1 {
  aggregate: AggregateOrMatch;
  match: AggregateOrMatch;
}
export interface AggregateOrMatch {
  reason: string;
  team: TeamOrAwayTeamOrHomeTeam;
  translations: Translations9;
}
export interface Translations9 {
  reasonText: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  reasonTextAbbr: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
}
export interface Round {
  active: boolean;
  competitionId: string;
  dateFrom: string;
  dateTo: string;
  groupCount: number;
  id: string;
  metaData: MetaData1;
  mode: string;
  modeDetail: string;
  orderInCompetition: number;
  phase: string;
  seasonYear: string;
  secondaryType: string;
  stadiumNameType: string;
  status: string;
  teamCount: number;
  translations: Translations10;
}
export interface MetaData1 {
  name: string;
  type: string;
}
export interface Translations10 {
  abbreviation: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  name: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  shortName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
}
export interface Stadium {
  address: string;
  capacity: number;
  city: City;
  countryCode: string;
  geolocation: Geolocation;
  id: string;
  images: Images2;
  openingDate: string;
  translations: Translations11;
}
export interface City {
  countryCode: string;
  id: string;
  translations: Translations3;
}
export interface Geolocation {
  latitude: number;
  longitude: number;
}
export interface Images2 {
  MEDIUM_WIDE: string;
  LARGE_ULTRA_WIDE: string;
}
export interface Translations11 {
  mediaName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  name: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  officialName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  specialEventsName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
  sponsorName: CountryNameOrDisplayNameOrDisplayOfficialNameOrDisplayTeamCodeOrNameOrQualifyingNameOrTournamentNameOrPitchConditionNameOrWeatherConditionNameOrLongNameOrFieldPositionOrFirstNameOrLastNameOrShortNameOrRoleNameOrReasonTextOrReasonTextAbbrOrAbbreviationOrMediaNameOrOfficialNameOrSpecialEventsNameOrSponsorName;
}
export interface Winner {
  aggregate: AggregateOrMatch;
  match: Match;
}
export interface Match {
  reason: string;
  team: TeamOrAwayTeamOrHomeTeam;
}
