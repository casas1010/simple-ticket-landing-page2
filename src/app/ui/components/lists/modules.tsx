'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import ModuleCard from '../cards/module';
import { useModule } from '@/app/core/context/module';
import { Module } from '../../../core/types/module';
import { MODULES } from '@/app/core/data/modules';

export const ModulesList = ({
  title,
  description,
  features,
  open_page
}: {
  title: string;
  description: string;
  open_page?: boolean;
  features: {
    icon: React.ElementType;
    title: string;
    main_description?: string;
    description?: string;
    details?: { icon: React.ElementType; description: string }[];
    mode?: string;
  }[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobile, setIsMobile] = useState(false);
  const { module, setModule } = useModule();


  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleCardClick = (feature: typeof features[number]) => {
    if (open_page && feature.mode) {
      var modules = MODULES.filter((r) => r.title == feature.title);


      // // Scroll to top first
      window.scrollTo({ top: 0, behavior: 'smooth' });


      // // Delay setting the mode slightly to allow scroll animation to start
      setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('mode', feature.mode!);
        router.push(`${pathname}?${params.toString()}`);
      }, 200);

      setTimeout(() => {
        setModule(modules[0]);
      }, 600);

    }
  };

  // On mobile, just render all items in a single column
  if (isMobile) {
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 relative z-20">
            <h1 className="text-5xl font-bold text-white mb-6">{title}</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">{description}</p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(feature)}
                className={`w-full ${open_page ? 'cursor-pointer' : ''}`}
              >
                <ModuleCard feature={feature} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout with the centering logic for last row
  const fullRows = Math.floor(features.length / 3) * 3;
  const rowsExceptLast = features.slice(0, fullRows);
  const lastRow = features.slice(fullRows);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative z-20">
          <h1 className="text-5xl font-bold text-white mb-6">{title}</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rowsExceptLast.map((feature, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(feature)}
              className={`w-full ${open_page ? 'cursor-pointer' : ''}`}
            >
              <ModuleCard feature={feature} />
            </div>
          ))}

          {lastRow.length > 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center gap-8">
              {lastRow.map((feature, index) => (
                <div
                  key={fullRows + index}
                  onClick={() => handleCardClick(feature)}
                  className={`w-full max-w-sm ${open_page ? 'cursor-pointer' : ''}`}
                >
                  <ModuleCard feature={feature} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};