import { Suspense } from 'react';
import MainPageClient from './MainPageClient';

import { headers } from 'next/headers'; 
import { MobileProvider } from './context/mobile_context';
import { isMobileUserAgent } from './utils/is_mobile';

export default async function Page() {
  const headerList = headers(); 
  const userAgent = (await headerList).get('user-agent') || '';
  const isMobile = isMobileUserAgent(userAgent);

  return (
    <MobileProvider isMobile={isMobile}>
      <Suspense fallback={<div>Loading...</div>}>
        <MainPageClient />
      </Suspense>
    </MobileProvider>
  );
}