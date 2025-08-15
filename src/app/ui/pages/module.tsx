'use client';

// File: PropertyManagementPage.tsx

import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';


import { MODULES } from '@/app/core/data/modules';
import TitleAndIcon from '../components/title_and_icon';
import { ModulesList } from '../components/lists/modules';
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
    // Scroll to ModuleFeatures after initial render with 1s delay
    const timeout = setTimeout(() => {
      if (moduleFeaturesRef.current) {
        moduleFeaturesRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000); // 1000 milliseconds = 1 second

    // Optional cleanup
    return () => clearTimeout(timeout);
  }, []);

  if (module_ == null) {
    return <text>AAA</text>
  }




  return (
    <>

      <TitleAndIcon
        videos={module_?.videos}
        mainText={module_?.main_description || ''}
        highlight={module_?.main_description_highlight || ''}
        subText={module_?.sub_description || ''}
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
        <ModulesList
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

      <ContactSection text="Get started" />



    </>
  );


}