import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Shield,
  Droplets,
  FileText,
  Settings,
  Users,
  Lock,
  Zap,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/app/context/mobile_context';
import { MODULES } from '@/app/data/modules_data';
import Header from '@/app/components/header';

export default function GetStarted() {
  return <DesktopView />;
}

// ------------------ Desktop Layout ------------------

function DesktopView() {
  const [module, setModule] = useState<Feature | null>(null);

  return (
    <div className={`${module?.color || ''} w-full`}>
      <Header title="Simple Ticket!" />
      <div className="relative flex flex-col md:flex-row items-center md:items-start px-8 pt-10 text-left max-w-7xl mx-auto gap-10">
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

type Feature = {
  id: number;
  icon: React.ElementType;
  label: string;
  color: string;
};

const getModulesAsFeatures = (): Feature[] => {
  const iconMap: { [key: string]: React.ElementType } = {
    'Marketing': Zap,
    'Recruiting': FileText,
    'Customer Management': Users,
    'Sales Management': Droplets,
    'Financial Documentation': Lock,
    'Task Management': Shield,
    'Property Management': Settings,
  };

  const colorMap: { [key: string]: string } = {
    'Marketing': 'bg-purple-500',
    'Recruiting': 'bg-blue-400',
    'Customer Management': 'bg-yellow-500',
    'Sales Management': 'bg-cyan-500',
    'Financial Documentation': 'bg-gray-700',
    'Task Management': 'bg-red-500',
    'Property Management': 'bg-blue-500',
  };

  return MODULES.map((module, index) => ({
    id: index + 1,
    icon: iconMap[module.title] || Settings,
    label: module.title,
    color: colorMap[module.title] || 'bg-blue-500',
  }));
};

type Props = {
  setModule: (module: Feature | null) => void;
};

const ModulesOrbit: React.FC<Props> = ({ setModule }) => {
  const isMobile = useIsMobile();
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const [scrollThresholdPassed, setScrollThresholdPassed] = useState<boolean>(false);

  const modulesAsFeatures = useMemo(() => getModulesAsFeatures(), []);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  const HOUSE_SIZE = isMobile ? '50vw' : '100px';
  const CONTAINER_SIZE = isMobile ? '100vw' : '600px';
  const ROTATION_SPEED = 0.005;

  const radius = useMemo(() => {
    if (isMobile && screenWidth > 0) {
      return screenWidth * 0.35;
    }
    return 220;
  }, [isMobile, screenWidth]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const threshold = 100;
          const hasScrolledEnough = scrollY > threshold;

          if (hasScrolledEnough !== scrollThresholdPassed) {
            setScrollThresholdPassed(hasScrolledEnough);
          }

          if (hasScrolledEnough) {
            const scrollDelta = scrollY - threshold;
            const moduleIndex = Math.floor(scrollDelta / 150) % modulesAsFeatures.length;
            const calculatedModule = modulesAsFeatures[moduleIndex];

            if (activeFeature?.id !== calculatedModule.id) {
              setActiveFeature(calculatedModule);
              setModule(calculatedModule);
              setIsPaused(true);
            }
          } else {
            if (activeFeature !== null) {
              setActiveFeature(null);
              setModule(null);
              setIsPaused(false);
            }
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleWheel = (_e: WheelEvent) => {
      // Optionally implement
    };
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [setModule, setIsPaused, activeFeature, modulesAsFeatures, scrollThresholdPassed]);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!isPaused) {
        if (lastTimeRef.current !== 0) {
          const deltaTime = timestamp - lastTimeRef.current;
          setCurrentAngle((prev) => (prev + deltaTime * ROTATION_SPEED) % 360);
        }
        lastTimeRef.current = timestamp;
      } else {
        lastTimeRef.current = timestamp;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const handleModuleHover = (feature: Feature | null) => {
    setActiveFeature(feature);
    setIsPaused(!!feature);
    setModule(feature);
  };

  return (
    <div className="flex justify-center items-start w-full">
      <div
        className="relative"
        style={{
          width: CONTAINER_SIZE,
          height: CONTAINER_SIZE,
        }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <img
            src="https://i.imgur.com/OEMWwAS.png"
            alt="Static house"
            style={{ height: HOUSE_SIZE, width: HOUSE_SIZE }}
          />
        </div>

        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: `translate(-50%, -50%) rotate(${currentAngle}deg)`,
            transition: isPaused ? 'none' : 'transform 0.1s linear',
          }}
        >
          {radius > 0 &&
            modulesAsFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const angle = (index * 360) / modulesAsFeatures.length;
              const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
              const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
              const isActive = activeFeature?.id === feature.id;

              return (
                <div
                  key={feature.id}
                  className="absolute"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    marginLeft: '-32px',
                    marginTop: '-32px',
                    transform: `rotate(-${currentAngle}deg)`,
                  }}
                >
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-full shadow-lg flex items-center justify-center cursor-pointer transform transition-all duration-300 ${
                      isActive ? 'scale-110' : 'hover:scale-110'
                    } animate-float z-20`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                    onMouseEnter={() => handleModuleHover(feature)}
                    onMouseLeave={() => handleModuleHover(null)}
                  >
                    <Icon className="w-8 h-8 text-white" />
                    {isActive && (
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                        {feature.label}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {scrollThresholdPassed && activeFeature && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-full text-xs z-30">
            Scrolled to: {activeFeature.label}
          </div>
        )}

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }
          .animate-float {
            animation: float 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
};