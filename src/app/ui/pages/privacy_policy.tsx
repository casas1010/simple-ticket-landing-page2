import React from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/app/core/context/mobile_context";

const animationProps = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

type Section = {
  title: string;
  description: string | React.ReactNode;
};

const PolicySection: React.FC<{ sections: Section[] }> = ({ sections }) => {
  const isMobile = useIsMobile();

  return (
    <motion.section className="py-16 px-4" {...animationProps}>
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Privacy Policy
        </h2>
        {/* <p className="text-sm text-gray-300 text-center mb-12">
          Effective Date: [Insert Date]
        </p> */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className={`border-b border-white/30 pb-6 last:border-b-0 ${isMobile ? "text-center" : "text-left"
                }`}
              {...animationProps}
            >
              <h3 className="text-xl font-semibold text-indigo-300 mb-3">
                {section.title}
              </h3>
              <div className="text-gray-200 leading-relaxed">
                {section.description}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-xs text-gray-400 text-center">
          Disclaimer: This document is provided for informational purposes only
          and should be reviewed by legal counsel before use.
        </p>
      </div>
    </motion.section>
  );
};

const PrivacyPolicy: React.FC = () => {
  const sections: Section[] = [
    {
      title: "1. Information We Collect",
      description: (
        <ul className="list-disc pl-6 space-y-1 text-left">
          <li>Personal details such as name, email, and phone number.</li>
          <li>Account credentials and preferences.</li>
          <li>Usage data, device information, and cookies.</li>
        </ul>
      ),
    },
    {
      title: "2. How We Use Information",
      description: (
        <ul className="list-disc pl-6 space-y-1 text-left">
          <li>To provide, maintain, and improve the Service.</li>
          <li>To process payments and manage subscriptions.</li>
          <li>To communicate updates, security notices, and support messages.</li>
          <li>To comply with legal obligations.</li>
        </ul>
      ),
    },
    {
      title: "3. Sharing of Information",
      description:
        "We do not sell your data. We may share information with trusted service providers, legal authorities when required, or during business transfers such as mergers or acquisitions.",
    },
    {
      title: "4. Data Security",
      description:
        "We implement industry-standard security measures to protect your data. However, no method of transmission or storage is 100% secure.",
    },
    {
      title: "5. Data Retention",
      description:
        "We retain your data only as long as necessary to provide the Service or comply with legal obligations.",
    },
    {
      title: "6. Your Rights",
      description: (
        <ul className="list-disc pl-6 space-y-1 text-left">
          <li>Access, correct, or delete your personal data.</li>
          <li>Withdraw consent for data processing.</li>
          <li>Request a copy of your data in a portable format.</li>
          <li>
            If you want your data removed, please email{" "}
            <a
              href="mailto:admin@simple-ticket.net"
              className="text-indigo-300 underline hover:text-indigo-400"
            >
              admin@simple-ticket.net
            </a>
            .
          </li>
        </ul>
      ),
    },
    {
      title: "7. Cookies & Tracking",
      description:
        "We use cookies and similar technologies to enhance user experience, analyze trends, and improve the Service. You can manage preferences through your browser settings.",
    },
    {
      title: "8. International Data Transfers",
      description:
        "If you access the Service outside [Jurisdiction], your data may be transferred to and processed in countries with different data protection laws.",
    },
    {
      title: "9. Children’s Privacy",
      description:
        "Our Service is not directed to individuals under 18. We do not knowingly collect data from children.",
    },
    {
      title: "10. Changes to Privacy Policy",
      description:
        "We may update this Privacy Policy from time to time. Continued use of the Service after updates indicates acceptance.",
    },
  ];

  return (
    <div className="relative min-h-screen text-white z-10">
      <PolicySection sections={sections} />
    </div>
  );
};

export default PrivacyPolicy;