'use client';

import React from 'react';
import SmartHomeInterface from './smart_home';
import { useIsMobile } from '@/app/context/mobile_context';

export default function PropertyManagementLanding() {
  const isMobile = useIsMobile();

  return (
    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 text-left">
      {/* Left: Hero Content */}
      <div className="flex-1 max-w-2xl">
        {/* Hero Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Transform Your Property
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Management Business
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
          Build a complete property management CRM system with our low-code platform. Manage
          tenants, track rent, coordinate maintenance, and automate workflows — all without coding
          expertise required.
        </p>
      </div>

      {/* Right: Smart Home Interface — Only show on non-mobile */}
      {!isMobile && (
        <div className="flex-1 w-full max-w-xl">
          <SmartHomeInterface />
        </div>
      )}
    </div>
  );
}