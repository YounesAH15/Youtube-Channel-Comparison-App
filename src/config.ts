// Replace with your YouTube API key
export const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';

export const validateApiKey = () => {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YouTube API key is not configured. Please add VITE_YOUTUBE_API_KEY to your environment variables.');
  }
};