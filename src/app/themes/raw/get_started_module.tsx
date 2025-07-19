import React from 'react';

const RawGetStarted: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4 py-16">
      {/* Background Pattern/Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
          Ready to Modernize Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Property Management
          </span>
          ?
        </h1>
        
        {/* Subheading */}
        <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of property managers who've transformed their business
          <br className="hidden sm:block" />
          with our low-code platform
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
            Start Free Trial
          </button>
          
          <button className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 hover:bg-slate-700/60 text-white font-semibold rounded-lg border border-slate-600 hover:border-slate-500 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-500/50 backdrop-blur-sm">
            Schedule Demo
          </button>
        </div>
        
        {/* Optional: Trust indicators or additional info */}
        <div className="mt-16 pt-8 border-t border-slate-700/50">
          <p className="text-sm text-slate-400 mb-4">Trusted by property management professionals worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* You can add company logos or trust badges here */}
            <div className="text-slate-500 text-xs font-medium">★★★★★ 4.9/5 Rating</div>
            <div className="text-slate-500 text-xs font-medium">500+ Companies</div>
            <div className="text-slate-500 text-xs font-medium">99.9% Uptime</div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-5 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default RawGetStarted;