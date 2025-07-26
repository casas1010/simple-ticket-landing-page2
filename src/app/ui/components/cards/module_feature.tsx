// === Website FeatureCard Component (Refactored) ===
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

// === Single FeatureCard Component ===
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
  const Icon = feature.icon;
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset animation when card leaves viewport
          setIsVisible(false);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of card is visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={classNames(
        'relative bg-slate-800 rounded-2xl shadow-lg text-white overflow-hidden',
        'w-full sm:w-[400px] mx-auto',
        // Only add group and hover effect on desktop
        !isMobile && 'group',
        // Card entrance animation
        'transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[50px] opacity-0'
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
      
      {/* Sliding/Static Panel */}
      {feature.details && feature.details.length > 0 && (
        <div
          className={classNames(
            'absolute bottom-0 left-0 w-full bg-slate-900',
            // Conditional sliding behavior for desktop hover
            isMobile 
              ? '' // No hover transition for mobile
              : 'transition-transform duration-500 ease-in-out group-hover:translate-y-[-180px]'
          )}
          style={{
            height: SLIDE_PANEL_HEIGHT,
            // Mobile: always visible (translateY(0)), Desktop: hidden by default
            transform: isMobile ? 'translateY(0px)' : `translateY(${SLIDE_PANEL_HEIGHT}px)`,
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

export default FeatureCard;