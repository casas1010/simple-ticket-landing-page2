import { FC, useMemo, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";

interface FeatureDetail {
  icon: React.ElementType;
  description: string;
  iconColor?: string;
  iconBg?: string;
}

interface Feature {
  title: string;
  main_description?: string;
  main_description_highlight?: string;
  sub_description?: string;
  details?: FeatureDetail[];
  gradient?: string;
  icon?: React.ElementType;
  color?: string;
}

interface FeatureCardProps {
  feature: Feature;
  isFlipped?: boolean;
}

export const FeatureCard: FC<FeatureCardProps> = ({ feature, isFlipped = false }) => {
  const animationClass = useMemo(() => {
    const effects = ["icon-bob", "icon-waves"];
    return effects[Math.floor(Math.random() * effects.length)];
  }, []);

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: false });

  // ✅ Fix: type the object as Variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.3 } },
  };

  const IconBlock = (
    <div className="flex flex-1 items-center justify-center">
      <div
        className={`relative z-0 flex items-center justify-center rounded-2xl p-8 shadow-lg ${animationClass} ${
          feature.color || "bg-[#0F0F1A]"
        }`}
        style={{ width: "140px", height: "140px" }}
      >
        {animationClass === "icon-waves" && (
          <>
            <span className="wave absolute inset-0 -z-10"></span>
            <span className="wave delay-1 absolute inset-0 -z-10"></span>
          </>
        )}
        <div className="relative z-10 flex items-center justify-center">
          {feature.icon ? (
            <feature.icon className="text-white" size={64} />
          ) : (
            <span className="text-6xl">🔐</span>
          )}
        </div>
      </div>
    </div>
  );

  const TextBlock = (
    <div className="flex flex-1 flex-col justify-center h-full">
      <h2 className="text-3xl font-bold" style={{ color: feature.gradient || "#a78bfa" }}>
        {feature.title}
      </h2>

      {feature.main_description && (
        <p className="mt-2 text-gray-400 max-w-lg">
          {feature.main_description}{" "}
          {feature.main_description_highlight && (
            <span className="text-white font-semibold">{feature.main_description_highlight}</span>
          )}
        </p>
      )}

      {feature.sub_description && <p className="mt-2 text-gray-500 max-w-lg">{feature.sub_description}</p>}

      {feature.details && (
        <ul className="mt-6 space-y-3">
          {feature.details.map((detail, index) => {
            const Icon = detail.icon || CheckCircle;
            return (
              <li key={index} className="flex items-center text-white">
                <div
                  className={`flex items-center justify-center rounded-full p-2 mr-2 ${
                    detail.iconBg || "bg-green-600"
                  }`}
                >
                  <Icon className={detail.iconColor || "text-white"} size={20} />
                </div>
                {detail.description}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={cardVariants} // ✅ No more type error
      className="flex items-center justify-center py-12 px-6 rounded-xl shadow-lg"
    >
      <div className="flex max-w-5xl w-full items-center gap-12">
        {isFlipped ? (
          <>
            {TextBlock}
            {IconBlock}
          </>
        ) : (
          <>
            {IconBlock}
            {TextBlock}
          </>
        )}
      </div>
    </motion.div>
  );
};