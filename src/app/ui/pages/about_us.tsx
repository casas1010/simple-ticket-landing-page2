// components/AboutUsHero.jsx
import React from 'react';

const values = [
  {
    title: "Automate with Purpose",
    description:
      "We automate intentionally—to eliminate the mundane and unlock time for real innovation. Automation helps us and our customers focus on what truly matters.",
    icon: "⚙️",
  },
  {
    title: "Relentlessly Improve",
    description:
      "Stagnation isn’t an option. From our products to our people, we’re always evolving—learning, refining, and pushing boundaries.",
    icon: "📈",
  },
  {
    title: "Move with Agility",
    description:
      "Adaptability is our strength. We stay flexible, move fast, and embrace change to stay ahead of what our customers need next.",
    icon: "🤸",
  },
  {
    title: "Lead with Honesty",
    description:
      "We choose transparency over ego. Honest feedback and open communication build trust, growth, and meaningful progress.",
    icon: "🫱🤝🫲",
  },
  {
    title: "Assume Positive Intent",
    description:
      "We trust each other first. By assuming the best in people, we create space for bold ideas, open dialogue, and authentic collaboration.",
    icon: "💡",
  },
];

const AboutUs = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {values.map((value, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-2xl border border-white/20 shadow-xl backdrop-blur-md bg-white/10 transition-transform hover:scale-[1.02]"
        >
          {/* Content */}
          <div className="relative z-10 p-6 flex items-start gap-4 text-white">
            <div className="text-3xl mt-1">{value.icon}</div>
            <div>
              <h3 className="text-xl font-semibold tracking-wide">
                {value.title}
              </h3>
              <p className="text-white/80 mt-2 leading-relaxed font-medium">
                {value.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;