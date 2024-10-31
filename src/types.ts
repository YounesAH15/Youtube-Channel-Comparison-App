export interface ChannelStats {
  id: string;
  title: string;
  description: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  thumbnailUrl: string;
  bannerUrl?: string;
  customUrl?: string;
  country?: string;
  publishedAt: string;
}

export interface PlaylistInfo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  itemCount: number;
  publishedAt: string;
}

export interface VideoStats {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: string;
  duration?: string;
}

export interface Comment {
  id: string;
  authorName: string;
  authorProfileUrl: string;
  text: string;
  likeCount: number;
  publishedAt: string;
}

export interface CommentThread {
  id: string;
  topComment: Comment;
  replyCount: number;
  replies: Comment[];
}

export interface ComparisonMetric {
  label: string;
  value1: number;
  value2: number;
  unit?: string;
}