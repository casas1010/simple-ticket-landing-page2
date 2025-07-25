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
  return (
    <div className="min-h-screen py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">{title}</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">{description}</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};