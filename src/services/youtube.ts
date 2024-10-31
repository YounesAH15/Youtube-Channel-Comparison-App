import { validateApiKey, YOUTUBE_API_KEY } from '../config';
import { ChannelStats, PlaylistInfo, VideoStats, CommentThread } from '../types';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export class YouTubeAPI {
  private static async fetchData(endpoint: string, params: Record<string, string>) {
    validateApiKey();
    
    const queryParams = new URLSearchParams({
      ...params,
      key: YOUTUBE_API_KEY,
    });

    try {
      const response = await fetch(`${BASE_URL}/${endpoint}?${queryParams}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message || 'YouTube API Error');
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`YouTube API Error: ${error.message}`);
      }
      throw error;
    }
  }

  static async searchChannels(query: string): Promise<ChannelStats[]> {
    try {
      const searchData = await this.fetchData('search', {
        part: 'snippet',
        type: 'channel',
        q: query,
        maxResults: '5',
      });

      const channelIds = searchData.items.map((item: any) => item.id.channelId);
      
      if (channelIds.length === 0) {
        return [];
      }

      const channelsData = await this.fetchData('channels', {
        part: 'snippet,statistics,brandingSettings',
        id: channelIds.join(','),
      });

      return channelsData.items.map((channel: any) => ({
        id: channel.id,
        title: channel.snippet.title,
        description: channel.snippet.description,
        subscriberCount: parseInt(channel.statistics.subscriberCount) || 0,
        videoCount: parseInt(channel.statistics.videoCount) || 0,
        viewCount: parseInt(channel.statistics.viewCount) || 0,
        thumbnailUrl: channel.snippet.thumbnails.default.url,
        bannerUrl: channel.brandingSettings.image?.bannerExternalUrl,
        customUrl: channel.snippet.customUrl,
        country: channel.snippet.country,
        publishedAt: channel.snippet.publishedAt,
      }));
    } catch (error) {
      console.error('Error in searchChannels:', error);
      throw error;
    }
  }

  // ... rest of the methods remain the same as they were
}