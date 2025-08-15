'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useModule } from '@/app/core/context/module';
import { FeatureCard } from '../cards/feature';

export const FeaturesList = ({
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
    main_description_highlight?: string;
    sub_description?: string;
    details?: { icon: React.ElementType; description: string; iconColor?: string; iconBg?: string }[];
    mode?: string;
    gradient?: string;
    color?: string;
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
    // You can navigate or do something with the clicked feature here
    if (open_page) {
      router.push(`${pathname}?feature=${encodeURIComponent(feature.title)}`);
    }
  };

  // Shared list rendering (mobile & desktop)
  const renderList = () => (
    <div className="flex flex-col gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          onClick={() => handleCardClick(feature)}
          className={`w-full ${open_page ? 'cursor-pointer' : ''}`}
        >
          <FeatureCard feature={feature} isFlipped={index%2==0} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative z-20">
          <h1 className="text-5xl font-bold text-white mb-6">{title}</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">{description}</p>
        </div>

        {renderList()}
      </div>
    </div>
  );
};