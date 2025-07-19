import React from 'react';
import { Check } from 'lucide-react';

const PropertyManagementFeatures2 = () => {
  const features = [
    'No coding required - visual drag-and-drop interface',
    'Pre-built property management templates',
    'Customizable workflows and automation',
    'Integration with popular tools and services',
    'Scalable from single properties to large portfolios',
    'Mobile-responsive design out of the box',
    'Real-time reporting and analytics',
    'Secure cloud hosting and data backup'
  ];

  const stats = [
    { value: '80%', label: 'Time Savings', color: 'text-blue-400' },
    { value: '15min', label: 'Setup Time', color: 'text-blue-400' },
    { value: '100+', label: 'Integrations', color: 'text-blue-400' },
    { value: '99.9%', label: 'Uptime SLA', color: 'text-blue-400' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Why Choose Our Low-Code Platform?
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">
            Built for Property Managers
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700 hover:border-slate-600 transition-colors duration-300"
              >
                <div className={`text-4xl md:text-5xl font-bold mb-3 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
          <p className="text-gray-400 mt-4">
            Join thousands of property managers who've streamlined their operations
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyManagementFeatures2;