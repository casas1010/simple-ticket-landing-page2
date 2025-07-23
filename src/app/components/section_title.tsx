

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionTitle = ({
  title,
  sub_title,
}: {
  title: string;
  sub_title: string;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className="text-center mb-16"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
        hidden: {},
      }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-8"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {title}
      </motion.h1>

      <motion.h2
        className="text-2xl md:text-3xl font-semibold text-gray-300"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {sub_title}
      </motion.h2>
    </motion.div>
  );
};

export default SectionTitle;