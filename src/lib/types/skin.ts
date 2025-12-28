export type SkinQuality = 'common' | 'rare' | 'epic' | 'legendary';
export type SkinVersion = 'retail' | 'classic' | 'wrath';
export type SortOption = 'default' | 'latest' | 'likes' | 'name-asc' | 'name-desc';

export interface SkinAuthor {
  id: string;
  name: string;
  avatar?: string;
}

export interface SkinMedia {
  thumbnail: string;
  images: Array<{
    url: string;
    width: number;
    height: number;
    alt?: string;
  }>;
  videos?: Array<{
    url: string;
    thumbnail: string;
    duration: number;
  }>;
}

export interface SkinStats {
  likes: number;
  views: number;
  downloads?: number;
  comments?: number;
}

export interface Skin {
  id: string | number;
  name: string;
  nameEn?: string;
  description: string;
  descriptionFull?: string;
  
  author?: SkinAuthor;
  
  quality: SkinQuality;
  versions: SkinVersion[];
  tags: string[];
  
  media?: SkinMedia;
  image?: string;
  video?: string;
  
  stats?: SkinStats;
  downloads?: number;
  rating?: number;
  reviews?: number;
  
  createdAt?: string;
  updatedAt?: string;
  lastUpdate?: string;
  
  sortOrder?: number;
  featured?: boolean;
  status?: 'draft' | 'published' | 'archived';
  
  // Legacy fields for compatibility
  price?: number;
  originalPrice?: number;
  category?: string;
  features?: string[];
  compatibility?: string;
}

export interface SkinFilterParams {
  versions?: SkinVersion[];
  tags?: string[];
  quality?: SkinQuality[];
  search?: string;
  sort?: SortOption;
  page?: number;
  pageSize?: number;
}

export interface SkinListResponse {
  skins: Skin[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
