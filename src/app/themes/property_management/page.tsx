import React from 'react';
import PropertyManagementLanding from './landing_module';
import PlatformFeatures from './platform_features';
import RawGetStarted from '../raw/get_started_module';
import { PropertyManagementSuite } from './module_features';
import SmartHomeInterface from '@/app/themes/property_management/smart_home';
import Header from '@/app/components/header';

export default function PropertyManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative">
      {/* Header - Stays at top and overlays all */}
      <Header />

      {/* Background pattern overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400 rounded-full blur-3xl opacity-10"></div>
      </div>

      {/* Main content */}
      <PropertyManagementLanding />
      <PropertyManagementSuite />
      <PlatformFeatures />

      {/* Floating dots */}
      <div className="absolute top-1/4 left-10 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-1/3 right-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-bounce opacity-60"></div>
    </div>
  );
}