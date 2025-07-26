'use client';

import { useSearchParams } from 'next/navigation';
import ModulePage from './themes/property_management/page';
import RestaurantPage from './themes/restaurant/page';
import RawPage from './themes/raw/page';

export default function MainPageClient() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  if (mode != null) {
    return <ModulePage mode={mode} />;
  }

  return <RawPage></RawPage>
}

