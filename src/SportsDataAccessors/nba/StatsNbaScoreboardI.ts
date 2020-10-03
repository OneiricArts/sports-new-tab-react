export interface StatsNbaScoreboardI {
  _internal: Internal;
  numGames: number;
  games?: GamesEntity[] | null;
}

interface Internal {
  pubDateTime: string;
  igorPath: string;
  routeName: string;
  routeValue: string;
  xslt: string;
  xsltForceRecompile: string;
  xsltInCache: string;
  xsltCompileTimeMillis: string;
  xsltTransformTimeMillis: string;
  consolidatedDomKey: string;
  endToEndTimeMillis: string;
}

interface GamesEntity {
  seasonStageId: number;
  seasonYear: string;
  leagueName: string;
  gameId: string;
  arena: Arena;
  isGameActivated: boolean;
  statusNum: number;
  extendedStatusNum: number;
  startTimeEastern: string;
  startTimeUTC: string;
  endTimeUTC: string;
  startDateEastern: string;
  homeStartDate: string;
  homeStartTime: string;
  visitorStartDate: string;
  visitorStartTime: string;
  gameUrlCode: string;
  clock: string;
  isBuzzerBeater: boolean;
  isPreviewArticleAvail: boolean;
  isRecapArticleAvail: boolean;
  nugget: Nugget;
  attendance: string;
  tickets: Tickets;
  hasGameBookPdf: boolean;
  isStartTimeTBD: boolean;
  isNeutralVenue: boolean;
  gameDuration: GameDuration;
  tags?: string[] | null;
  period: Period;
  vTeam: VTeamOrHTeam;
  hTeam: VTeamOrHTeam;
  watch: Watch;
}

interface Arena {
  name: string;
  isDomestic: boolean;
  city: string;
  stateAbbr: string;
  country: string;
}

interface Nugget {
  text: string;
}

interface Tickets {
  mobileApp: string;
  desktopWeb: string;
  mobileWeb: string;
  leagGameInfo: string;
  leagTix: string;
}

interface GameDuration {
  hours: string;
  minutes: string;
}

interface Period {
  current: number;
  type: number;
  maxRegular: number;
  isHalftime: boolean;
  isEndOfPeriod: boolean;
}

interface VTeamOrHTeam {
  teamId: string;
  triCode: string;
  win: string;
  loss: string;
  seriesWin: string;
  seriesLoss: string;
  score: string;
  linescore?: LinescoreEntity[] | null;
}

interface LinescoreEntity {
  score: string;
}

interface Watch {
  broadcast: Broadcast;
}

interface Broadcast {
  broadcasters: Broadcasters;
  video: Video;
  audio: Audio;
}

interface Broadcasters {
  national?:
    | (NationalEntityOrCanadianEntityOrVTeamEntityOrHTeamEntityOrBroadcastersEntity | null)[]
    | null;
  canadian?:
    | NationalEntityOrCanadianEntityOrVTeamEntityOrHTeamEntityOrBroadcastersEntity1[]
    | null;
  vTeam?:
    | NationalEntityOrCanadianEntityOrVTeamEntityOrHTeamEntityOrBroadcastersEntity1[]
    | null;
  hTeam?:
    | NationalEntityOrCanadianEntityOrVTeamEntityOrHTeamEntityOrBroadcastersEntity1[]
    | null;
  spanish_hTeam?: null[] | null;
  spanish_vTeam?: null[] | null;
  spanish_national?: null[] | null;
}

interface NationalEntityOrCanadianEntityOrVTeamEntityOrHTeamEntityOrBroadcastersEntity {
  shortName: string;
  longName: string;
}

interface NationalEntityOrCanadianEntityOrVTeamEntityOrHTeamEntityOrBroadcastersEntity1 {
  shortName: string;
  longName: string;
}

interface Video {
  regionalBlackoutCodes: string;
  canPurchase: boolean;
  isLeaguePass: boolean;
  isNationalBlackout: boolean;
  isTNTOT: boolean;
  isVR: boolean;
  tntotIsOnAir: boolean;
  isNextVR: boolean;
  isNBAOnTNTVR: boolean;
  isMagicLeap: boolean;
  isOculusVenues: boolean;
  streams?: StreamsEntity[] | null;
  deepLink?: (DeepLinkEntity | null)[] | null;
}

interface StreamsEntity {
  streamType: string;
  isOnAir: boolean;
  doesArchiveExist: boolean;
  isArchiveAvailToWatch: boolean;
  streamId: string;
  duration: number;
}

interface DeepLinkEntity {
  broadcaster: string;
  regionalMarketCodes: string;
  iosApp: string;
  androidApp: string;
  desktopWeb: string;
  mobileWeb: string;
}

interface Audio {
  national: National;
  vTeam: VTeamOrHTeam1;
  hTeam: VTeamOrHTeam1;
}

interface National {
  streams?: StreamsEntity1[] | null;
  broadcasters?: null[] | null;
}

interface StreamsEntity1 {
  language: string;
  isOnAir: boolean;
  streamId: string;
}

interface VTeamOrHTeam1 {
  streams?: StreamsEntity1[] | null;
  broadcasters?:
    | NationalEntityOrCanadianEntityOrVTeamEntityOrHTeamEntityOrBroadcastersEntity1[]
    | null;
}
