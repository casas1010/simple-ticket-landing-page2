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

    // Auto-select module every 5 seconds (visual only, doesn't update title)
    useEffect(() => {
        const startAutoSelect = () => {
            if (autoSelectIntervalRef.current) {
                clearInterval(autoSelectIntervalRef.current);
            }
            
            autoSelectIntervalRef.current = setInterval(() => {
                setCurrentModuleIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % MODULES.length;
                    const nextModule = MODULES[nextIndex];
                    setActiveModule(nextModule);
                    // Don't update the title/content automatically - only visual selection
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

        // Start auto-selection immediately (visual only)
        const firstModule = MODULES[0];
        setActiveModule(firstModule);
        setCurrentModuleIndex(0);
        
        startAutoSelect();

        return () => {
            stopAutoSelect();
        };
    }, []); // Remove setModule dependency

    // Handle scroll-based activation (keeping original functionality but with auto-select)
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
                    
                    // Stop auto-selection when user scrolls
                    if (autoSelectIntervalRef.current) {
                        clearInterval(autoSelectIntervalRef.current);
                        autoSelectIntervalRef.current = null;
                    }
                }
            } else {
                if (activeModule !== null) {
                    setActiveModule(null);
                    setModule(null);
                    setIsPaused(false);
                    
                    // Restart auto-selection when user scrolls back up (visual only)
                    if (!autoSelectIntervalRef.current) {
                        const firstModule = MODULES[0];
                        setActiveModule(firstModule);
                        setCurrentModuleIndex(0);
                        
                        autoSelectIntervalRef.current = setInterval(() => {
                            setCurrentModuleIndex((prevIndex) => {
                                const nextIndex = (prevIndex + 1) % MODULES.length;
                                const nextModule = MODULES[nextIndex];
                                setActiveModule(nextModule);
                                // Don't update title automatically
                                return nextIndex;
                            });
                        }, 5000);
                    }
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

    // Handle Lottie animation - should respond to hovered module, not active module
    useEffect(() => {
        const moduleToShow = hoveredModule || activeModule;
        if (moduleToShow?.animationPath && animationContainerRef.current) {
            // Start transition
            setIsTransitioning(true);
            
            // Small delay to allow CSS transition to start
            setTimeout(() => {
                if (animationInstanceRef.current) {
                    animationInstanceRef.current.destroy();
                }

                animationInstanceRef.current = lottie.loadAnimation({
                    container: animationContainerRef.current!,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: moduleToShow.animationPath,
                });

                // End transition after animation loads
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 100);
            }, 150);

            return () => {
                animationInstanceRef.current?.destroy();
            };
        } else {
            // If no animation to show, end transition immediately
            setIsTransitioning(false);
        }
    }, [hoveredModule?.animationPath, activeModule?.animationPath]);

    const handleModuleHover = (mod: Module | null) => {
        setHoveredModule(mod);
        // Update the title/content only on hover
        setModule(mod);
        // Pause rotation when hovering over any module
        setIsPaused(mod !== null);
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
        
        // Stop auto-selection when user manually selects
        if (autoSelectIntervalRef.current) {
            clearInterval(autoSelectIntervalRef.current);
            autoSelectIntervalRef.current = null;
        }
    };

    const hasActiveAnimation = (hoveredModule?.animationPath || activeModule?.animationPath);

    return (
        <div className="flex justify-center items-start w-full">
            <div className="relative" style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}>

                {/* DISPLAY animationPath */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative" style={{ width: HOUSE_SIZE, height: HOUSE_SIZE }}>
                        
                        {/* Static house image - shrinks when animation appears */}
                        <img
                            src="https://i.imgur.com/OEMWwAS.png"
                            alt="Static house"
                            className={`absolute inset-0 object-contain transition-all duration-500 ease-in-out transform ${
                                hasActiveAnimation 
                                    ? 'opacity-0 scale-50 pointer-events-none' 
                                    : 'opacity-100 scale-100'
                            }`}
                            style={{ width: HOUSE_SIZE, height: HOUSE_SIZE }}
                        />

                        {/* Lottie animation - grows from small to overshadow */}
                        <div
                            ref={animationContainerRef}
                            className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
                                hasActiveAnimation 
                                    ? 'opacity-100 scale-300' 
                                    : 'opacity-0 scale-75 pointer-events-none'
                            }`}
                            style={{
                                transformOrigin: 'center center',
                                zIndex: hasActiveAnimation ? 20 : 10
                            }}
                        />

                        {/* Overlay effect during transition */}
                        <div
                            className={`absolute inset-0 bg-white/10 rounded-full transition-all duration-300 ease-in-out ${
                                isTransitioning ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                            }`}
                            style={{
                                backdropFilter: 'blur(2px)',
                                zIndex: 15
                            }}
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
                                        {/* Color orb background */}
                                        <div
                                            className={`absolute inset-0 rounded-full ${orbColor} opacity-80 blur-sm transition-all duration-300 ease-out ${
                                                isActive ? 'opacity-100 scale-110' : 'hover:opacity-90 hover:scale-105'
                                            }`}
                                        />

                                        {/* Solid orb base */}
                                        <div
                                            className={`absolute inset-0 rounded-full ${orbColor} transition-all duration-300 ease-out flex items-center justify-center ${
                                                isActive ? 'shadow-lg' : 'hover:shadow-md'
                                            }`}
                                        />

                                        {/* Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <Icon className="w-8 h-8 text-white drop-shadow-md transition-all duration-200" />
                                        </div>

                                        {/* Tooltip - only shows on hover */}
                                        {isHovered && (
                                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-lg z-20 animate-fade-in">
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