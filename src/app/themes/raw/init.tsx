import React, { useEffect, useState } from 'react';
import Header from '@/app/components/header/header';
import ModulesOrbit from '../../components/modules_orbit/modules_orbit';
import StarBackground from '@/app/components/star_background';
import { motion, AnimatePresence, m } from 'framer-motion';
import PlatformFeatures from '@/app/components/platform_features';
import { Module } from '@/app/types/module';
import { ModuleFeatures } from '@/app/components/lists/modules';
import { FEATURES } from '@/app/data/features';

export default function Init() {
  return <DesktopView />;
}

function DesktopView() {
  const [module, setModule] = useState<Module | null>(null);

  const mainText = module?.main_description ?? 'Discover the ideal data management system for your';
  const highlight = module?.main_description_highlight ?? 'organization';
  const subText = module?.sub_description ?? '';

  function getTitle() {
    if (module == null) {
      return "Simple Ticket"
    }

    return "Simple " + module.title
  }

  return (
    <div className="bg-[#35495f] relative w-full overflow-hidden">
      <StarBackground starColor={module?.gradient} />
      <Header title={getTitle()} />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start px-8 pt-10 text-left max-w-7xl mx-auto gap-10">
        <div className="relative z-10 flex-1 max-w-2xl pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${mainText}-${highlight}-${subText}`}
              initial={{ rotateY: 15, rotateX: 5, opacity: 0, transformPerspective: 1000 }}
              animate={{ rotateY: 0, rotateX: 0, opacity: 1, transformPerspective: 1000 }}
              exit={{ rotateY: -10, rotateX: -3, opacity: 0, transformPerspective: 1000 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {mainText}
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {highlight}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
                {subText}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 flex-1 w-full max-w-xl">
          <ModulesOrbit setModule={setModule} />
        </div>
      </div>

      <PlatformFeatures sub_title='' />
   <ModuleFeatures
  title="Built for simplicity"
  description="Designed with user experience at the core, our platform simplifies complex workflows with intuitive automation, real-time insights, and smart controls—empowering you to focus on what matters most."
  features={FEATURES}
/>
    </div>
  );
}