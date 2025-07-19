'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function RawPage() {
  const router = useRouter();

  const navigateTo = (mode: string) => {
    router.push(`/?mode=${mode}`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">RAW PAGE</h1>
      <p className="text-gray-500">Click a button to set mode in the URL:</p>

      <div className="flex gap-4">
        <button
          onClick={() => navigateTo('restaurant')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Restaurant Mode
        </button>

        <button
          onClick={() => navigateTo('property_management')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Property Management Mode
        </button>
      </div>
    </div>
  );
}