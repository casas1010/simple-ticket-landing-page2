import React, { Suspense } from 'react';
import ModulesOrbitClient from './modules_orbit_client';
import Loader from '../loader';
import { Module } from '@/app/types/module';

type Props = {
    setModule: (module: Module | null) => void;
};

const ModulesOrbit: React.FC<Props> = ({ setModule }) => {
    return (
        <Suspense fallback={
            <Loader />
        }>
            <ModulesOrbitClient setModule={setModule} />
        </Suspense>
    );
};

export default ModulesOrbit;