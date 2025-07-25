import React from 'react';
import FeatureCard from '../cards/module_feature';

export const ModuleFeatures = ({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: {
    icon: React.ElementType;
    title: string;
    main_description?: string;
    description?: string;
    details?: { icon: React.ElementType; description: string }[];
  }[];
}) => {
  // Calculate how many items are in the last row
  const getLastRowItemCount = () => {
    const cols = {
      base: 1,
      md: 2,
      lg: 3
    };
    
    // For lg screens (3 columns)
    const lgRemainder = features.length % cols.lg;
    const lgLastRowCount = lgRemainder === 0 ? cols.lg : lgRemainder;
    
    // For md screens (2 columns)
    const mdRemainder = features.length % cols.md;
    const mdLastRowCount = mdRemainder === 0 ? cols.md : mdRemainder;
    
    return { lgLastRowCount, mdLastRowCount };
  };

  const { lgLastRowCount, mdLastRowCount } = getLastRowItemCount();

  // Determine grid column span classes for centering
  const getGridColSpan = () => {
    if (lgLastRowCount === 1) {
      return 'lg:[&>*:nth-last-child(-n+1)]:col-start-2'; // Center single item in 3-col grid
    } else if (lgLastRowCount === 2) {
      return 'lg:[&>*:nth-last-child(-n+2)]:col-start-1'; // Start from first column for 2 items
    }
    
    if (mdLastRowCount === 1) {
      return 'md:[&>*:nth-last-child(-n+1)]:col-start-1 lg:[&>*:nth-last-child(-n+1)]:col-start-2'; // Center single item in 2-col grid for md, center in 3-col for lg
    }
    
    return '';
  };

  return (
    <div className="min-h-screen py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">{title}</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">{description}</p>
        </div>
        {/* Feature Cards Grid */}
        <div className="flex justify-center">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center ${getGridColSpan()}`}>
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};