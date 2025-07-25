"use client"

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useIsMobile } from '@/app/context/mobile_context';
import { MODULES, Module } from '@/app/data/modules_data';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import lottie, { AnimationItem } from 'lottie-web';

type Props = {
    setModule: (module: Module | null) => void;
};

const ModulesOrbitClient: React.FC<Props> = ({ setModule }) => {
    const isMobile = useIsMobile();
    const [screenWidth, setScreenWidth] = useState<number>(0);
    const [currentAngle, setCurrentAngle] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [activeModule, setActiveModule] = useState<Module | null>(null);
    const animationRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const [scrollThresholdPassed, setScrollThresholdPassed] = useState<boolean>(false);
    const router = useRouter();

    const animationContainerRef = useRef<HTMLDivElement>(null);
    const animationInstanceRef = useRef<AnimationItem | null>(null);

    // Color palette for the orbs
    const orbColors = [
        'bg-blue-500',
        'bg-purple-500', 
        'bg-green-500',
        'bg-red-500',
        'bg-yellow-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-teal-500',
        'bg-orange-500',
        'bg-cyan-500',
    ];

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

    // Handle scroll-based activation
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const threshold = 100;
            const hasScrolledEnough = scrollY > threshold;

            if (hasScrolledEnough !== scrollThresholdPassed) {
                setScrollThresholdPassed(hasScrolledEnough);
            }

            if (hasScrolledEnough) {
                const scrollDelta = scrollY - threshold;
                const moduleIndex = Math.floor(scrollDelta / 150) % MODULES.length;
                const calculatedModule = MODULES[moduleIndex];

                if (activeModule?.title !== calculatedModule.title) {
                    setActiveModule(calculatedModule);
                    setModule(calculatedModule);
                    setIsPaused(true);
                }
            } else {
                if (activeModule !== null) {
                    setActiveModule(null);
                    setModule(null);
                    setIsPaused(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setModule, setIsPaused, activeModule, scrollThresholdPassed]);

    // Handle animation rotation
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

    // Handle Lottie animation on hover
    useEffect(() => {
        if (activeModule?.animationPath && animationContainerRef.current) {
            if (animationInstanceRef.current) {
                animationInstanceRef.current.destroy();
            }

            animationInstanceRef.current = lottie.loadAnimation({
                container: animationContainerRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: activeModule.animationPath,
            });

            return () => {
                animationInstanceRef.current?.destroy();
            };
        }
    }, [activeModule?.animationPath]);

    const handleModuleHover = (mod: Module | null) => {
        setActiveModule(mod);
        setIsPaused(!!mod);
        setModule(mod);
    };

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleModuleClick = (mod: Module) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('mode', mod.mode);

        router.push(`${pathname}?${params.toString()}`);
        setActiveModule(mod);
        setModule(mod);
        setIsPaused(true);
    };

    return (
        <div className="flex justify-center items-start w-full">
            <div className="relative" style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}>

                {/* DISPLAY animationPath */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative" style={{ width: HOUSE_SIZE, height: HOUSE_SIZE }}>
                        {/* Lottie animation (if available) */}
                        <div
                            ref={animationContainerRef}
                            className={`absolute inset-0 transition-all duration-500 ease-in-out transform
    ${activeModule?.animationPath ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                            style={{
                                transform: activeModule?.animationPath ? 'scale(3)' : 'scale(1.0)',
                            }}
                        />

                        {/* Fallback static image */}
                        <img
                            src="https://i.imgur.com/OEMWwAS.png"
                            alt="Static house"
                            className={`absolute inset-0 object-contain transition-all duration-500 ease-in-out transform ${activeModule?.animationPath ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
                                }`}
                            style={{ width: HOUSE_SIZE, height: HOUSE_SIZE }}
                        />
                    </div>
                </div>
                {/* DISPLAY animationPath */}

                <div
                    className="absolute top-1/2 left-1/2"
                    style={{
                        transform: `translate(-50%, -50%) rotate(${currentAngle}deg)`,
                        transition: isPaused ? 'none' : 'transform 0.1s linear',
                    }}
                >
                    {radius > 0 &&
                        MODULES.map((mod, index) => {
                            const Icon = mod.icon;
                            const angle = (index * 360) / MODULES.length;
                            const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                            const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
                            const isActive = activeModule?.title === mod.title;
                            const orbColor = orbColors[index % orbColors.length];

                            return (
                                <div
                                    key={mod.title}
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
                                        className={`w-16 h-16 relative cursor-pointer transition-all duration-300 hover:scale-110 ${isActive ? 'scale-125' : ''}`}
                                        onMouseEnter={() => handleModuleHover(mod)}
                                        onMouseLeave={() => handleModuleHover(null)}
                                        onClick={() => handleModuleClick(mod)}
                                    >
                                        {/* Color orb background */}
                                        <div 
                                            className={`absolute inset-0 rounded-full ${orbColor} opacity-80 blur-sm transition-all duration-300 ${isActive ? 'opacity-100 scale-110' : 'hover:opacity-90 hover:scale-105'}`}
                                        />
                                        
                                        {/* Solid orb base */}
                                        <div 
                                            className={`absolute inset-0 rounded-full ${orbColor} transition-all duration-300 flex items-center justify-center ${isActive ? 'shadow-lg' : 'hover:shadow-md'}`}
                                        />
                                        
                                        {/* Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <Icon className="w-8 h-8 text-white drop-shadow-md" />
                                        </div>
                                        
                                        {/* Tooltip */}
                                        {isActive && (
                                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-lg z-20">
                                                {mod.title}
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default ModulesOrbitClient;