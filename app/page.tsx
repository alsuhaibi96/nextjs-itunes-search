'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Home, Compass, List as QueueList, Music, Clock, Search } from 'lucide-react';

interface Podcast {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
}

export default function IndexPage() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async () => {
    const q = term.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/search?term=${encodeURIComponent(q)}`);
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Unknown error');
      setResults(body.data);
    } catch (e: any) {
      setError(e.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // trigger search on Enter
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="flex flex-row justify-between bg-gray-800 p-4 md:flex-col md:justify-start md:space-y-4">
        <Home className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
        <Compass className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
        <QueueList className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
        <Music className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
        <Clock className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Header with search bar */}
        <header className="flex flex-col md:flex-row items-center px-6 py-4 border-b border-gray-700 gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="ابحث عن البودكاست…"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={term}
              onChange={e => setTerm(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>
          <button
            onClick={onSearch}
            disabled={loading}
            className="py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? 'جاري البحث…' : 'ابحث'}
          </button>
        </header>

        {/* Search results */}
        <main className="flex-1 overflow-y-auto p-6">
          {error && <p className="text-red-400 mb-4">خطأ: {error}</p>}

          {!loading && results.length === 0 && term && (
            <p className="text-gray-400 mb-4">لا توجد نتائج لـ “{term}”.</p>
          )}

          {results.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4">
                نتائج البحث لـ “{term}”
              </h2>
              <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                {results.map(p => (
                  <div key={p.collectionId} className="w-36 sm:w-40">
                    <Image
                      src={p.artworkUrl100}
                      alt={p.collectionName}
                      width={160}
                      height={160}
                      className="rounded-lg object-cover"
                    />
                    <p className="mt-2 truncate">{p.collectionName}</p>
                    <p className="text-sm text-gray-400 truncate">
                      {p.artistName}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
