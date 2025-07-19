import React from 'react';
import { CheckSquare, Database, Grid3X3, Leaf, Briefcase, ShoppingBag } from 'lucide-react';

const RestaurantLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-500 p-2 rounded-lg">
            <CheckSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Simple</h1>
            <h2 className="text-xl font-bold">Ticket</h2>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-8 text-gray-300">
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Download</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        
        <button className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-full transition-colors">
          SIGN IN
        </button>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Plan. Sell. Scan.
                <br />
                <span className="text-blue-400">Simplified.</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Simple Ticket empowers small businesses with AI-powered automation tools and intuitive, low-code platform.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-full text-lg font-semibold transition-colors">
                GET STARTED
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 px-8 py-4 rounded-full text-lg font-semibold transition-colors">
                SEE FEATURES
              </button>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 relative overflow-hidden min-h-[400px]">
              {/* Background Circles */}
              <div className="absolute inset-0">
                <div className="absolute top-20 left-8 w-24 h-24 border border-blue-400/20 rounded-full"></div>
                <div className="absolute top-32 left-32 w-16 h-16 border border-blue-400/20 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 border border-blue-400/20 rounded-full"></div>
                <div className="absolute bottom-32 left-16 w-20 h-20 border border-blue-400/20 rounded-full"></div>
              </div>
              
              {/* Dashboard Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                  <span className="text-gray-400 text-lg">Low Code</span>
                  <Database className="h-10 w-10 text-blue-400" />
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-slate-600/50 p-3 rounded-xl">
                      <Grid3X3 className="h-6 w-6 text-gray-300" />
                    </div>
                    <div className="bg-blue-500 p-3 rounded-xl">
                      <CheckSquare className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-gray-300 text-lg">
                    Easy to use.
                  </div>
                  
                  <div className="flex justify-end mt-16">
                    <div className="bg-blue-500/20 border border-blue-400/30 p-4 rounded-2xl">
                      <Leaf className="h-10 w-10 text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Icons Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-20 lg:mt-32">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="bg-teal-500/20 p-4 rounded-2xl">
              <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-teal-900 rounded-full"></div>
              </div>
            </div>
            <span className="text-gray-300 text-lg">Restaurant</span>
          </div>
          
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="bg-teal-500/20 p-4 rounded-2xl">
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-teal-400 rounded transform rotate-12"></div>
              </div>
            </div>
            <span className="text-gray-300 text-lg">Legal</span>
          </div>
          
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="bg-teal-500/20 p-4 rounded-2xl">
              <Leaf className="h-8 w-8 text-teal-400" />
            </div>
            <span className="text-gray-300 text-lg">Eco-Friendly</span>
          </div>
          
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="bg-teal-500/20 p-4 rounded-2xl">
              <Briefcase className="h-8 w-8 text-teal-400" />
            </div>
            <span className="text-gray-300 text-lg">Services</span>
          </div>
          
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="bg-teal-500/20 p-4 rounded-2xl">
              <ShoppingBag className="h-8 w-8 text-teal-400" />
            </div>
            <span className="text-gray-300 text-lg">Services</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLanding;