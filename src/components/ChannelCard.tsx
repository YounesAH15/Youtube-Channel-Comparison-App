import React from 'react';
import { Users, Video, Eye } from 'lucide-react';
import type { ChannelStats } from '../types';

interface ChannelCardProps {
  channel: ChannelStats | null;
  isLoading?: boolean;
}

export function ChannelCard({ channel, isLoading }: ChannelCardProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-gray-200 h-16 w-16"></div>
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">Search for a YouTube channel to see stats</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4">
        <img
          src={channel.thumbnailUrl}
          alt={channel.title}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{channel.title}</h3>
          <p className="text-sm text-gray-500">
            {channel.customUrl || 'No custom URL'}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <Users className="w-6 h-6 mx-auto text-red-600 mb-2" />
          <div className="text-lg font-semibold">
            {new Intl.NumberFormat().format(channel.subscriberCount)}
          </div>
          <div className="text-sm text-gray-500">Subscribers</div>
        </div>
        <div className="text-center">
          <Video className="w-6 h-6 mx-auto text-red-600 mb-2" />
          <div className="text-lg font-semibold">
            {new Intl.NumberFormat().format(channel.videoCount)}
          </div>
          <div className="text-sm text-gray-500">Videos</div>
        </div>
        <div className="text-center">
          <Eye className="w-6 h-6 mx-auto text-red-600 mb-2" />
          <div className="text-lg font-semibold">
            {new Intl.NumberFormat().format(channel.viewCount)}
          </div>
          <div className="text-sm text-gray-500">Views</div>
        </div>
      </div>
    </div>
  );
}