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

const TopSection: React.FC<TopSectionProps> = ({ title, description, icon }) => {
  return (
    <motion.section
      className="py-16 px-6 rounded-lg text-white"
      {...animationProps}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div className="flex-1 max-w-2xl" {...animationProps}>
            <h1 className="text-4xl font-bold mb-6">{title}</h1>
            <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
          </motion.div>
          {icon && (
            <motion.div className="flex-shrink-0" {...animationProps}>
              <div className="w-48 h-48 flex items-center justify-center text-indigo-400">
                {icon}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

const ValuesSection: React.FC<{ values: { title: string; description: string }[] }> = ({ values }) => {
  return (
    <motion.section className="py-16 px-6 rounded-lg" {...animationProps}>
      <div className="max-w-4xl mx-auto">
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

// TeamIcon stays the same

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
      <TopSection
        title="About Us"
        description="Simple Ticket was founded in 2024 with the mission of streamlining business operations through intelligent automation. Our focus is on helping organizations discover, implement, and maintain solutions that grow and evolve with their changing business requirements. We are committed to applying agile methodologies across all aspects of our operations and leverage these approaches to deliver exceptional results for our clients."
        icon={<TreePalmIcon />}
      />
      <ValuesSection values={values} />
    </div>
  );
};

export default AboutUsHero;