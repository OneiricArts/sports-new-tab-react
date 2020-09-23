export interface MLBApi {
  subject: string;
  copyright: string;
  data: Data;
}

export interface Data {
  games: Games;
}

export interface Games {
  game: GameEntity[] | GameEntity | null; // TODO verify
  'xmlns:xs': string;
  year: string;
  month: string;
  day: string;
  modified_date: string;
  next_day_date: string;
}

export interface GameEntity {
  links: Links;
  broadcast: Broadcast;
  status: Status;
  home_runs: HomeRuns;
  linescore: Linescore;
  winning_pitcher?: WinningPitcherOrLosingPitcherOrOpposingPitcher | null;
  losing_pitcher?: WinningPitcherOrLosingPitcherOrOpposingPitcher1 | null;
  save_pitcher?: SavePitcher | null;
  video_thumbnail: string;
  video_thumbnails: VideoThumbnails;
  game_media: GameMedia;
  id: string;
  game_pk: string;
  venue: string;
  original_date: string;
  resume_date: string;
  time: string;
  time_date: string;
  time_date_aw_lg: string;
  time_date_hm_lg: string;
  time_zone: string;
  ampm: string;
  first_pitch_et: string;
  away_time: string;
  away_time_zone: string;
  away_ampm: string;
  home_time: string;
  home_time_zone: string;
  home_ampm: string;
  game_type: string;
  tiebreaker_sw: string;
  time_zone_aw_lg: string;
  time_zone_hm_lg: string;
  time_aw_lg: string;
  aw_lg_ampm: string;
  tz_aw_lg_gen: string;
  time_hm_lg: string;
  hm_lg_ampm: string;
  tz_hm_lg_gen: string;
  venue_id: string;
  stats_season: string;
  scheduled_innings: string;
  description: string;
  series: string;
  ser_home_nbr: string;
  series_num: string;
  ser_games: string;
  home_name_abbrev: string;
  home_code: string;
  home_file_code: string;
  home_team_id: string;
  home_team_city: string;
  home_team_name: string;
  home_division: string;
  home_league_id: string;
  home_sport_code: string;
  away_name_abbrev: string;
  away_code: string;
  away_file_code: string;
  away_team_id: string;
  away_team_city: string;
  away_team_name: string;
  away_division: string;
  away_league_id: string;
  away_sport_code: string;
  day: string;
  gameday_sw: string;
  double_header_sw: string;
  game_nbr: string;
  tbd_flag: 'Y' | 'N'; // VERIFY no other options
  venue_w_chan_loc: string;
  location: string;
  gameday: string;
  away_games_back: string;
  away_games_back_wildcard: string;
  away_win: string;
  away_loss: string;
  home_games_back: string;
  home_games_back_wildcard: string;
  home_win: string;
  home_loss: string;
  game_data_directory: string;
  inning_break_length: string;
  league: string;
  review?: Review | null;
  batter?: BatterOrOndeckOrInholeOrDueUpBatterOrDueUpOndeckOrDueUpInhole | null;
  ondeck?: BatterOrOndeckOrInholeOrDueUpBatterOrDueUpOndeckOrDueUpInhole1 | null;
  inhole?: BatterOrOndeckOrInholeOrDueUpBatterOrDueUpOndeckOrDueUpInhole2 | null;
  due_up_batter?: BatterOrOndeckOrInholeOrDueUpBatterOrDueUpOndeckOrDueUpInhole3 | null;
  due_up_ondeck?: BatterOrOndeckOrInholeOrDueUpBatterOrDueUpOndeckOrDueUpInhole4 | null;
  due_up_inhole?: BatterOrOndeckOrInholeOrDueUpBatterOrDueUpOndeckOrDueUpInhole5 | null;
  pitcher?: Pitcher | null;
  opposing_pitcher?: WinningPitcherOrLosingPitcherOrOpposingPitcher2 | null;
  pbp?: Pbp | null;
  runners_on_base?: RunnersOnBase | null;
}

export interface Links {
  mlbtv: string;
  wrapup: string;
  home_audio: string;
  away_audio: string;
  home_preview: string;
  away_preview: string;
  preview: string;
  tv_station: string;
}

export interface Broadcast {
  home: HomeOrAway;
  away: HomeOrAway;
}

export interface HomeOrAway {
  tv: string;
  radio: string;
}

export interface Status {
  status: string;
  ind: string;
  inning_state: string;
  note: string;
  reason: string;
  inning: string;
  balls?: string | null;
  strikes?: string | null;
  outs?: string | null;
  top_inning: string;
  is_perfect_game: string;
  is_no_hitter: string;
  b?: string | null;
  s?: string | null;
  o?: string | null;
}

