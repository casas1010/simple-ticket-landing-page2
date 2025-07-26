'use client';

import { useSearchParams } from 'next/navigation';

import { useState } from 'react';
import { Module } from './core/types/module';
import { PLATFORM_FEATURES } from './core/data/features';
import { MODULES } from './core/data/modules';
import StarBackground from './ui/components/backgrounds/star';
import Header from './ui/components/header/header';
import { ModuleFeatures } from './ui/components/lists/modules';
import ModulesOrbit from './ui/components/modules_orbit/modules_orbit';
import PlatformFeatures from './ui/components/platform_features';
import TitleAndIcon from './ui/components/title_and_icon';
import ContactUs from './ui/components/contact_us';
import RawPage from './ui/pages/raw';
import ModulePage from './ui/pages/module';

// export default function MainPageClient() {
//   const searchParams = useSearchParams();
//   const mode = searchParams.get('mode');

// if (mode != null) {
//   return <ModulePage mode={mode} />;
// }

// return <RawPage></RawPage>
// }



export default function MainPageClient() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const [module, setModule] = useState<Module | null>(null);

  const mainText = module?.main_description ?? 'Discover the ideal data management system for your';
  const highlight = module?.main_description_highlight ?? 'organization';
  const subText = module?.sub_description ?? '';

  const getTitle = () => (module ? `Simple ${module.title}` : 'Simple Ticket');
  const getUi = () => (mode != null ? <ModulePage mode={mode} /> : <RawPage setModule={setModule} module={mode} />);

  return (
    <div className="bg-[#35495f] relative w-full overflow-hidden">
      <StarBackground starColor={module?.gradient} />
      <Header title={getTitle()} />

      {getUi()}
      <div className="h-50">

      </div>
    </div>
  );
}