import React from 'react';
import { Home, Play } from 'lucide-react';

export default function PropertyManagementLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
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
      <main className="relative z-10 flex flex-col items-center justify-center px-8 py-20 text-center">
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
              <div className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </div>
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

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-1/3 right-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-bounce opacity-60"></div>
    </div>
  );
}