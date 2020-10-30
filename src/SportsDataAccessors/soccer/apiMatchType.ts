export interface ApiMatchType {
  aggregatedWinner?: string;
  awayTeam: AwayTeamOrHomeTeam;
  awayTeamScore?: AwayTeamScoreOrHomeTeamScore;
  awayTeamShirtColour: string;
  competition: Competition;
  condition: Condition;
  endMatchDateTime: string;
  fixture: boolean;
  homeTeam: AwayTeamOrHomeTeam;
  homeTeamScore?: AwayTeamScoreOrHomeTeamScore;
  homeTeamShirtColour: string;
  id: string;
  kickoffTime: KickoffTime;
  leg?: Leg;
  legNumber?: number;
  lineupAvailable: boolean;
  lineupStatus: string;
  localUtcOffsetInHours: number;
  matchDateTime: string;
  matchDay: MatchDay;
  minute?: number; // TODO verify
  penaltyScorerList?: null[] | null;
  phase?: 'HALF_TIME_BREAK' | string; // Not sure what all the options are yet
  phaseDisplayText?: 'Half-time' | string; // Not sure what all the options are yet
  phaseDisplayTextShort?: 'HT' | string; // Not sure what all the options are yet
  reasonOfWin: string;
  redCardList?: null[] | null;
  referees?: RefereesEntity[] | null;
  relatedMatch: RelatedMatch;
  round: Round;
  scorerList?: ScorerListEntity[] | null;
  seasonYear: string;
  stadium: Stadium;
  status: string;
  webReference: string;
  winner?: string;
}

interface AwayTeamOrHomeTeam {
  bigLogoUrl: string;
  countryCode: string;
  displayName: string;
  displayNameShort: string;
  displayTeamCode: string;
  id: string;
  internationalName: string;
  isPlaceHolder: boolean;
  logoUrl: string;
  mediumLogoUrl: string;
  shirtColour: string;
  typeIsNational: boolean;
  typeTeam: string;
}

interface AwayTeamScoreOrHomeTeamScore {
  aggregatedScore?: number;
  score: number;
}

interface Competition {
  age: string;
  displayName: string;
  id: string;
  region: string;
  sex: string;
  sportsType: string;
  type: string;
}

interface Condition {
  humidity: number;
  pitchCondition: string;
  pitchConditionDisplayName: string;
  temperature: number;
  weatherCondition: string;
  weatherConditionDisplayName: string;
  windSpeed: number;
}

interface KickoffTime {
  date: string;
  dateTime: string;
}

// TODO verify if always there
interface Leg {
  dateFrom: string;
  dateTo: string;
  displayName: string;
  legNumber: number;
}

interface MatchDay {
  dateFrom: string;
  dateTo: string;
  id: string;
  name: string;
}

interface RefereesEntity {
  countryCode: string;
  displayName: string;
  displayNameShort: string;
  firstName: string;
  id: string;
  images: Images;
  lastName: string;
  role: string;
  roleDisplayName: string;
}

interface Images {
  SMALL_SQUARE: string;
}

interface RelatedMatch {
  awayTeamId: string;
  awayTeamScore: AwayTeamScoreOrHomeTeamScore1;
  homeTeamId: string;
  homeTeamScore: AwayTeamScoreOrHomeTeamScore1;
  id: string;
  legNumber: number;
  matchDateTime: string;
  reasonOfWin: string;
}

// TODO what
interface AwayTeamScoreOrHomeTeamScore1 {
  score: number;
}

interface Round {
  active: boolean;
  displayName: string;
  displayShortName: string;
  id: string;
  mode: string;
  modeType: string;
  name: string;
  orderInCompetition: number;
  phase: string;
  shortName: string;
}

interface ScorerListEntity {
  injuryTime?: number | null;
  minute: number;
  playerTeaser: PlayerTeaser;
  second: number;
  subType?: string | null;
  teamId: string;
}

interface PlayerTeaser {
  age: string;
  countryCode: string;
  detailedFieldPosition: string;
  displayCountryName: string;
  displayFirstName?: string | null;
  displayLastName: string;
  displayName: string;
  displayNameShort: string;
  fieldPosition: string;
  fieldPositionDisplayName: string;
  height: number;
  id: string;
  imageUrl: string;
  internationalName: string;
  weight: number;
}

interface Stadium {
  address: string;
  capacity: number;
  cityDisplayName: string;
  countryCode: string;
  displayName: string;
  geolocation: Geolocation;
  id: string;
  images: Images1;
  openingDate: string;
}

interface Geolocation {
  latitude: number;
  longitude: number;
}

interface Images1 {
  MEDIUM_WIDE: string;
  LARGE_ULTRA_WIDE: string;
}
