"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Home, Play } from 'lucide-react';

export default function RawLanding() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleCanPlay = () => {
      // Wait 0.1 second after video starts playing
      const playWatcher = setInterval(() => {
        if (video.currentTime >= 0.1) {
          clearInterval(playWatcher);
          setIsReady(true);
        }
      }, 50);
    };

    video.addEventListener('canplay', handleCanPlay);
    return () => video.removeEventListener('canplay', handleCanPlay);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://cdn.jsdelivr.net/gh/casas1010/background-video/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      {isReady && (
        <div className="relative z-10 w-full h-full">
          {/* Header */}
          <header className="flex items-center justify-between px-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-xl font-bold">Simple Property</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white hover:text-blue-400 transition-colors">Features</a>
              <a href="#pricing" className="text-white hover:text-blue-400 transition-colors">Pricing</a>
              <a href="#about" className="text-white hover:text-blue-400 transition-colors">About</a>
              <a href="#contact" className="text-white hover:text-blue-400 transition-colors">Contact</a>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex flex-col items-center justify-center px-8 py-20 text-center">
            {/* Badge */}
            <div className="mb-8 animate-pulse">
              <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-emerald-500/30 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-ping"></div>
                <span className="text-emerald-400 text-sm font-medium">Low-code property management CRM</span>
              </div>
            </div>

            {/* Hero Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Transform Your Property
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Management Business
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl leading-relaxed">
              Build a complete property management CRM system with our low-code platform. Manage 
              tenants, track rent, coordinate maintenance, and automate workflows - all without coding 
              expertise required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
                <span className="flex items-center justify-center">
                  Start Building Free
                  <div className="ml-2 group-hover:translate-x-1 transition-transform">→</div>
                </span>
              </button>

              <button className="group bg-slate-800/50 hover:bg-slate-700/50 text-white px-8 py-4 rounded-lg font-semibold text-lg backdrop-blur-sm border border-slate-600/50 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  View Demo
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
              <div className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-slate-400 text-lg">Properties Managed</div>
              </div>

              <div className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  95%
                </div>
                <div className="text-slate-400 text-lg">Occupancy Rate</div>
              </div>

              <div className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-slate-400 text-lg">System Uptime</div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}