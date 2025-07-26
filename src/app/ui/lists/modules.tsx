'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import FeatureCard from '../cards/module_feature';

export const ModuleFeatures = ({
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
    mode?: string; // mode used for query param
  }[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCardClick = (feature: typeof features[number]) => {
    if (open_page && feature.mode) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('mode', feature.mode);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const getLastRowItemCount = () => {
    const cols = { base: 1, md: 2, lg: 3 };
    const lgLastRowCount = features.length % cols.lg || cols.lg;
    const mdLastRowCount = features.length % cols.md || cols.md;
    return { lgLastRowCount, mdLastRowCount };
  };

  const { lgLastRowCount, mdLastRowCount } = getLastRowItemCount();

  const getGridColSpan = () => {
    if (lgLastRowCount === 1) {
      return 'lg:[&>*:nth-last-child(-n+1)]:col-start-2';
    } else if (lgLastRowCount === 2) {
      return 'lg:[&>*:nth-last-child(-n+2)]:col-start-1';
    }

    if (mdLastRowCount === 1) {
      return 'md:[&>*:nth-last-child(-n+1)]:col-start-1 lg:[&>*:nth-last-child(-n+1)]:col-start-2';
    }

    return '';
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">{title}</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">{description}</p>
        </div>

        <div className="flex justify-center">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center ${getGridColSpan()}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(feature)}
                className={open_page ? 'cursor-pointer w-full' : 'w-full'}
              >
                <FeatureCard feature={feature} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};