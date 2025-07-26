'use client';

// File: PropertyManagementPage.tsx

import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import Header from '@/app/components/header/header';

import { ModuleFeatures } from '@/app/components/lists/modules';
import GradientBackground from '@/app/components/backgrounds/gradient';
import { MODULES } from '@/app/core/data/modules';
import TitleAndIcon from '@/app/components/title_and_icon';

interface ModulePageProps {
  mode: string;
}

export default function ModulePage({ mode }: ModulePageProps) {
  const module = MODULES.find((r) => r.mode === mode);
  const [animationData, setAnimationData] = useState(null);
  const moduleFeaturesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (module?.animationPath) {
      fetch(module.animationPath)
        .then((res) => res.json())
        .then(setAnimationData)
        .catch((err) => console.error('Failed to load animation:', err));
    }
  }, [module]);

  useEffect(() => {
    // Scroll to ModuleFeatures after initial render
    if (moduleFeaturesRef.current) {
      moduleFeaturesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (module == null) {
    return <text>AAA</text>
  }




  return (
    <GradientBackground>
      <Header title={"Simple " + module.title} />

      <TitleAndIcon
        mainText={module?.main_description || ''}
        highlight={module?.main_description_highlight || ''}
        subText={module?.sub_description || ''}
        setModule={() => { }}
        component={
          <div className="flex justify-center items-center w-full h-full min-h-[400px]">
            {animationData && (
              <div className="flex justify-center items-center">
                <Lottie
                  animationData={animationData}
                  loop
                  autoplay
                  style={{ width: 300, height: 300 }}
                />
              </div>
            )}
          </div>
        }
      />

      <div ref={moduleFeaturesRef}>
        <ModuleFeatures
          title={module?.title}
          description={module?.main_description}
          features={module.features}
        />
      </div>

      <div className="text-center mt-16">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
          Get Started Today
        </button>
      </div>



    </GradientBackground>
  );


}