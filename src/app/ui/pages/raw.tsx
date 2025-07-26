import React, { useState } from 'react';

import { useIsMobile } from '@/app/core/context/mobile_context';


import { PLATFORM_FEATURES } from '@/app/core/data/features';
import { MODULES } from '@/app/core/data/modules';
import { Module } from '@/app/core/types/module';
import StarBackground from '../components/backgrounds/star';
import Header from '../components/header/header';
import TitleAndIcon from '../components/title_and_icon';
import ModulesOrbit from '../components/modules_orbit/modules_orbit';
import { ModuleFeatures } from '../components/lists/modules';
import PlatformFeatures from '../components/platform_features';
import ContactUs from '../components/contact_us';

export default function RawPage() {
  const [module, setModule] = useState<Module | null>(null);

  const mainText = module?.main_description ?? 'Discover the ideal data management system for your';
  const highlight = module?.main_description_highlight ?? 'organization';
  const subText = module?.sub_description ?? '';

  const getTitle = () => (module ? `Simple ${module.title}` : 'Simple Ticket');

  return (
    <div className="bg-[#35495f] relative w-full overflow-hidden">
      <StarBackground starColor={module?.gradient} />
      <Header title={getTitle()} />

      <TitleAndIcon
        mainText={mainText}
        highlight={highlight}
        subText={subText}
        setModule={setModule}
        component={<ModulesOrbit setModule={setModule} />} // <-- ADDED
      />

      <ModuleFeatures
        title="Modules"
        description="Start from one of our pre build modules or create your own"
        features={MODULES}
        open_page={true}
      />

      <PlatformFeatures sub_title="" />
      <ModuleFeatures
        title="Built for simplicity"
        description="Designed with user experience at the core, our platform simplifies complex workflows with intuitive automation, real-time insights, and smart controls—empowering you to focus on what matters most."
        features={PLATFORM_FEATURES}
      />

      <ContactUs />
      <div className="h-50">

      </div>
    </div>
  );
}