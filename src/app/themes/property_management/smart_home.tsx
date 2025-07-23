import React, { useState, useEffect, useMemo } from 'react';
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

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
  { ssr: false }
);

const SmartHomeInterface: React.FC = () => {
  const isMobile = useIsMobile();
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Only run on client
    setScreenWidth(window.innerWidth);
  }, []);

  const HOUSE_SIZE = isMobile ? '50vw' : '400px';
  const CONTAINER_SIZE = isMobile ? '100vw' : '600px';

  const radius = useMemo(() => {
    if (isMobile && screenWidth > 0) {
      return screenWidth * 0.35;
    }
    return 220;
  }, [isMobile, screenWidth]);

  const [activeFeature, setActiveFeature] = useState<null | {
    id: number;
    icon: React.ElementType;
    label: string;
    color: string;
  }>(null);

  const features = [
    { id: 1, icon: Settings, label: 'System Control', color: 'bg-blue-500' },
    { id: 2, icon: CheckCircle, label: 'Status Check', color: 'bg-green-500' },
    { id: 3, icon: FileText, label: 'Reports', color: 'bg-blue-400' },
    { id: 4, icon: Droplets, label: 'Water Management', color: 'bg-cyan-500' },
    { id: 5, icon: Lock, label: 'Security', color: 'bg-gray-700' },
    { id: 6, icon: Zap, label: 'Energy', color: 'bg-yellow-500' },
    { id: 7, icon: Users, label: 'Family Hub', color: 'bg-purple-500' },
    { id: 8, icon: Shield, label: 'Protection', color: 'bg-red-500' },
  ];

  return (
    <div className="flex justify-center items-start w-full">
      <div
        className="relative"
        style={{
          width: CONTAINER_SIZE,
          height: CONTAINER_SIZE,
        }}
      >
        {/* Central Lottie Animation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Player
            autoplay
            loop
            src="https://lottie.host/53b254b6-8102-40e6-952a-c111cb232a73/7dUngRXxc9.json"
            style={{ height: HOUSE_SIZE, width: HOUSE_SIZE }}
          />
        </div>

        {/* Orbiting Container */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-orbit">
          {/* Feature Icons in Circle */}
          {radius > 0 &&
            features.map((feature, index) => {
              const Icon = feature.icon;
              const angle = (index * 360) / features.length;
              const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
              const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

              return (
                <div
                  key={feature.id}
                  className={`absolute w-16 h-16 ${feature.color} rounded-full shadow-lg flex items-center justify-center cursor-pointer transform transition-all duration-300 hover:scale-110 animate-float z-20 animate-counter-orbit`}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    marginLeft: '-32px',
                    marginTop: '-32px',
                    animationDelay: `${index * 0.2}s`,
                  }}
                  onMouseEnter={() => setActiveFeature(feature)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <Icon className="w-8 h-8 text-white" />
                  {activeFeature?.id === feature.id && (
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      {feature.label}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

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

          @keyframes orbit {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }

          @keyframes counter-orbit {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(-360deg);
            }
          }

          .animate-float {
            animation: float 2s ease-in-out infinite;
          }

          .animate-orbit {
            animation: orbit 200s linear infinite;
          }

          .animate-counter-orbit {
            animation: counter-orbit 200s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SmartHomeInterface;