import React from 'react';
import { Youtube } from 'lucide-react';
import { SearchChannel } from './components/SearchChannel';
import { ChannelCard } from './components/ChannelCard';
import { ComparisonChart } from './components/ComparisonChart';
import { YouTubeAPI } from './services/youtube';
import type { ChannelStats } from './types';

function App() {
  const [channel1, setChannel1] = React.useState<ChannelStats | null>(null);
  const [channel2, setChannel2] = React.useState<ChannelStats | null>(null);
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const searchChannel = async (
    query: string,
    setChannel: React.Dispatch<React.SetStateAction<ChannelStats | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const channels = await YouTubeAPI.searchChannels(query);
      if (channels.length > 0) {
        setChannel(channels[0]);
      } else {
        throw new Error('No channel found');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error fetching channel data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getComparisonMetrics = () => {
    if (!channel1 || !channel2) return [];

    return [
      {
        label: 'Subscribers',
        value1: channel1.subscriberCount,
        value2: channel2.subscriberCount,
      },
      {
        label: 'Total Views',
        value1: channel1.viewCount,
        value2: channel2.viewCount,
      },
      {
        label: 'Videos',
        value1: channel1.videoCount,
        value2: channel2.videoCount,
      },
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Youtube className="w-8 h-8 text-red-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">
            YouTube Channel Comparison
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <SearchChannel
              onSearch={(query) => searchChannel(query, setChannel1, setLoading1)}
              placeholder="Search first channel..."
              disabled={loading1}
            />
            <ChannelCard channel={channel1} isLoading={loading1} />
          </div>

          <div className="space-y-4">
            <SearchChannel
              onSearch={(query) => searchChannel(query, setChannel2, setLoading2)}
              placeholder="Search second channel..."
              disabled={loading2}
            />
            <ChannelCard channel={channel2} isLoading={loading2} />
          </div>
        </div>

        {channel1 && channel2 && (
          <ComparisonChart metrics={getComparisonMetrics()} />
        )}
      </div>
    </div>
  );
}

export default App;