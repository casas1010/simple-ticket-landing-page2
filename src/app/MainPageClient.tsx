'use client';

import { useSearchParams } from 'next/navigation';
import RawPage from './ui/pages/raw';
import ModulePage from './ui/pages/module';

export default function MainPageClient() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  if (mode != null) {
    return <ModulePage mode={mode} />;
  }

  return <RawPage></RawPage>
}

