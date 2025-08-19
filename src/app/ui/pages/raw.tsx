'use client';

import React, { useState, useEffect } from 'react';

import { useModule } from '@/app/core/context/module';

import { PLATFORM_FEATURES } from '@/app/core/data/features';
import { MODULES } from '@/app/core/data/modules';
import TitleAndIcon from '../components/title_and_icon';
import ModulesOrbit from '../components/modules_orbit/modules_orbit';
import { ModulesList } from '../components/lists/modules';
import ContactUs from '../components/contact_us';
import { FeaturesList } from '../components/lists/features';
import { useIsMobile } from '@/app/core/context/mobile_context';

export default function RawPage() {
  const { module } = useModule();
  const isMobile = useIsMobile();
  const mainText =
    module?.main_description ?? 'Discover the ideal data management system for your';
  const highlight = module?.main_description_highlight ?? 'organization';
  const subText = module?.sub_description ?? '';


  return (
    <div className="z-1">

      <TitleAndIcon
        mainText={mainText}
        highlight={highlight}
        subText={subText}
        component={<ModulesOrbit />}
      />

      {isMobile ?
        <ModulesList
          title="Modules"
          description="Start from one of our pre build modules or create your own"
          features={MODULES}
          open_page={true}
        /> : <></>}

      <FeaturesList
        title="Built for simplicity"
        description="Designed with user experience at the core, our platform simplifies complex workflows with intuitive automation, real-time insights, and smart controls—empowering you to focus on what matters most."
        features={PLATFORM_FEATURES}
      />

      <div className="relative z-10">
        <ContactUs text="Get started" />
      </div>
      <div className="h-50" />
    </div>
  );
}