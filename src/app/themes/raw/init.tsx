// Updated GetStarted component (code1)
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Shield,
  Droplets,
  CheckCircle,
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
  const isMobile = useIsMobile();
  return <DesktopView />;
}

// ------------------ Desktop Layout ------------------


function DesktopView() {
  const [module, setModule] = useState<any>({});
  return (
    <div className={`${module?.color || ''} w-full`}>

       <Header title='Simple Ticket!' />
      <div
        className={`relative flex flex-col md:flex-row items-center md:items-start px-8 pt-10 text-left max-w-7xl mx-auto gap-10`}
      >
        {/* Left: Hero Content */}
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
        {/* Right: Orbit Component */}
        <div className="relative z-10 flex-1 w-full max-w-xl">
          <ModulesOrbit setModule={setModule} />
        </div>
      </div>
    </div>
  );
}

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

type Feature = {
  id: number;
  icon: React.ElementType;
  label: string;
  color: string;
};

// Map MODULES to Feature format
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
  setModule: (module: any) => void;
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

  // Get modules as features
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

  // Handle scroll detection and determine active module
  useEffect(() => {
    let ticking = false; // For scroll performance (throttling)

    const handleScroll = () => {
      // Use requestAnimationFrame to throttle scroll handler calls
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const threshold = 100; // Adjust this value as needed
          const hasScrolledEnough = scrollY > threshold;

          // Only update if state changes
          if (hasScrolledEnough !== scrollThresholdPassed) {
            setScrollThresholdPassed(hasScrolledEnough);
            console.log(`🖱️ ScrollY: ${scrollY}, Threshold Passed: ${hasScrolledEnough}`);
          }

          // If scrolled past threshold, determine active module
          if (hasScrolledEnough) {
            // Example logic: Cycle every 150px of scroll beyond threshold
            // You can adjust this calculation for sensitivity/speed
            const scrollDelta = scrollY - threshold;
            const moduleIndex = Math.floor(scrollDelta / 150) % modulesAsFeatures.length; // Adjust 150 for sensitivity
            const calculatedModule = modulesAsFeatures[moduleIndex];

            // Update states only if the module actually changes
            if (activeFeature?.id !== calculatedModule.id) {
              console.log(`🎯 Scrolled to module index: ${moduleIndex}`, calculatedModule.label);
              setActiveFeature(calculatedModule);
              setModule(calculatedModule); // Update parent state
              setIsPaused(true); // Pause rotation when interacting via scroll
            }
          } else {
            // If scrolled back above threshold, reset
            if (activeFeature !== null) {
              console.log('🖱️ Resetting module due to scroll above threshold');
              setActiveFeature(null);
              setModule({}); // Clear parent state
              setIsPaused(false); // Resume rotation
            }
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    console.log('📋 Setting up scroll listener for direct control');
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Consider removing document scroll listener if window covers your needs
    // document.addEventListener('scroll', handleScroll, { passive: true });

    const handleWheel = (e: any) => {
      // Wheel event is high frequency, rely on throttled scroll handler
      // console.log('🎡 Wheel event detected!', e.deltaY); // Can be noisy
      // handleScroll can be called here too if needed for extra sensitivity,
      // but rAF in scroll handler should suffice.
      // For now, just let scroll event handle it.
    };
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      console.log('🧹 Cleaning up scroll listeners');
      window.removeEventListener('scroll', handleScroll);
      // window.removeEventListener('scroll', handleScroll); // Remove if line above is uncommented
      window.removeEventListener('wheel', handleWheel);
      // No need to clear timeouts/intervals for cycling as they are removed
    };
    // Include dependencies that affect the calculation or are used inside the handler
    // scrollThresholdPassed and activeFeature are managed inside, but including
    // them can sometimes cause issues if not handled carefully in the rAF logic.
    // Let's include setModule, setIsPaused for clarity they are used inside.
  }, [setModule, setIsPaused, activeFeature, modulesAsFeatures]); // Added modulesAsFeatures dependency

  // Main rotation animation
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
  }, [isPaused, ROTATION_SPEED]);

  const handleModuleHover = (feature: Feature | null) => {
    console.log('🖱️ Hover event:', feature?.label || 'null');
    // Allow hover to override scroll selection
    setActiveFeature(feature);
    setIsPaused(feature !== null); // Pause on hover, resume if null and no scroll
    setModule(feature ?? {}); // Update parent state
    // Note: Scrolling will re-take control once it passes the threshold again
    // unless you add logic to detect if the user is actively hovering.
    // For simplicity, hover takes precedence until scroll changes.
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
        {/* Central Animation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <img
            src="https://i.imgur.com/OEMWwAS.png"
            alt="Static house"
            style={{ height: HOUSE_SIZE, width: HOUSE_SIZE }}
          />
        </div>
        {/* Orbiting Modules */}
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
              // const isScrollActive = isScrollCycling && scrollActiveIndex === index; // Removed

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
                    className={`w-16 h-16 ${feature.color} rounded-full shadow-lg flex items-center justify-center cursor-pointer transform transition-all duration-300 ${isActive ? 'scale-110' : 'hover:scale-110' // Simplified class logic
                      } animate-float z-20`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                    onMouseEnter={() => handleModuleHover(feature)}
                    onMouseLeave={() => handleModuleHover(null)}
                  >
                    <Icon className="w-8 h-8 text-white" />
                    {isActive && ( // Simplified tooltip logic
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                        {feature.label}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        {/* Optional: Scroll indicator showing current module */}
        {scrollThresholdPassed && activeFeature && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-full text-xs z-30">
            Scrolled to: {activeFeature.label}
          </div>
        )}
        {/* Debug button - remove this after testing */}
        {/* Example update for debug button:
         <button
           onClick={() => {
             console.log('🔘 Manual scroll threshold toggle clicked');
             const newThresholdState = !scrollThresholdPassed;
             setScrollThresholdPassed(newThresholdState);
             if (!newThresholdState) {
               // If turning off, also reset module
               setActiveFeature(null);
               setModule({});
               setIsPaused(false);
             } else {
               // If turning on, maybe select first module or let scroll determine it
               // For immediate test, select first module
                const firstModule = modules[0];
                setActiveFeature(firstModule);
                setModule(firstModule);
                setIsPaused(true);
             }
           }}
           className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded text-xs z-30"
         >
           {scrollThresholdPassed ? 'Simulate Scroll Up' : 'Simulate Scroll Down'}
         </button>
        */}
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