'use client';

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

import { ALL_MODULES_AND_FEATURES } from '../../data/modules_data';
import { DetailedCardProps } from '../../data/modules_data';



const DetailedCard: React.FC<DetailedCardProps> = ({ title, description, animationPath, details }) => {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const res = await fetch(animationPath);
        const json = await res.json();
        setAnimationData(json);
      } catch (err) {
        console.error('Failed to load Lottie animation:', err);
      }
    };

    fetchAnimation();
  }, [animationPath]);

  return (
    <div 
      className="group relative overflow-hidden rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Removed background gradient and ambient orbs */}

      <div className="relative z-10 p-8">
        {/* Animation Container */}
        <div className="relative w-full h-64 mb-6 overflow-hidden rounded-2xl">
          {animationData ? (
            <div className={`transform transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
              <Lottie 
                animationData={animationData} 
                loop 
                autoplay 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce delay-100" />
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-gray-200 transition-all duration-500">
            {title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-100 leading-relaxed transition-colors duration-500">
            {description}
          </p>

          {/* Details */}
          <div className="space-y-3 pt-4">
            {details.map((detail, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 p-3 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group/item"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                  {/* <span className="text-lg filter drop-shadow-sm">{detail.icon}</span> */}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-100 group-hover/item:translate-x-1 transition-all duration-300">
                  {detail.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping" />
        </div>
      </div>
    </div>
  );
};





const Modules: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Removed animated background elements and grid overlay */}

      <div className="relative z-10 max-w-7xl mx-auto py-20 px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 animate-fade-in">
            Modules
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
          <p className="text-gray-300 text-xl mt-8 max-w-2xl mx-auto leading-relaxed">
            Discover powerful tools designed to transform your business operations
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {ALL_MODULES_AND_FEATURES.map((item, index) => (
            <div 
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <DetailedCard {...item} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Modules;