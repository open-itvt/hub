'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const DEADLINE = new Date('2026-06-20T20:00:00+02:00').getTime();
const TEN_MINUTES = 10 * 60 * 1000;

export default function CountdownTimer() {
  const pathname = usePathname();
  const [diff, setDiff] = useState(() => DEADLINE - Date.now());

  const isStaticAndroid = pathname.startsWith('/static/android');

  useEffect(() => {
    const tick = () => setDiff(DEADLINE - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (isStaticAndroid) return null;

  if (diff <= 0) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl sm:text-4xl font-bold mb-8 text-center px-4">
          Serwis Hub iTVT został zamknięty
        </h1>
        <a
          href="https://vod.itvt.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-blue-600 text-white text-lg sm:text-xl font-semibold rounded-xl hover:bg-blue-700 transition-all"
        >
          Przejdź do iVOD
        </a>
      </div>
    );
  }

  if (diff > TEN_MINUTES) return null;

  const min = Math.floor(diff / 60000);
  const sec = Math.floor((diff % 60000) / 1000);
  const display = `${min}:${String(sec).padStart(2, '0')}`;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]">
      <div className="bg-blue-600 text-white font-mono text-3xl font-bold px-8 py-3 rounded-xl shadow-2xl tracking-wider">
        {display}
      </div>
    </div>
  );
}
