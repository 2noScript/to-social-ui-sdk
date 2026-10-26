import type { Buffer } from "node:buffer";

export type Platform =
  | "FACEBOOK"
  | "TIKTOK"
  | "DOUYIN"
  | "YOUTUBE"
  | "BILIBILI"
  | "INSTAGRAM"
  | "THREADS"
  | "TWITTER";

export type UnifiedContentType = "VIDEO" | "POST" | "IMAGE_ALBUM";

export interface UnifiedMediaVideo {
  url: string;
  quality?: string;
  backupUrls?: string[];
  width?: number;
  height?: number;
  durationSec?: number;
}

export interface UnifiedMediaImage {
  url: string;
  backupUrls?: string[];
  width?: number;
  height?: number;
}

export interface UnifiedMediaAudio {
  url?: string;
  title?: string;
  author?: string;
  durationSec?: number;
}

export interface UnifiedReactions {
  like?: number;
  love?: number;
  care?: number;
  haha?: number;
  wow?: number;
  sad?: number;
  angry?: number;
  dislike?: number;
}

export interface UnifiedContentStats {
  likes?: number;
  comments?: number;
  shares?: number;
  views?: number;
  bookmarks?: number;
  reposts?: number;
  reactions?: UnifiedReactions;
}

export interface UnifiedAuthorStats {
  followers?: number;
  following?: number;
  totalLikes?: number;
  postCount?: number;
  videoCount?: number;
}

export interface UnifiedAuthor {
  id: string;
  uniqueId?: string;
  name?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  bio?: string;
  isVerified?: boolean;
  webUrl?: string;
  stats?: UnifiedAuthorStats;
}

export interface UnifiedContent {
  id: string;
  platform: Platform;
  type: UnifiedContentType;
  webUrl: string;
  title?: string;
  description?: string;
  author: UnifiedAuthor;
  stats: UnifiedContentStats;
  media: {
    video?: UnifiedMediaVideo;
    videos?: UnifiedMediaVideo[];
    images?: UnifiedMediaImage[];
    audio?: UnifiedMediaAudio;
    coverUrl?: string;
  };
  publishedAt?: string;
  timestamp?: number;
  feedbackId?: string;
  extra?: Record<string, any>;
}

export interface UnifiedComment {
  id: string;
  contentId: string;
  text: string;
  author: {
    id: string;
    name?: string;
    avatarUrl?: string;
    uniqueId?: string;
    isVerified?: boolean;
    isAuthor?: boolean;
  };
  likes?: number;
  replyCount?: number;
  parentId?: string | null;
  publishedAt?: string;
  timestamp?: number;
  isPinned?: boolean;
  isAuthorLiked?: boolean;
  reactionType?: "like" | "love" | "care" | "haha" | "wow" | "sad" | "angry";
  reactions?: UnifiedReactions;
  replies?: UnifiedComment[];
}

export interface FontOption {
  name: string;
  data: ArrayBuffer | Buffer;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  style?: "normal" | "italic";
}

export interface RenderOptions {
  theme?: "dark" | "light" | "auto";
  template?: "post" | "video" | "reel" | "shorts" | "story" | "comment" | "thread" | "profile";
  scale?: number;
  width?: number;
  height?: number;
  watermark?: string;
  showBadges?: boolean;
  customFonts?: FontOption[];
  prefetchImages?: boolean;
}

export interface RenderCommentThreadOptions extends RenderOptions {
  title?: string;
  totalCount?: number;
}

export interface RenderResult {
  png: Buffer;
  svg: string;
  width: number;
  height: number;
  saveToFile(filePath: string): Promise<string>;
  asDataUrl(): string;
  asBuffer(): Buffer;
  asSvg(): string;
}
