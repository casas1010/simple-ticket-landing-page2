"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useIsMobile } from '@/app/core/context/mobile_context';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import lottie, { AnimationItem } from 'lottie-web';
import { Module } from '@/app/core/types/module';
import { MODULES } from '@/app/core/data/modules';
import { useModule } from '@/app/core/context/module';

type LottieAnimationData = Record<string, unknown>;

// Size configuration constants
const SIZE_CONFIG = {
  DESKTOP: {
    CONTAINER: 600,           // px
    HOUSE: 100,               // px
    ORB: 64,                  // px (w-16 = 4rem = 64px)
    ICON: {                   // Icon sizes
      DEFAULT: 24,            // px (w-6 = 1.5rem = 24px)
      HOVERED: 40,            // px (w-10 = 2.5rem = 40px)
      MOBILE: 32              // px (w-8 = 2rem = 32px)
    },
    TEXT: {                   // Text sizes (tailwind classes)
      DEFAULT: 'text-sm',
      HOVERED: 'text-base',
      MOBILE: 'text-xs'
    },
    RADIUS: 220               // px
  },
  MOBILE: {
    CONTAINER_SCALE: 100,     // vw
    HOUSE_SCALE: 15,          // vw
    ORB_SCALE: 16,            // vw (w-16 = 4rem)
    ICON_SCALE: {             // Icon scales
      DEFAULT: 0.5,           // 50% of orb size
      HOVERED: 0.625,         // 62.5% of orb size
      MOBILE: 0.5             // 50% of orb size
    },
    TEXT: 'text-xs',          // Fixed text size
    RADIUS_SCALE: 0.35        // 35% of screen width
  }
};

