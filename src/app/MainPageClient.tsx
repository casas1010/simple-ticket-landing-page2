'use client';

import { useSearchParams } from 'next/navigation';
import PropertyManagementPage from './themes/property_management/page';
import RestaurantPage from './themes/restaurant/page';
import Page from './themes/raw/page';

export default function MainPageClient() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  if (mode === 'property_management') {
    return <PropertyManagementPage />;
  }

  else if (mode === 'restaurant') {
    return <RestaurantPage />;
  }

  return <Page></Page>
}