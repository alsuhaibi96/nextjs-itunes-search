'use client';

import React from 'react';
import Image from 'next/image';
import { Home, Compass, List as QueueList, Music, Clock, Search } from 'lucide-react';

interface MediaItem {
  image: string;
  title: string;
  author: string;
}

const podcasts: MediaItem[] = [
  { image: '/images/Screenshot from 2025-06-21 04-09-42.png', title: '! يك فنجان أمريكانو', author: 'Ln9Lounge' },
  { image: '/images/Screenshot from 2025-06-21 04-09-47.png', title: 'يك فنجان قهوة', author: 'Mohammad' },
  { image: '/images/Screenshot from 2025-06-21 04-09-53.png', title: 'فنجان قهوة - الحلقة الأولى', author: 'Galal Al-Emadi' },
  { image: '/images/Screenshot from 2025-06-21 04-10-03.png', title: 'فنجان مع بهية الأنصاري', author: 'Bothaina Al Ansari' },
  { image: '/images/Screenshot from 2025-06-21 04-10-09.png', title: 'كافه يك فنجان آرامش', author: 'Sanaz Eghtehadinia' },
  { image: '/images/Screenshot from 2025-06-21 04-10-14.png', title: 'أفكار مع فنجان القهوة', author: 'Kero Ragy' },
];

const episodes: MediaItem[] = [
  { image: '/images/Screenshot from 2025-06-21 04-10-23.png', title: 'فنجان مسموم', author: 'حنانه' },
  { image: '/images/Screenshot from 2025-06-21 04-10-23.png', title: 'فنجان قهوة', author: 'Nataloo Talks' },
  { image: '/images/Screenshot from 2025-06-21 04-10-23.png', title: 'بودكاست النور', author: 'Al Noor with Coach Maysoon' },
  { image: '/images/Screenshot from 2025-06-21 04-10-23.png', title: 'أخبار لك', author: 'أخبار لك' },
  { image: '/images/Screenshot from 2025-06-21 04-10-23.png', title: 'أول فنجان قهوة', author: 'قهوة وحكاية مع مينا جحج' },
  { image: '/images/Screenshot from 2025-06-21 04-10-23.png', title: 'The Cup - فنجان', author: 'Black Dog Radio' },
  { image: '/images/Screenshot from 2025-06-21 04-10-23.png', title: 'فنجان مع عائشة', author: 'فنجان مع عائشة' },
  { image: '/images/Screenshot from 2025-06-21 04-10-23.png', title: 'همسة فنجان | الفرص', author: 'Podcasts By Reham Ayam' },
];

const IndexPage: React.FC = () => (
  <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
    <aside className="flex flex-row  justify-between bg-gray-800 p-4 md:justify-start md:flex-col  lg:flex-col md:space-y-2">
      <Home className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
      <Compass className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
      <QueueList className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
      <Music className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
      <Clock className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
    </aside>

    <div className="flex-1 flex flex-col">
      <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-4 border-b border-gray-700 gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-4">
          <button className="py-1 px-4">Log in</button>
          <button className="py-1 px-4 bg-blue-600 rounded-lg hover:bg-blue-500">Sign up</button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-900">
        <section>
          <h2 className="text-xl font-semibold mb-4">Top podcasts for فنجان</h2>
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start">
            {podcasts.map((p, idx) => (
              <div key={idx} className="w-36 sm:w-40 flex-shrink-0">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={160}
                  height={160}
                  className="rounded-lg object-cover"
                />
                <p className="mt-2 truncate">{p.title}</p>
                <p className="text-sm text-gray-400 truncate">{p.author}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Top episodes for فنجان</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((e, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <Image
                  src={e.image}
                  alt={e.title}
                  width={64}
                  height={64}
                  className="rounded-sm object-cover"
                />
                <div>
                  <p className="truncate">{e.title}</p>
                  <p className="text-sm text-gray-400 truncate">{e.author}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  </div>
);

export default IndexPage;
