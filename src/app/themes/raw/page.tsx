import React, { useState } from 'react';
import Header from '@/app/ui/header/header';
import StarBackground from '@/app/ui/star_background';
import PlatformFeatures from '@/app/ui/platform_features';
import { ModuleFeatures } from '@/app/ui/lists/modules';
import { FEATURES } from '@/app/data/features';
import { Module } from '@/app/types/module';
import MainContentSection from './init';
import { useIsMobile } from '@/app/context/mobile_context';






export default function DesktopView() {
  const [module, setModule] = useState<Module | null>(null);

  const mainText = module?.main_description ?? 'Discover the ideal data management system for your';
  const highlight = module?.main_description_highlight ?? 'organization';
  const subText = module?.sub_description ?? '';

  const getTitle = () => (module ? `Simple ${module.title}` : 'Simple Ticket');

  return (
    <div className="bg-[#35495f] relative w-full overflow-hidden">
      <StarBackground starColor={module?.gradient} />
      <Header title={getTitle()} />

      <MainContentSection
        mainText={mainText}
        highlight={highlight}
        subText={subText}
        setModule={setModule}
      />

      <PlatformFeatures sub_title="" />
      <ModuleFeatures
        title="Built for simplicity"
        description="Designed with user experience at the core, our platform simplifies complex workflows with intuitive automation, real-time insights, and smart controls—empowering you to focus on what matters most."
        features={FEATURES}
      />
    </div>
  );
}