import React from "react";
import { motion } from "framer-motion";
import { TreePalmIcon } from "lucide-react";

type TopSectionProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

const animationProps = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const ValuesSection: React.FC<{ values: { title: string; description: string }[] }> = ({ values }) => {
  return (
    <motion.section className="py-16 px-4" {...animationProps}>
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Our Values</h2>
        <div className="space-y-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="border-b border-white/30 pb-6 last:border-b-0"
              {...animationProps}
            >
              <h3 className="text-xl font-semibold text-indigo-300 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-200 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function AboutUs() {
  return (
    <motion.section
      className="flex flex-col items-center justify-center min-h-screen"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }} // Replay animation when in view
    >
      {/* Tagline */}
      <motion.p
        className="text-gray-400 tracking-widest text-lg md:text-xl mb-6 uppercase font-semibold"
        variants={itemVariants}
        transition={{ duration: 0.6 }}
      >
        SIMPLE SOLUTIONS. POWERFUL RESULTS.
      </motion.p>

      {/* Title */}
      <motion.h1
        className="text-6xl font-bold mb-6"
        variants={itemVariants}
        transition={{ duration: 0.6 }}
      >
        <span className="bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
          About
        </span>{" "}
        <span className="bg-gradient-to-r from-pink-300 to-blue-300 bg-clip-text text-transparent">
          Us
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-gray-400 leading-relaxed max-w-3xl mx-auto"
        variants={itemVariants}
        transition={{ duration: 0.6 }}
      >
        Founded in 2024, Simple Ticket is dedicated to helping businesses run
        smarter through intelligent automation. We design, implement, and
        maintain solutions that evolve with your needs — always guided by agile
        principles to deliver measurable, lasting impact.
      </motion.p>
    </motion.section>
  );
}


const AboutUsHero: React.FC = () => {
  const values = [
    {
      title: "Champion Automation",
      description:
        "We aim to automate repetitive tasks to free our customers to focus on what truly matters. Automation fuels innovation within our team and drives continuous improvement.",
    },
    {
      title: "Relentless Improvement",
      description:
        "Good enough isn’t good enough. We challenge ourselves to exceed expectations and continuously raise the bar in everything we do.",
    },
    {
      title: "Embrace Agility",
      description:
        "We embrace flexibility and open-mindedness, empowering agile delivery that allows us to pivot swiftly and adapt to our customers’ evolving needs.",
    },
    {
      title: "Lead with Integrity",
      description:
        "We value humility and transparency. Owning our mistakes enables collective learning and fosters a culture of trust and growth.",
    },
    {
      title: "Trust & Respect",
      description:
        "We build trust by giving others the benefit of the doubt, creating a safe environment that encourages positivity, innovation, and authentic self-expression.",
    },
  ];

  return (
    <div className="relative min-h-screen text-white z-10">
      <AboutUs />
      <ValuesSection values={values} />
    </div>
  );
};

export default AboutUsHero;