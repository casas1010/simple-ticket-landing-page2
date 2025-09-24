import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface MarketSection {
  title: string;
  items: string[];
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const COLORS = ["#2563eb", "#16a34a", "#f97316", "#9333ea"];

const Slide2Content: React.FC = () => {
  const markets: MarketSection[] = [
    {
      title: "Patient & Care Management",
      position: "top-left",
      items: [
        "$50B+ market globally by 2030",
        "Shift to digital health platforms",
        "Chronic care driving adoption"
      ]
    },
    {
      title: "POS Systems",
      position: "top-right",
      items: [
        "$25B market opportunity",
        "Cloud-based POS growing at 15% CAGR",
        "SMBs rapidly digitizing"
      ]
    },
    {
      title: "Restaurant Tech",
      position: "bottom-left",
      items: [
        "$85B global market",
        "Online ordering & delivery expansion",
        "High adoption post-COVID"
      ]
    },
    {
      title: "E-Commerce Stores",
      position: "bottom-right",
      items: [
        "$6T+ global e-commerce sales",
        "Omnichannel retail demand",
        "Integration with logistics & payments"
      ]
    }
  ];

  const data = markets.map((m, i) => ({
    name: m.title,
    value: 25 // Using explicit value instead of calculation
  }));

  const getPositionClasses = (position: MarketSection["position"]) => {
    switch (position) {
      case "top-left":
        return "absolute top-[25%] left-[40%] -translate-x-1/2 -translate-y-1/2";
      case "top-right":
        return "absolute top-[25%] right-[40%] translate-x-1/2 -translate-y-1/2";
      case "bottom-left":
        return "absolute bottom-[25%] left-[40%] -translate-x-1/2 translate-y-1/2";
      case "bottom-right":
        return "absolute bottom-[25%] right-[40%] translate-x-1/2 translate-y-1/2";
      default:
        return "";
    }
  };

  return (
    <div className="relative w-full h-[500px] overflow-visible px-8 py-4">
      {/* Central Animated Pie Chart */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                  isAnimationActive={true}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#1f2937"
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Market Sections */}
      {markets.map((market, index) => (
        <motion.div
          key={market.title}
          className={`${getPositionClasses(market.position)} w-44 h-32 bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg border border-gray-700 shadow-lg flex flex-col`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
        >
          <h2 className="text-xs font-bold mb-2 leading-tight text-white flex-shrink-0">
            {market.title}
          </h2>
          <div className="space-y-0.5 flex-grow overflow-hidden">
            {market.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-start">
                <span className="text-blue-400 mr-1 mt-0.5 text-sm">•</span>
                <p className="text-xs leading-relaxed text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Slide2Content;