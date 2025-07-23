'use client';


import React from 'react';
import { Check } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import SectionTitle from '@/app/components/section_title';



const PlatformFeatures = () => {
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

const parseValue = (value: string) => {
  const match = value.match(/^([\d.]+)(\D*)$/);
  if (!match) return { number: 0, suffix: '' };
  return { number: parseFloat(match[1]), suffix: match[2] };
};

  return (
    <div className="min-h-screen text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <SectionTitle
          title="Why Choose Our Low-Code Platform?"
          sub_title="Built for Property Managers"
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features List */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {feature}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {stats.map((stat, index) => {
              const { number, suffix } = parseValue(stat.value);
              const { ref, inView, entry } = useInView({
                triggerOnce: false,
                threshold: 0.5,
              });

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700 hover:border-slate-600 transition-colors duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <div className={`text-4xl md:text-5xl font-bold mb-3 ${stat.color}`}>
                    {inView ? (
                      <CountUp
                        end={number}
                        duration={2}
                        decimals={number % 1 !== 0 ? 1 : 0}
                        suffix={suffix}
                        key={entry?.time}
                      />
                    ) : (
                      <>0{suffix}</>
                    )}
                  </div>
                  <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>



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

export default PlatformFeatures;