export interface SubredditJson {
  kind: string;
  data: Data;
}

interface Data {
  after: string;
  dist: number;
  modhash: string;
  geo_filter?: null;
  children: ChildrenEntity[];
  before?: null;
}
interface ChildrenEntity {
  kind: string;
  data: Data1;
}

interface Data1 {
  approved_at_utc?: null;
  subreddit: string;
  selftext: string;
  author_fullname: string;
  saved: boolean;
  mod_reason_title?: null;
  gilded: number;
  clicked: boolean;
  title: string;
  link_flair_richtext?: (LinkFlairRichtextEntity | null)[] | null;
  subreddit_name_prefixed: string;
  hidden: boolean;
  pwls: number;
  link_flair_css_class?: string | null;
  downs: number;
  top_awarded_type?: null;
  hide_score: boolean;
  name: string;
  quarantine: boolean;
  link_flair_text_color: string;
  upvote_ratio: number;
  author_flair_background_color?: string | null;
  subreddit_type: string;
  ups: number;
  total_awards_received: number;
  media_embed: MediaEmbed;
  author_flair_template_id?: string | null;
  is_original_content: boolean;
  user_reports?: null[] | null;
  secure_media?: SecureMediaOrMedia | null;
  is_reddit_media_domain: boolean;
  is_meta: boolean;
  category?: null;
  secure_media_embed: SecureMediaEmbed;
  link_flair_text?: string | null;
  can_mod_post: boolean;
  score: number;
  approved_by?: null;
  is_created_from_ads_ui: boolean;
  author_premium: boolean;
  thumbnail: string;
  edited: boolean | number;
  author_flair_css_class?: string | null;
  author_flair_richtext?: (AuthorFlairRichtextEntity | null)[] | null;
  gildings: Gildings;
  content_categories?: null;
  is_self: boolean;
  mod_note?: null;
  created: number;
  link_flair_type: string;
  wls: number;
  removed_by_category?: null;
  banned_by?: null;
  author_flair_type: string;
  domain: string;
  allow_live_comments: boolean;
  selftext_html?: string | null;
  likes?: null;
  suggested_sort?: string | null;
  banned_at_utc?: null;
  view_count?: null;
  archived: boolean;
  no_follow: boolean;
  is_crosspostable: boolean;
  pinned: boolean;
  over_18: boolean;
  all_awardings?: (AllAwardingsEntity | null)[] | null;
  awarders?: null[] | null;
  media_only: boolean;
  link_flair_template_id?: string | null;
  can_gild: boolean;
  spoiler: boolean;
  locked: boolean;
  author_flair_text?: string | null;
  treatment_tags?: null[] | null;
  visited: boolean;
  removed_by?: null;
  num_reports?: null;
  distinguished?: null;
  subreddit_id: string;
  author_is_blocked: boolean;
  mod_reason_by?: null;
  removal_reason?: null;
  link_flair_background_color: string;
  id: string;
  is_robot_indexable: boolean;
  report_reasons?: null;
  author: string;
  discussion_type?: null;
  num_comments: number;
  send_replies: boolean;
  whitelist_status: string;
  contest_mode: boolean;
  mod_reports?: null[] | null;
  author_patreon_flair: boolean;
  author_flair_text_color?: string | null;
  permalink: string;
  parent_whitelist_status: string;
  stickied: boolean;
  url: string;
  subreddit_subscribers: number;
  created_utc: number;
  num_crossposts: number;
  media?: SecureMediaOrMedia1 | null;
  is_video: boolean;
  url_overridden_by_dest?: string | null;
}

interface LinkFlairRichtextEntity {
  e: string;
  t: string;
}

interface MediaEmbed {
  content?: string | null;
  width?: number | null;
  scrolling?: boolean | null;
  height?: number | null;
}

interface SecureMediaOrMedia {
  reddit_video?: RedditVideo | null;
  type?: string | null;
  oembed?: Oembed | null;
}

interface RedditVideo {
  bitrate_kbps: number;
  fallback_url: string;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: string;
}

interface Oembed {
  provider_url: string;
  version: string;
  url?: string | null;
  author_name: string;
  height?: number | null;
  width: number;
  html: string;
  author_url: string;
  provider_name: string;
  cache_age?: number | null;
  type: string;
  title?: string | null;
  thumbnail_width?: number | null;
  thumbnail_url?: string | null;
  thumbnail_height?: number | null;
}

interface SecureMediaEmbed {
  content?: string | null;
  width?: number | null;
  scrolling?: boolean | null;
  media_domain_url?: string | null;
  height?: number | null;
}

interface AuthorFlairRichtextEntity {
  a?: string | null;
  e: string;
  u?: string | null;
  t?: string | null;
}

interface Gildings {
  gid_2?: number | null;
  gid_1?: number | null;
}

interface AllAwardingsEntity {
  giver_coin_reward?: null;
  subreddit_id?: null;
  is_new: boolean;
  days_of_drip_extension?: null;
  coin_price: number;
  id: string;
  penny_donate?: null;
  award_sub_type: string;
  coin_reward: number;
  icon_url: string;
  days_of_premium?: number | null;
  tiers_by_required_awardings?: null;
  resized_icons?: ResizedIconsEntityOrResizedStaticIconsEntity[] | null;
  icon_width: number;
  static_icon_width: number;
  start_date?: null;
  is_enabled: boolean;
  awardings_required_to_grant_benefits?: null;
  description: string;
  end_date?: null;
  subreddit_coin_reward: number;
  count: number;
  static_icon_height: number;
  name: string;
  resized_static_icons?: ResizedIconsEntityOrResizedStaticIconsEntity[] | null;
  icon_format?: string | null;
  icon_height: number;
  penny_price?: number | null;
  award_type: string;
  static_icon_url: string;
}

interface ResizedIconsEntityOrResizedStaticIconsEntity {
  url: string;
  width: number;
  height: number;
}

interface SecureMediaOrMedia1 {
  reddit_video?: RedditVideo | null;
  type?: string | null;
  oembed?: Oembed | null;
}
