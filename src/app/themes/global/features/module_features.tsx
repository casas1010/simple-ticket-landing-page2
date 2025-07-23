import React from 'react';
import classNames from "classnames";

// === Configurable Variables ===
const CARD_WIDTH = 400;
const CARD_HEIGHT = 200;
const TITLE_BAR_HEIGHT = 40;
const SLIDE_PANEL_HEIGHT = CARD_HEIGHT - TITLE_BAR_HEIGHT;

// === FeatureCard Component ===
const FeatureCard = ({
  feature,
}: {
  feature: {
    icon: string;
    title: string;
    description: string;
    features?: { icon: string; description: string }[];
  };
}) => {
  return (
    <div
      className={classNames(
        "relative bg-slate-800 rounded-2xl shadow-lg text-white overflow-hidden group",
        "w-full sm:w-[400px] mx-auto",
        "h-[200px]"
      )}
    >
      {/* Title Bar */}
      <div className="flex items-center space-x-4 p-4" style={{ height: TITLE_BAR_HEIGHT }}>
        <div className="text-2xl">{feature.icon}</div>
        <h3 className="text-md font-semibold truncate">{feature.title}</h3>
      </div>

      {/* Description */}
      <div className="px-4 text-slate-300 text-sm">
        {feature.description}
      </div>

      {/* Sliding Panel */}
      {feature.features && feature.features.length > 0 && (
        <div
          className={classNames(
            "absolute bottom-0 left-0 w-full bg-slate-900 transition-transform duration-500 ease-in-out group-hover:translate-y-[-160px]"
          )}
          style={{
            height: SLIDE_PANEL_HEIGHT,
            transform: `translateY(${SLIDE_PANEL_HEIGHT}px)`,
          }}
        >
          <div className="p-4 overflow-y-auto h-full space-y-2">
            {feature.features.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <div className="text-base">{item.icon}</div>
                <p className="text-xs text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// === ModuleFeatures Component ===
export const ModuleFeatures = ({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: {
    icon: string;
    title: string;
    description: string;
    features?: { icon: string; description: string }[];
  }[];
}) => {
  return (
    <div className="min-h-screen py-16 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">{title}</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">{description}</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};