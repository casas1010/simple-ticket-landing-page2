'use client';

// File: PropertyManagementPage.tsx

import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';


import { MODULES } from '@/app/core/data/modules';
import GradientBackground from '../components/backgrounds/gradient';
import Header from '../components/header/header';
import TitleAndIcon from '../components/title_and_icon';
import { ModuleFeatures } from '../components/lists/modules';
import ContactSection from '../components/contact_us';

interface ModulePageProps {
  mode: string;
}

export default function ModulePage({ mode }: ModulePageProps) {
  const module_ = MODULES.find((r) => r.mode === mode); // module is reserved word, so use module_
  const [animationData, setAnimationData] = useState(null);
  const moduleFeaturesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (module_?.animationPath) {
      fetch(module_.animationPath)
        .then((res) => res.json())
        .then(setAnimationData)
        .catch((err) => console.error('Failed to load animation:', err));
    }
  }, [module_]);

  useEffect(() => {
    // Scroll to ModuleFeatures after initial render
    if (moduleFeaturesRef.current) {
      moduleFeaturesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (module_ == null) {
    return <text>AAA</text>
  }




  return (
    <>
      {/* <Header title={"Simple " + module_.title} /> */}

      <TitleAndIcon
        mainText={module_?.main_description || ''}
        highlight={module_?.main_description_highlight || ''}
        subText={module_?.sub_description || ''}
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
          title={module_?.title}
          description={module_?.main_description}
          features={module_.features}
        />
      </div>

      {/* <div className="text-center mt-16">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
          Get Started Today
        </button>
      </div> */}

      <ContactSection />



    </>
  );


}