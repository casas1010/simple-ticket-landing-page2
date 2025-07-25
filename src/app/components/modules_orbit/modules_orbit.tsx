import React, { Suspense } from 'react';
import { Module } from '@/app/data/modules_data';
import ModulesOrbitClient from './modules_orbit_client';
import Loader from '../loader';

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