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

// NEW FEATURES INTERFACES

export interface EPaperPage {
  pageNumber: number;
  title: string;
  imageUrl: string;
}

export interface EPaperEdition {
  id: string;
  editionName: string;
  city: string;
  date: string;
  totalPages: number;
  pdfUrl?: string;
  pages: EPaperPage[];
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface DailyPoll {
  id: string;
  question: string;
  category: string;
  options: PollOption[];
  totalVotes: number;
  endsAt: string;
  userVotedOptionId?: string;
}

export interface CityWeather {
  city: string;
  temp: number;
  condition: string;
  aqi: number;
  aqiStatus: 'अच्छा' | 'मध्यम' | 'खराब' | 'बहुत खराब';
  high: number;
  low: number;
  humidity: number;
}

export interface RashifalSign {
  id: string;
  name: string;
  symbol: string;
  forecast: string;
  luckyColor: string;
  luckyNumber: number;
  rating: number; // 1 to 5 stars
}

export interface PanchangInfo {
  date: string;
  tithi: string;
  nakshatra: string;
  sunrise: string;
  sunset: string;
  rahukaal: string;
  shubhMuhurat: string;
}

export interface WebStorySlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface WebStory {
  id: string;
  title: string;
  coverImage: string;
  views: string;
  slides: WebStorySlide[];
}

export interface PushNotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  category: NewsCategory;
  isRead: boolean;
  articleId?: string;
}
