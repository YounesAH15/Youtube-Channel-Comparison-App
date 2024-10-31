import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchChannelProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function SearchChannel({ onSearch, placeholder, disabled }: SearchChannelProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || 'Search for a YouTube channel...'}
          className="w-full px-4 py-2 pl-10 pr-12 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled={disabled}
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <button
          type="submit"
          disabled={!query.trim() || disabled}
          className="absolute right-2 top-1.5 px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </div>
    </form>
  );
}