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
    const [animationReady, setAnimationReady] = useState<boolean>(false);

    useEffect(() => {
        setScreenWidth(window.innerWidth);  
    }, []);

    const HOUSE_SIZE = isMobile ? '50vw' : '200px';
    const CONTAINER_SIZE = isMobile ? '100vw' : '600px';
    const ROTATION_SPEED = 0.005;

    const radius = useMemo(() => {
        if (isMobile && screenWidth > 0) {
            return screenWidth * 0.35;
        }
        return 220;
    }, [isMobile, screenWidth]);

    // Start or restart auto-select interval
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

    // Stop auto-select interval
    const stopAutoSelect = () => {
        if (autoSelectIntervalRef.current) {
            clearInterval(autoSelectIntervalRef.current);
            autoSelectIntervalRef.current = null;
        }
    };

    // Auto-select module every 5 seconds (visual only, doesn't update title)
    useEffect(() => {
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
                    stopAutoSelect();
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

    // Handle Lottie animation - improved for smoother transitions
    useEffect(() => {
        const moduleToShow = hoveredModule || activeModule;
        
        if (moduleToShow?.animationPath && animationContainerRef.current) {
            // Start transition immediately
            setIsTransitioning(true);
            setAnimationReady(false);
            
            // Destroy previous animation immediately
            if (animationInstanceRef.current) {
                animationInstanceRef.current.destroy();
                animationInstanceRef.current = null;
            }

            // Load new animation with a small delay for smoother transition
            const loadTimeout = setTimeout(() => {
                if (animationContainerRef.current) {
                    try {
                        animationInstanceRef.current = lottie.loadAnimation({
                            container: animationContainerRef.current,
                            renderer: 'svg',
                            loop: true,
                            autoplay: true,
                            path: moduleToShow.animationPath,
                        });

                        // Set animation ready after a brief moment
                        const readyTimeout = setTimeout(() => {
                            setAnimationReady(true);
                            setIsTransitioning(false);
                        }, 200);

                        return () => clearTimeout(readyTimeout);
                    } catch (error) {
                        console.error('Error loading Lottie animation:', error);
                        setIsTransitioning(false);
                        setAnimationReady(false);
                    }
                }
            }, 100);

            return () => {
                clearTimeout(loadTimeout);
                if (animationInstanceRef.current) {
                    animationInstanceRef.current.destroy();
                    animationInstanceRef.current = null;
                }
            };
        } else {
            // No animation to show - reset states
            setIsTransitioning(false);
            setAnimationReady(false);
            if (animationInstanceRef.current) {
                animationInstanceRef.current.destroy();
                animationInstanceRef.current = null;
            }
        }
    }, [hoveredModule?.animationPath, activeModule?.animationPath]);

    const handleModuleHover = (mod: Module | null) => {
        setHoveredModule(mod);
        // Update the title/content only on hover
        setModule(mod);
        
        if (mod) {
            // Pause rotation and auto-select when hovering over any module
            setIsPaused(true);
            stopAutoSelect();
            
            // Update current module index to the hovered module
            const newIndex = MODULES.findIndex(m => m.title === mod.title);
            setCurrentModuleIndex(newIndex);
        } else {
            // Resume rotation and auto-select when hover ends
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
        
        // Stop auto-selection when user manually selects
        stopAutoSelect();
    };

    const hasActiveAnimation = (hoveredModule?.animationPath || activeModule?.animationPath);

    return (
        <div className="flex justify-center items-start w-full">
            <div className="relative" style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}>

                {/* DISPLAY animationPath */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative" style={{ width: HOUSE_SIZE, height: HOUSE_SIZE }}>
                        
                        {/* Static house image - smoother shrinking animation */}
                        <img
                            src="https://i.imgur.com/OEMWwAS.png"
                            alt="Static house"
                            className={`absolute inset-0 object-contain transition-all duration-700 ease-in-out transform ${
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
                        />

                        {/* Lottie animation - smoother growing animation */}
                        <div
                            ref={animationContainerRef}
                            className={`absolute inset-0 transition-all duration-700 ease-out transform ${
                                hasActiveAnimation && animationReady
                                    ? 'opacity-100 scale-[1.8] blur-0' 
                                    : 'opacity-0 scale-50 blur-sm pointer-events-none'
                            }`}
                            style={{
                                transformOrigin: 'center center',
                                zIndex: hasActiveAnimation ? 25 : 10,
                                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))'
                            }}
                        />

                        {/* Enhanced transition overlay with radial effect */}
                        <div
                            className={`absolute inset-0 rounded-full transition-all duration-500 ease-in-out ${
                                isTransitioning 
                                    ? 'opacity-30 scale-110' 
                                    : 'opacity-0 scale-100'
                            }`}
                            style={{
                                background: hasActiveAnimation 
                                    ? 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)'
                                    : 'transparent',
                                backdropFilter: isTransitioning ? 'blur(1px)' : 'none',
                                zIndex: 20,
                                transformOrigin: 'center center'
                            }}
                        />

                        {/* Subtle glow effect for active animation */}
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