'use client';

import React from 'react';
import SmartHomeInterface from './smart_home';
import { useIsMobile } from '@/app/context/mobile_context';

export default function PropertyManagementLanding() {
  const isMobile = useIsMobile();

  return (
    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 text-left min-h-screen overflow-hidden">
      {/* Smart Home Interface — Dimmed background on mobile */}
      <div
        className={`${
          isMobile
            ? 'absolute inset-0 z-0 opacity-20 filter brightness-50 pointer-events-none'
            : 'relative z-10 flex-1 w-full max-w-xl'
        }`}
      >
        <SmartHomeInterface />
      </div>

      {/* Content on top */}
      <div className="relative z-20 flex-1 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Transform Your Property
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Management Business
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
          Build a complete property management CRM system with our low-code platform. Manage
          tenants, track rent, coordinate maintenance, and automate workflows — all without coding
          expertise required.
        </p>
      </div>
    </div>
  );
}