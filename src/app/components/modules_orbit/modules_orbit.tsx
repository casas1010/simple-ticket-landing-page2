import React, { Suspense } from 'react';
import { Module } from '@/app/data/modules_data';
import ModulesOrbitClient from './modules_orbit_client';

type Props = {
    setModule: (module: Module | null) => void;
};

const ModulesOrbit: React.FC<Props> = ({ setModule }) => {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-start w-full">
                <div className="relative w-[600px] h-[600px] md:w-[100vw] md:h-[100vw] max-w-[600px] max-h-[600px]">
                    {/* Loading placeholder that matches the component structure */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="relative w-[100px] h-[100px] md:w-[50vw] md:h-[50vw]">
                            <img
                                src="https://i.imgur.com/OEMWwAS.png"
                                alt="Loading..."
                                className="absolute inset-0 object-contain opacity-50"
                                style={{ width: '100px', height: '100px' }}
                            />
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {/* Loading dots for orbit positions */}
                        {Array.from({ length: 8 }).map((_, index) => {
                            const angle = (index * 360) / 8;
                            const radius = 220;
                            const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                            const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
                            
                            return (
                                <div
                                    key={index}
                                    className="absolute w-16 h-16 bg-gray-600 rounded-full opacity-30 animate-pulse"
                                    style={{
                                        left: `${x}px`,
                                        top: `${y}px`,
                                        marginLeft: '-32px',
                                        marginTop: '-32px',
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        }>
            <ModulesOrbitClient setModule={setModule} />
        </Suspense>
    );
};

export default ModulesOrbit;