export interface HomeRuns {}
export interface Linescore {
  inning?: InningEntityOrHOrEOrHrOrSbOrSo[] | null;
  r: R;
  h: InningEntityOrHOrEOrHrOrSbOrSo;
  e: InningEntityOrHOrEOrHrOrSbOrSo;
  hr: InningEntityOrHOrEOrHrOrSbOrSo;
  sb: InningEntityOrHOrEOrHrOrSbOrSo;
  so: InningEntityOrHOrEOrHrOrSbOrSo;
}
export interface InningEntityOrHOrEOrHrOrSbOrSo {
  home: string;
  away: string;
}
export interface R {
  home: string;
  away: string;
  diff: string;
}
export interface WinningPitcherOrLosingPitcherOrOpposingPitcher {
  first: string;
  id: string;
  last: string;
  name_display_roster: string;
  number: string;
  wins: string;
  losses: string;
  era: string;
}
export interface WinningPitcherOrLosingPitcherOrOpposingPitcher1 {
  first: string;
  id: string;
  last: string;
  name_display_roster: string;
  number: string;
  wins: string;
  losses: string;
  era: string;
}
export interface SavePitcher {
  first: string;
  id: string;
  last: string;
  name_display_roster: string;
  number: string;
  wins: string;
  losses: string;
  era: string;
  saves: string;
  svo: string;
}
export interface VideoThumbnails {
  thumbnail?: ThumbnailEntity[] | null;
}
export interface ThumbnailEntity {
  scenario: string;
  width: string;
  height: string;
  text: string;
}
export interface GameMedia {
  media?: MediaEntity[] | null;
}
export interface MediaEntity {
  type: string;
  calendar_event_id?: string | null;
  start?: string | null;
  title?: string | null;
  has_mlbtv?: string | null;
  has_milbtv?: string | null;
  thumbnail: string;
  free?: string | null;
  enhanced?: string | null;
  media_state?: string | null;
  content_id?: string | null;
  topic_id?: string | null;
  headline?: string | null;
}
export interface Review {
  challenges_away_used: string;
  challenges_away_remaining: string;
  challenges_home_used: string;
  challenges_home_remaining: string;
}
export interface BatterOrOndeckOrInholeOrDueUpBatterOrDueUpOndeckOrDueUpInhole {
  id: string;
  last: string;
  first: string;
  name_display_roster: string;
  number: string;
  pos: string;
  ab: string;
  h: string;
  avg: string;
  hr: string;
  rbi: string;
  slg: string;
  ops: string;
  obp: string;
}
export interface BatterOrOndeckOrInholeOrDueUpBatterOrDueUpOndeckOrDueUpInhole1 {
  id: string;
  last: string;
  first: string;
  name_display_roster: string;
  number: string;
  pos: string;
  ab: string;
  h: string;
  avg: string;
  hr: string;
  rbi: string;
  slg: string;
  ops: string;
  obp: string;
}
export interface BatterOrOndeckOrInholeOrDueUpBatterOrDueUpOndeckOrDueUpInhole2 {
  id: string;
  last: string;
  first: string;
  name_display_roster: string;
  number: string;
  pos: string;
  ab: string;
  h: string;
  avg: string;
  hr: string;
  rbi: string;
  slg: string;
  ops: string;
  obp: string;
}
export interface BatterOrOndeckOrInholeOrDueUpBatterOrDueUpOndeckOrDueUpInhole3 {
  id: string;
  last: string;
  first: string;
  name_display_roster: string;
  number: string;
  pos: string;
  ab: string;
  h: string;
  avg: string;
  hr: string;
  rbi: string;
  slg: string;
  ops: string;
  obp: string;
}
export interface BatterOrOndeckOrInholeOrDueUpBatterOrDueUpOndeckOrDueUpInhole4 {
  id: string;
  last: string;
  first: string;
  name_display_roster: string;
  number: string;
  pos: string;
  ab: string;
  h: string;
  avg: string;
  hr: string;
  rbi: string;
  slg: string;
  ops: string;
  obp: string;
}
export interface BatterOrOndeckOrInholeOrDueUpBatterOrDueUpOndeckOrDueUpInhole5 {
  id: string;
  last: string;
  first: string;
  name_display_roster: string;
  number: string;
  pos: string;
  ab: string;
  h: string;
  avg: string;
  hr: string;
  rbi: string;
  slg: string;
  ops: string;
  obp: string;
}
export interface Pitcher {
  id: string;
  last: string;
  first: string;
  name_display_roster: string;
  number: string;
  wins: string;
  losses: string;
  era: string;
  er: string;
  ip: string;
}
export interface WinningPitcherOrLosingPitcherOrOpposingPitcher2 {
  first: string;
  id: string;
  last: string;
  name_display_roster: string;
  number: string;
  wins: string;
  losses: string;
  era: string;
}

export interface Pbp {
  last: string;
}

export interface RunnersOnBase {
  runner_on_1b: RunnerOn1b;
  status: string;
}

export interface RunnerOn1b {
  id: string;
  last: string;
  first: string;
  name_display_roster: string;
  number: string;
}
