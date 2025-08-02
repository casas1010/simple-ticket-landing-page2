'use client';

import { Suspense, useEffect, useState } from 'react';
import MainPageClient from './MainPageClient';

import { MobileProvider } from './core/context/mobile_context';
import { ModuleProvider } from './core/context/module';
import { isMobileUserAgent } from './core/context_utils/is_mobile';
import Loader from './ui/components/loader';

export default function Page() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent || '';
    setIsMobile(isMobileUserAgent(userAgent));
  }, []);

  if (isMobile === null) {
    return <Loader />;
  }

  return (
    <MobileProvider isMobile={isMobile}>
      <ModuleProvider>
        <Suspense fallback={<Loader />}>
          <MainPageClient />
        </Suspense>
      </ModuleProvider>
    </MobileProvider>
  );
}