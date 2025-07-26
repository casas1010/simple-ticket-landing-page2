// === Website FeatureCard Component (Desktop) ===
import React from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/app/core/context/mobile_context';

// === Configurable Variables ===
const CARD_HEIGHT = 240;
const TITLE_BAR_HEIGHT = 60;
const ANIMATION_SIZE = 48;
const TITLE_FONT_SIZE = 'text-xl';
const SLIDE_PANEL_HEIGHT = CARD_HEIGHT - TITLE_BAR_HEIGHT;

// === SSR-safe dynamic import for Lottie Player ===
const LottiePlayer = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
  { ssr: false }
);

// === Website FeatureCard Component ===
const FeatureCardWebsite = ({
  feature,
}: {
  feature: {
    icon: React.ElementType;
    title: string;
    animationPath?: string;
    main_description?: string;
    description?: string;
    details?: { icon: React.ElementType; description: string }[];
  };
}) => {
  const Icon = feature.icon;

  return (
    <div
      className={classNames(
        'relative bg-slate-800 rounded-2xl shadow-lg text-white overflow-hidden group',
        'w-full sm:w-[400px] mx-auto'
      )}
      style={{ height: CARD_HEIGHT }}
    >
      {/* Title Bar */}
      <div
        className="flex items-center space-x-4 p-4"
        style={{ height: TITLE_BAR_HEIGHT }}
      >
        <div
          className="flex items-center justify-center"
          style={{ width: ANIMATION_SIZE, height: ANIMATION_SIZE }}
        >
          {feature.animationPath ? (
            <LottiePlayer
              autoplay
              loop
              src={feature.animationPath}
              style={{ height: ANIMATION_SIZE, width: ANIMATION_SIZE }}
            />
          ) : (
            <Icon size={ANIMATION_SIZE} />
          )}
        </div>
        <h3 className={`${TITLE_FONT_SIZE} font-semibold truncate`}>
          {feature.title}
        </h3>
      </div>
      
      {/* Description */}
      <div className="px-4 text-slate-300 text-sm">
        {feature.main_description || feature.description}
      </div>
      
      {/* Sliding Panel */}
      {feature.details && feature.details.length > 0 && (
        <div
          className={classNames(
            'absolute bottom-0 left-0 w-full bg-slate-900 transition-transform duration-500 ease-in-out group-hover:translate-y-[-180px]'
          )}
          style={{
            height: SLIDE_PANEL_HEIGHT,
            transform: `translateY(${SLIDE_PANEL_HEIGHT}px)`,
          }}
        >
          <div className="p-4 overflow-y-auto h-full space-y-2">
            {feature.details.map((item, idx) => {
              const DetailIcon = item.icon;
              return (
                <div key={idx} className="flex items-start space-x-2">
                  <div className="text-base">
                    <DetailIcon size={16} />
                  </div>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// === Mobile FeatureCard Component ===
const FeatureCardMobile = ({
  feature,
}: {
  feature: {
    icon: React.ElementType;
    title: string;
    animationPath?: string;
    main_description?: string;
    description?: string;
    details?: { icon: React.ElementType; description: string }[];
  };
}) => {
  const Icon = feature.icon;

  return (
    <div
      className={classNames(
        'relative bg-slate-800 rounded-2xl shadow-lg text-white overflow-hidden',
        'w-full sm:w-[400px] mx-auto'
      )}
      style={{ height: CARD_HEIGHT }}
    >
      {/* Title Bar */}
      <div
        className="flex items-center space-x-4 p-4"
        style={{ height: TITLE_BAR_HEIGHT }}
      >
        <div
          className="flex items-center justify-center"
          style={{ width: ANIMATION_SIZE, height: ANIMATION_SIZE }}
        >
          {feature.animationPath ? (
            <LottiePlayer
              autoplay
              loop
              src={feature.animationPath}
              style={{ height: ANIMATION_SIZE, width: ANIMATION_SIZE }}
            />
          ) : (
            <Icon size={ANIMATION_SIZE} />
          )}
        </div>
        <h3 className={`${TITLE_FONT_SIZE} font-semibold truncate`}>
          {feature.title}
        </h3>
      </div>
      
      {/* Description */}
      <div className="px-4 text-slate-300 text-sm">
        {feature.main_description || feature.description}
      </div>
      
      {/* Always Visible Panel - Mobile */}
      {feature.details && feature.details.length > 0 && (
        <div
          className="absolute bottom-0 left-0 w-full bg-slate-900"
          style={{
            height: SLIDE_PANEL_HEIGHT,
            transform: 'translateY(0px)',
          }}
        >
          <div className="p-4 overflow-y-auto h-full space-y-2">
            {feature.details.map((item, idx) => {
              const DetailIcon = item.icon;
              return (
                <div key={idx} className="flex items-start space-x-2">
                  <div className="text-base">
                    <DetailIcon size={16} />
                  </div>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};


// === Main FeatureCard Component with Switch ===
const FeatureCard = ({
  feature,
}: {
  feature: {
    icon: React.ElementType;
    title: string;
    animationPath?: string;
    main_description?: string;
    description?: string;
    details?: { icon: React.ElementType; description: string }[];
  };
}) => {
  const isMobile = useIsMobile();

  switch (isMobile) {
    case true:
      return <FeatureCardMobile feature={feature} />;
    case false:
      return <FeatureCardWebsite feature={feature} />;
    default:
      return <FeatureCardWebsite feature={feature} />;
  }
};

export default FeatureCard;
export { FeatureCardWebsite, FeatureCardMobile };