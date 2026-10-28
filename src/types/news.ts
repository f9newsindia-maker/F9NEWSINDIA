export type NewsCategory =
  | 'सभी'
  | 'देश'
  | 'महाराष्ट्र'
  | 'उत्तर प्रदेश'
  | 'राजनीति'
  | 'अपराध'
  | 'मनोरंजन'
  | 'खेल'
  | 'बिजनेस'
  | 'टेक्नोलॉजी'
  | 'स्थानीय समाचार';

export interface CommentItem {
  id: string;
  userName: string;
  userAvatar?: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: NewsCategory;
  imageUrl: string;
  publishedAt: string;
  reporterName: string;
  reporterId?: string;
  location: string;
  views: number;
  likes: number;
  shares: number;
  isBreaking?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  isSponsored?: boolean;
  sponsoredBrand?: string;
  videoUrl?: string;
  tags: string[];
  status: 'published' | 'pending' | 'rejected' | 'draft';
  rejectionReason?: string;
  comments: CommentItem[];
}

export interface NewsVideo {
  id: string;
  title: string;
  youtubeId: string;
  thumbnailUrl: string;
  duration: string;
  category: NewsCategory;
  views: string;
  publishedAt: string;
  isShort?: boolean;
  isLive?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'reporter' | 'admin';
  reporterBadgeId?: string;
  district?: string;
  savedArticleIds: string[];
  likedArticleIds: string[];
  notificationsEnabled: boolean;
  breakingAlertsEnabled: boolean;
  language: 'hi' | 'en';
}

export interface AdBanner {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  sponsorName: string;
  position: 'top' | 'feed' | 'article' | 'bottom';
  active: boolean;
}
