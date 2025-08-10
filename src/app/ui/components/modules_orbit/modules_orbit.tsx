import React, { Suspense } from 'react';
import ModulesOrbitClient from './modules_orbit_client';
import Loader from '../loader';
import { Module } from '@/app/core/types/module';



const ModulesOrbit  = () => {
    return (
        <Suspense fallback={
            <Loader />
        }>
            <ModulesOrbitClient />
        </Suspense>
    );
};

export default ModulesOrbit;