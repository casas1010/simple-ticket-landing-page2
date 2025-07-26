"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useIsMobile } from '@/app/core/context/mobile_context';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import lottie, { AnimationItem } from 'lottie-web';
import { Module } from '@/app/core/types/module';
import { MODULES } from '@/app/core/data/modules';

type Props = {
    setModule: (module: Module | null) => void;
};

type LottieAnimationData = Record<string, unknown>;

const ModulesOrbitClient: React.FC<Props> = ({ setModule }) => {
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

    const HOUSE_SIZE = isMobile ? '15vw' : '100px';
    const CONTAINER_SIZE = isMobile ? '100vw' : '600px';
    const ROTATION_SPEED = 0.005;

    const radius = useMemo(() => {
        if (isMobile && screenWidth > 0) {
            return screenWidth * 0.35;
        }
        return 220;
    }, [isMobile, screenWidth]);

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

    // DEBUG: Animation loading with debug statements
    useEffect(() => {
        const moduleToShow = hoveredModule || activeModule;
        
        // console.log('🔄 Animation Effect Triggered:', {
        //     moduleToShow: moduleToShow?.title,
        //     hasAnimationPath: !!moduleToShow?.animationPath,
        //     isTransitioning,
        //     animationReady,
        //     hasActiveAnimation
        // });

        if (moduleToShow?.animationPath && animationContainerRef.current) {
            // console.log('🚀 Starting animation load for:', moduleToShow.title);
            setIsTransitioning(true);
            setAnimationReady(false);

            if (animationInstanceRef.current) {
                console.log('🗑️ Destroying previous animation');
                animationInstanceRef.current.destroy();
                animationInstanceRef.current = null;
            }

            const loadAnimation = async () => {
                try {
                    // console.log('📦 Fetching animation data...');
                    const animationData = await fetchLottieData(moduleToShow.animationPath);
                    // console.log('✅ Animation data loaded');

                    if (animationContainerRef.current) {
                        console.log('🎬 Creating Lottie animation');
                        animationInstanceRef.current = lottie.loadAnimation({
                            container: animationContainerRef.current,
                            renderer: 'svg',
                            loop: true,
                            autoplay: true,
                            animationData,
                        });

                        setTimeout(() => {
                            // console.log('🎯 Animation ready!');
                            setAnimationReady(true);
                            setIsTransitioning(false);
                        }, 100);
                    }
                } catch (error) {
                    console.error('❌ Error loading Lottie animation:', error);
                    setIsTransitioning(false);
                    setAnimationReady(false);
                }
            };

            // Start loading immediately for smoother transition
            loadAnimation();

            return () => {
                if (animationInstanceRef.current) {
                    // console.log('🧹 Cleanup: destroying animation');
                    animationInstanceRef.current.destroy();
                    animationInstanceRef.current = null;
                }
            };
        } else {
            // console.log('🛑 No animation needed, cleaning up');
            setIsTransitioning(false);
            setAnimationReady(false);
            if (animationInstanceRef.current) {
                animationInstanceRef.current.destroy();
                animationInstanceRef.current = null;
            }
        }
    }, [hoveredModule?.animationPath, activeModule?.animationPath, animationCache]);

    const handleModuleHover = (mod: Module | null) => {
        // console.log('🖱️ Module hover:', mod?.title || 'null');
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

    // DEBUG: Log state changes
    useEffect(() => {
        // console.log('📊 State Update:', {
        //     hasActiveAnimation: !!hasActiveAnimation,
        //     isTransitioning,
        //     animationReady,
        //     hoveredModule: hoveredModule?.title,
        //     activeModule: activeModule?.title
        // });
    }, [hasActiveAnimation, isTransitioning, animationReady, hoveredModule, activeModule]);

    return (
        <div className="flex justify-center items-start w-full">
            <div className="relative" style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative" style={{ width: HOUSE_SIZE, height: HOUSE_SIZE }}>
                        {/* DEBUG: Static house with debug info */}
                        <img
                            src="https://i.imgur.com/OEMWwAS.png"
                            alt="Static house"
                            className={`absolute inset-0 object-contain transition-all duration-500 ease-in-out transform ${
                                hasActiveAnimation
                                    ? 'opacity-0 scale-[0.3] blur-sm pointer-events-none'
                                    : 'opacity-100 scale-100 blur-0'
                            }`}
                            style={{
                                width: HOUSE_SIZE,
                                height: HOUSE_SIZE,
                                transformOrigin: 'center center',
                                filter: hasActiveAnimation ? 'brightness(0.7)' : 'brightness(1)',
                                zIndex: hasActiveAnimation ? 5 : 15
                            }}
                            onTransitionEnd={() => {
                                // console.log('🏠 House transition ended:', {
                                //     hasActiveAnimation,
                                //     opacity: hasActiveAnimation ? 0 : 100,
                                //     scale: hasActiveAnimation ? 0.3 : 1
                                // });
                            }}
                        />
                        
                        {/* DEBUG: Animation container with debug info */}
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
                            onTransitionEnd={() => {
                                // console.log('🎬 Animation transition ended:', {
                                //     hasActiveAnimation,
                                //     animationReady,
                                //     opacity: hasActiveAnimation && animationReady ? 100 : 0,
                                //     scale: hasActiveAnimation && animationReady ? 1.8 : 0.3
                                // });
                            }}
                        />
                        
                        {/* FIXED: Improved transition overlay */}
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
                        
                        {/* Glow effect */}
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
                            const isHovered = hoveredModule?.title === mod.title;
                            const orbColor = mod.color;

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
                                        className={`w-16 h-16 relative cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
                                            isActive ? 'scale-125' : ''
                                        }`}
                                        onMouseEnter={() => handleModuleHover(mod)}
                                        onMouseLeave={() => handleModuleHover(null)}
                                        onClick={() => handleModuleClick(mod)}
                                    >
                                        <div
                                            className={`absolute inset-0 rounded-full ${orbColor} opacity-80 blur-sm transition-all duration-300 ease-out ${
                                                isActive ? 'opacity-100 scale-110' : 'hover:opacity-90 hover:scale-105'
                                            }`}
                                        />
                                        <div
                                            className={`absolute inset-0 rounded-full ${orbColor} transition-all duration-300 ease-out flex items-center justify-center ${
                                                isActive ? 'shadow-lg' : 'hover:shadow-md'
                                            }`}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <Icon className="w-8 h-8 text-white drop-shadow-md transition-all duration-200" />
                                        </div>
                                        {(isHovered || (isActive && !hoveredModule && !isMobile)) && (
                                            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-lg z-20 animate-fade-in">
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

export default ModulesOrbitClient;