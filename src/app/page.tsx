import { Suspense } from 'react';
import MainPageClient from './MainPageClient';

import { headers } from 'next/headers';
import { MobileProvider } from './core/context/mobile_context';
import { isMobileUserAgent } from './core/context_utils/is_mobile';
import Loader from './ui/components/loader';

export default async function Page() {
  const headerList = headers();
  const userAgent = (await headerList).get('user-agent') || '';
  const isMobile = isMobileUserAgent(userAgent);

  return (
    <MobileProvider isMobile={isMobile}>
      <Suspense fallback={<Loader />}>
        <MainPageClient />
      </Suspense>
    </MobileProvider>
  );
}


