


import { Suspense } from 'react';
import MainPageClient from './MainPageClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPageClient />
    </Suspense>
  );
}