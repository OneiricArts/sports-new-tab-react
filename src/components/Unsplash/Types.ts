export type TopicsResponse = Topic[];

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  published_at: string;
  updated_at: string;
  starts_at: string;
  ends_at?: null;
  featured: boolean;
  total_photos: number;
  current_user_contributions?: null[] | null;
  links: Links;
  status: string;
  owners?: OwnersEntity[] | null;
  total_current_user_submissions: TotalCurrentUserSubmissions;
  cover_photo: CoverPhoto;
  preview_photos?: PreviewPhotosEntity[] | null;
}

interface Links {
  self: string;
  html: string;
  photos: string;
}

interface OwnersEntity {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name?: string | null;
  twitter_username?: string | null;
  portfolio_url?: string | null;
  bio?: string | null;
  location?: string | null;
  links: Links1;
  profile_image: ProfileImage;
  instagram_username?: string | null;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
}

interface Links1 {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface TotalCurrentUserSubmissions {}

interface CoverPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at?: string | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description?: string | null;
  alt_description: string;
  urls: Urls;
  links: Links2;
  categories?: null[] | null;
  likes: number;
  liked_by_user: boolean;
  current_user_collections?: null[] | null;
  sponsorship?: null;
  user: User;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

interface Links2 {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name?: string | null;
  twitter_username?: string | null;
  portfolio_url: string;
  bio?: string | null;
  location?: string | null;
  links: Links1;
  profile_image: ProfileImage;
  instagram_username?: string | null;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
}

interface PreviewPhotosEntity {
  id: string;
  created_at: string;
  updated_at: string;
  urls: Urls;
}
