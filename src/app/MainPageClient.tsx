'use client';

import { useSearchParams } from 'next/navigation';
import PropertyManagementPage from './themes/property_management/page';

export default function MainPageClient() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  if (mode === 'property_management') {
    return <PropertyManagementPage />;
  }

  return <div>No mode</div>;
}