const ModulesOrbitClient = () => {
    const { module, setModule } = useModule();
    
    const isMobile = useIsMobile();
    const [screenWidth, setScreenWidth] = useState<number>(0);
    const [currentAngle, setCurrentAngle] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [activeModule, setActiveModule] = useState<Module | null>(null);
    const [hoveredModule, setHoveredModule] = useState<Module | null>(null);
    const animationRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const [scrollThresholdPassed, setScrollThresholdPassed] = useState<boolean>(false);
    const autoSelectIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(0);
    const router = useRouter();

    const animationContainerRef = useRef<HTMLDivElement>(null);
    const animationInstanceRef = useRef<AnimationItem | null>(null);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const [animationReady, setAnimationReady] = useState<boolean>(false);
    const [animationCache, setAnimationCache] = useState<Map<string, LottieAnimationData>>(new Map());

    useEffect(() => {
        setScreenWidth(window.innerWidth);
    }, []);

    // Size calculations based on configuration
    const sizes = useMemo(() => {
        if (isMobile && screenWidth > 0) {
            const containerSize = `${screenWidth * (SIZE_CONFIG.MOBILE.CONTAINER_SCALE / 100)}px`;
            const houseSize = `${screenWidth * (SIZE_CONFIG.MOBILE.HOUSE_SCALE / 100)}px`;
            const orbSize = `${screenWidth * (SIZE_CONFIG.MOBILE.ORB_SCALE / 100)}px`;
            const radius = screenWidth * SIZE_CONFIG.MOBILE.RADIUS_SCALE;
            
            return {
                containerSize,
                houseSize,
                orbSize,
                iconSize: {
                    default: `${parseFloat(orbSize) * SIZE_CONFIG.MOBILE.ICON_SCALE.DEFAULT}px`,
                    hovered: `${parseFloat(orbSize) * SIZE_CONFIG.MOBILE.ICON_SCALE.HOVERED}px`,
                    mobile: `${parseFloat(orbSize) * SIZE_CONFIG.MOBILE.ICON_SCALE.MOBILE}px`
                },
                textSize: SIZE_CONFIG.MOBILE.TEXT,
                radius
            };
        } else {
            return {
                containerSize: `${SIZE_CONFIG.DESKTOP.CONTAINER}px`,
                houseSize: `${SIZE_CONFIG.DESKTOP.HOUSE}px`,
                orbSize: `${SIZE_CONFIG.DESKTOP.ORB}px`,
                iconSize: {
                    default: `${SIZE_CONFIG.DESKTOP.ICON.DEFAULT}px`,
                    hovered: `${SIZE_CONFIG.DESKTOP.ICON.HOVERED}px`,
                    mobile: `${SIZE_CONFIG.DESKTOP.ICON.MOBILE}px`
                },
                textSize: SIZE_CONFIG.DESKTOP.TEXT,
                radius: SIZE_CONFIG.DESKTOP.RADIUS
            };
        }
    }, [isMobile, screenWidth]);

    const ROTATION_SPEED = 0.005;

    const fetchLottieData = async (url: string): Promise<LottieAnimationData> => {
        if (animationCache.has(url)) {
            return animationCache.get(url)!;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch animation: ${response.statusText}`);
            }

            const animationData = await response.json() as LottieAnimationData;

            setAnimationCache(prev => new Map(prev.set(url, animationData)));

            return animationData;
        } catch (error) {
            console.error('Error fetching Lottie animation:', error);
            throw error;
        }
    };

    const startAutoSelect = () => {
        if (autoSelectIntervalRef.current) {
            clearInterval(autoSelectIntervalRef.current);
        }

        autoSelectIntervalRef.current = setInterval(() => {
            setCurrentModuleIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % MODULES.length;
                const nextModule = MODULES[nextIndex];
                setActiveModule(nextModule);
                return nextIndex;
            });
        }, 5000);
    };

    const stopAutoSelect = () => {
        if (autoSelectIntervalRef.current) {
            clearInterval(autoSelectIntervalRef.current);
            autoSelectIntervalRef.current = null;
        }
    };

    useEffect(() => {
        const firstModule = MODULES[0];
        setActiveModule(firstModule);
        setCurrentModuleIndex(0);

        startAutoSelect();

        return () => {
            stopAutoSelect();
        };
    }, []);

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
                    setCurrentModuleIndex(moduleIndex);
                    setIsPaused(true);
                    stopAutoSelect();
                }
            } else {
                if (activeModule !== null) {
                    setActiveModule(null);
                    setModule(null);
                    setIsPaused(false);

                    if (!autoSelectIntervalRef.current) {
                        const firstModule = MODULES[0];
                        setActiveModule(firstModule);
                        setCurrentModuleIndex(0);
                        startAutoSelect();
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setModule, setIsPaused, activeModule, scrollThresholdPassed]);

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

    useEffect(() => {
        const moduleToShow = hoveredModule || activeModule;
        
        if (moduleToShow?.animationPath && animationContainerRef.current) {
            setIsTransitioning(true);
            setAnimationReady(false);

            if (animationInstanceRef.current) {
                animationInstanceRef.current.destroy();
                animationInstanceRef.current = null;
            }

            const loadAnimation = async () => {
                try {
                    const animationData = await fetchLottieData(moduleToShow.animationPath);
                    
                    if (animationContainerRef.current) {
                        animationInstanceRef.current = lottie.loadAnimation({
                            container: animationContainerRef.current,
                            renderer: 'svg',
                            loop: true,
                            autoplay: true,
                            animationData,
                        });

                        setTimeout(() => {
                            setAnimationReady(true);
                            setIsTransitioning(false);
                        }, 100);
                    }
                } catch (error) {
                    console.error('Error loading Lottie animation:', error);
                    setIsTransitioning(false);
                    setAnimationReady(false);
                }
            };

            loadAnimation();

            return () => {
                if (animationInstanceRef.current) {
                    animationInstanceRef.current.destroy();
                    animationInstanceRef.current = null;
                }
            };
        } else {
            setIsTransitioning(false);
            setAnimationReady(false);
            if (animationInstanceRef.current) {
                animationInstanceRef.current.destroy();
                animationInstanceRef.current = null;
            }
        }
    }, [hoveredModule?.animationPath, activeModule?.animationPath, animationCache]);

    const handleModuleHover = (mod: Module | null) => {
        setHoveredModule(mod);
        setModule(mod);

        if (mod) {
            setIsPaused(true);
            stopAutoSelect();

            const newIndex = MODULES.findIndex(m => m.title === mod.title);
            setCurrentModuleIndex(newIndex);
        } else {
            setIsPaused(false);
            if (!autoSelectIntervalRef.current) {
                startAutoSelect();
            }
        }
    };

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleModuleClick = (mod: Module) => {
        if(isMobile) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set('mode', mod.mode);

        router.push(`${pathname}?${params.toString()}`);
        setActiveModule(mod);
        setModule(mod);
        setCurrentModuleIndex(MODULES.findIndex(m => m.title === mod.title));
        setIsPaused(true);
        stopAutoSelect();
    };

    const hasActiveAnimation = (hoveredModule?.animationPath || activeModule?.animationPath);

    return (
        <div className="flex justify-center items-start w-full">
            <div className="relative" style={{ width: sizes.containerSize, height: sizes.containerSize }}>

                {/* House + Animation */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative" style={{ width: sizes.houseSize, height: sizes.houseSize }}>
                        <img
                            src="https://i.imgur.com/OEMWwAS.png"
                            alt="Static house"
                            className={`absolute inset-0 object-contain transition-all duration-500 ease-in-out transform ${
                                hasActiveAnimation
                                    ? 'opacity-0 scale-[0.3] blur-sm pointer-events-none'
                                    : 'opacity-100 scale-100 blur-0'
                            }`}
                            style={{
                                width: sizes.houseSize,
                                height: sizes.houseSize,
                                transformOrigin: 'center center',
                                filter: hasActiveAnimation ? 'brightness(0.7)' : 'brightness(1)',
                                zIndex: hasActiveAnimation ? 5 : 15
                            }}
                        />
                        
                        <div
                            ref={animationContainerRef}
                            className={`absolute inset-0 transition-all ease-out transform ${
                                hasActiveAnimation && animationReady
                                    ? 'opacity-100 scale-[1.8] blur-0 duration-500'
                                    : hasActiveAnimation && !animationReady
                                    ? 'opacity-0 scale-[0.3] blur-sm pointer-events-none duration-300'
                                    : 'opacity-0 scale-[0.3] blur-sm pointer-events-none duration-300'
                            }`}
                            style={{
                                transformOrigin: 'center center',
                                zIndex: hasActiveAnimation ? 25 : 10,
                                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))'
                            }}
                        />
                        
                        <div
                            className={`absolute inset-0 rounded-full transition-all duration-300 ease-in-out ${
                                isTransitioning
                                    ? 'opacity-20 scale-105'
                                    : 'opacity-0 scale-100'
                            }`}
                            style={{
                                background: hasActiveAnimation
                                    ? 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
                                    : 'transparent',
                                backdropFilter: isTransitioning ? 'blur(0.5px)' : 'none',
                                zIndex: 20,
                                transformOrigin: 'center center'
                            }}
                        />
                        
                        {hasActiveAnimation && animationReady && (
                            <div
                                className="absolute inset-0 rounded-full opacity-20 animate-pulse"
                                style={{
                                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                                    transform: 'scale(1.5)',
                                    zIndex: 1,
                                    filter: 'blur(20px)'
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* Orbit */}
                <div
                    className="absolute top-1/2 left-1/2"
                    style={{
                        transform: `translate(-50%, -50%) rotate(${currentAngle}deg)`,
                        transition: isPaused ? 'none' : 'transform 0.1s linear',
                    }}
                >
                    {sizes.radius > 0 &&
                        MODULES.map((mod, index) => {
                            const Icon = mod.icon;
                            const angle = (index * 360) / MODULES.length;
                            const x = Math.cos((angle - 90) * (Math.PI / 180)) * sizes.radius;
                            const y = Math.sin((angle - 90) * (Math.PI / 180)) * sizes.radius;
                            const isActive = activeModule?.title === mod.title;
                            const isHovered = hoveredModule?.title === mod.title;
                            const orbColor = mod.color;
                            const shouldHide = !isMobile && hoveredModule && !isHovered;

                            return (
                                <div
                                    key={mod.title}
                                    className="absolute"
                                    style={{
                                        left: `${x}px`,
                                        top: `${y}px`,
                                        marginLeft: `-${parseFloat(sizes.orbSize) / 2}px`,
                                        marginTop: `-${parseFloat(sizes.orbSize) / 2}px`,
                                        transform: `rotate(-${currentAngle}deg)`,
                                    }}
                                >
                                    <div
                                        className={`relative transition-all duration-300 ease-out ${
                                            isMobile 
                                                ? (isActive ? 'scale-125' : '')
                                                : (isHovered ? 'scale-125 hover:scale-150 cursor-pointer' : 'scale-100 cursor-pointer')
                                        } ${shouldHide ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                        style={{
                                            width: sizes.orbSize,
                                            height: sizes.orbSize
                                        }}
                                        onMouseEnter={() => !isMobile && handleModuleHover(mod)}
                                        onMouseLeave={() => !isMobile && handleModuleHover(null)}
                                        onClick={() => !isMobile && handleModuleClick(mod)}
                                    >
                                        <div
                                            className={`absolute inset-0 rounded-full ${orbColor} opacity-80 blur-sm transition-all duration-300 ease-out ${
                                                isActive ? 'opacity-100' : 'hover:opacity-90 hover:scale-105'
                                            }`}
                                        />
                                        <div
                                            className={`absolute inset-0 rounded-full ${orbColor} transition-all duration-300 ease-out flex items-center justify-center ${
                                                isActive ? 'shadow-lg' : 'hover:shadow-md'
                                            }`}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <Icon 
                                                className="text-white drop-shadow-md transition-all duration-200"
                                                style={{
                                                    width: isMobile 
                                                        ? sizes.iconSize.mobile 
                                                        : isHovered 
                                                            ? sizes.iconSize.hovered 
                                                            : sizes.iconSize.default,
                                                    height: isMobile 
                                                        ? sizes.iconSize.mobile 
                                                        : isHovered 
                                                            ? sizes.iconSize.hovered 
                                                            : sizes.iconSize.default
                                                }}
                                            />
                                        </div>
                                        {(!isMobile || isHovered || (isActive && !hoveredModule && !isMobile)) && (
                                            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg whitespace-nowrap shadow-lg z-20 transition-all duration-300 mt-2 ${
                                                isMobile 
                                                    ? sizes.textSize 
                                                    : isHovered 
                                                        ? SIZE_CONFIG.DESKTOP.TEXT.HOVERED 
                                                        : SIZE_CONFIG.DESKTOP.TEXT.DEFAULT
                                            } ${isHovered ? 'animate-fade-in' : ''}`}
                                            style={{
                                                opacity: isMobile || isHovered ? 1 : 0.8,
                                            }}>
                                                {mod.title}
                                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
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

export default ModulesOrbitClient