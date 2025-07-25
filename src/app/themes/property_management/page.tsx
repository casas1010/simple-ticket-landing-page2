// File: PropertyManagementPage.tsx

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import Header from '@/app/ui/header/header';
import MainContentSection from '../raw/init';
import { PropertyManagementSuite } from './features';
import { ModuleFeatures } from '@/app/ui/lists/modules';
import { PROPERTY_MANAGEMENT_FEATURES } from '@/app/data/property_management_features';
import { MODULES } from '@/app/data/modules';
import GradientBackground from '@/app/ui/backgrounds/gradient';

export default function PropertyManagementPage() {
  const module = MODULES.find((r) => r.mode === 'property_management');
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    if (module?.animationPath) {
      fetch(module.animationPath)
        .then((res) => res.json())
        .then(setAnimationData)
        .catch((err) => console.error('Failed to load animation:', err));
    }
  }, [module]);

  return (
    <GradientBackground>
      <Header title="Simple Property" />

      <MainContentSection
        mainText={module?.main_description || ''}
        highlight={module?.main_description_highlight || ''}
        subText={module?.sub_description || ''}
        setModule={() => { }}
        component={
          <div className="flex justify-center items-start w-full">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop
                autoplay
                style={{ width: 300, height: 300 }}
              />
            )}
          </div>
        }
      />

      <ModuleFeatures
        title="Built for simplicity"
        description="Designed with user experience at the core, our platform simplifies complex workflows with intuitive automation, real-time insights, and smart controls—empowering you to focus on what matters most."
        features={PROPERTY_MANAGEMENT_FEATURES}
      />
    </GradientBackground>
  );
}