'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Home, Play } from 'lucide-react';
import PropertyManagementPage from './themes/property_management/page';

export default function MainPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  if (mode !== 'property_management') {
    return <PropertyManagementPage />;
  }

  return <div>No mode</div>;
}