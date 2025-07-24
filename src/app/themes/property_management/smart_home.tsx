// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import {
//   Shield,
//   Droplets,
//   CheckCircle,
//   FileText,
//   Settings,
//   Users,
//   Lock,
//   Zap,
// } from 'lucide-react';
// import dynamic from 'next/dynamic';
// import { useIsMobile } from '@/app/context/mobile_context';

// const Player = dynamic(
//   () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
//   { ssr: false }
// );

// type Feature = {
//   id: number;
//   icon: React.ElementType;
//   label: string;
//   color: string;
// };

// type Props = {
//   setModule: (module: any) => void;
// };

// const SmartHomeInterface: React.FC<Props> = ({ setModule }) => {
//   const isMobile = useIsMobile();
//   const [screenWidth, setScreenWidth] = useState<number>(0);
//   const [currentAngle, setCurrentAngle] = useState<number>(0);
//   const [isPaused, setIsPaused] = useState<boolean>(false);
//   const animationRef = useRef<number | null>(null);
//   const lastTimeRef = useRef<number>(0);
//   const [activeFeature, setActiveFeature] = useState<Feature | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [scrollIndex, setScrollIndex] = useState<number>(-1);

//   useEffect(() => {
//     setScreenWidth(window.innerWidth);
//   }, []);

//   const HOUSE_SIZE = isMobile ? '50vw' : '400px';
//   const CONTAINER_SIZE = isMobile ? '100vw' : '600px';
//   const ROTATION_SPEED = 0.005;

//   const radius = useMemo(() => {
//     if (isMobile && screenWidth > 0) {
//       return screenWidth * 0.35;
//     }
//     return 220;
//   }, [isMobile, screenWidth]);

//   const modules: Feature[] = [
//     { id: 1, icon: Settings, label: 'Property management', color: 'bg-blue-500' },
//     { id: 2, icon: CheckCircle, label: 'Spirits industry', color: 'bg-green-500' },
//     { id: 3, icon: FileText, label: 'Recruiting', color: 'bg-blue-400' },
//     { id: 4, icon: Droplets, label: 'Sales management', color: 'bg-cyan-500' },
//     { id: 5, icon: Lock, label: 'Financial documentation', color: 'bg-gray-700' },
//     { id: 6, icon: Zap, label: 'Customer management', color: 'bg-yellow-500' },
//     { id: 7, icon: Users, label: 'Marketing', color: 'bg-purple-500' },
//     { id: 8, icon: Shield, label: 'Task management', color: 'bg-red-500' },
//   ];

//   useEffect(() => {
//     const animate = (timestamp: number) => {
//       if (!isPaused) {
//         if (lastTimeRef.current !== 0) {
//           const deltaTime = timestamp - lastTimeRef.current;
//           setCurrentAngle(prev => (prev + deltaTime * ROTATION_SPEED) % 360);
//         }
//         lastTimeRef.current = timestamp;
//       } else {
//         lastTimeRef.current = timestamp;
//       }

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);

//     return () => {
//       if (animationRef.current) cancelAnimationFrame(animationRef.current);
//     };
//   }, [isPaused, ROTATION_SPEED]);

//   const handleModuleHover = (feature: Feature | null) => {
//     setActiveFeature(feature);
//     setIsPaused(feature !== null);
//     setModule(feature ?? {});
//   };

//   // Scroll Simulation Logic
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!containerRef.current) return;
//       const rect = containerRef.current.getBoundingClientRect();
//       const viewportHeight = window.innerHeight;

//       // Only trigger scroll animation when SmartHomeInterface is mostly in view
//       if (rect.top < viewportHeight && rect.bottom > 0) {
//         const scrollY = window.scrollY;
//         const scrollRange = 1000; // Adjust to match expected scroll distance
//         const step = scrollRange / modules.length;
//         const index = Math.min(modules.length - 1, Math.floor(scrollY / step));

//         setScrollIndex(index);
//         handleModuleHover(modules[index]);
//       }
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div ref={containerRef} className="flex justify-center items-start w-full">
//       <div
//         className="relative"
//         style={{
//           width: CONTAINER_SIZE,
//           height: CONTAINER_SIZE,
//         }}
//       >
//         {/* Central Animation */}
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
//           <Player
//             autoplay
//             loop
//             src="https://lottie.host/53b254b6-8102-40e6-952a-c111cb232a73/7dUngRXxc9.json"
//             style={{ height: HOUSE_SIZE, width: HOUSE_SIZE }}
//           />
//         </div>

//         {/* Orbiting Modules */}
//         <div
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//           style={{
//             transform: `translate(-50%, -50%) rotate(${currentAngle}deg)`,
//             transition: isPaused ? 'none' : 'transform 0.1s linear',
//           }}
//         >
//           {radius > 0 &&
//             modules.map((feature, index) => {
//               const Icon = feature.icon;
//               const angle = (index * 360) / modules.length;
//               const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
//               const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

//               return (
//                 <div
//                   key={feature.id}
//                   className="absolute"
//                   style={{
//                     left: `${x}px`,
//                     top: `${y}px`,
//                     marginLeft: '-32px',
//                     marginTop: '-32px',
//                     transform: `rotate(-${currentAngle}deg)`,
//                   }}
//                 >
//                   <div
//                     className={`w-16 h-16 ${feature.color} rounded-full shadow-lg flex items-center justify-center cursor-pointer transform transition-all duration-300 hover:scale-110 animate-float z-20`}
//                     style={{ animationDelay: `${index * 0.2}s` }}
//                     onMouseEnter={() => handleModuleHover(feature)}
//                     onMouseLeave={() => handleModuleHover(null)}
//                   >
//                     <Icon className="w-8 h-8 text-white" />
//                     {activeFeature?.id === feature.id && (
//                       <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
//                         {feature.label}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//         </div>

//         <style jsx>{`
//           @keyframes float {
//             0%,
//             100% {
//               transform: translateY(0px);
//             }
//             50% {
//               transform: translateY(-8px);
//             }
//           }

//           .animate-float {
//             animation: float 2s ease-in-out infinite;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// };

// export default SmartHomeInterface;