import React, { useEffect, useRef, useState } from 'react';
import { Module } from '@/app/data/modules_data';
import Header from '@/app/components/header';
import ModulesOrbit from '../../components/modules_orbit';
import StarBackground from '@/app/components/star_background';

export default function Init() {
  return <DesktopView />;
}



function DesktopView() {
  const [module, setModule] = useState<Module | null>(null);

  return (
    <div className={`${module?.color || 'bg-[#35495f]'} relative w-full overflow-hidden`}>
      <StarBackground />
      <Header title="Simple Ticket!" />
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start px-8 pt-10 text-left max-w-7xl mx-auto gap-10">
        <div className="relative z-10 flex-1 max-w-2xl pt-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover the ideal data management system for your
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              organization
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
            Build a complete property management CRM system...
          </p>
        </div>
        <div className="relative z-10 flex-1 w-full max-w-xl">
          <ModulesOrbit setModule={setModule} />
        </div>
      </div>
    </div>
  );
}


