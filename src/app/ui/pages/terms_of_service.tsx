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

const TermsSection: React.FC<{ sections: Section[] }> = ({ sections }) => {
  const isMobile = useIsMobile();

  return (
    <motion.section className="py-16 px-4" {...animationProps}>
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Terms of Service
        </h2>
        {/* <p className="text-sm text-gray-300 text-center mb-12">
          Effective Date: [Insert Date]
        </p> */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className={`border-b border-white/30 pb-6 last:border-b-0 ${
                isMobile ? "text-center" : "text-left"
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

const TermsOfService: React.FC = () => {
  const sections: Section[] = [
    {
      title: "1. Eligibility",
      description:
        "You must be at least 18 years old and legally able to enter into these Terms. By using the Service, you agree to comply with all applicable laws and regulations.",
    },
    {
      title: "2. Account Registration",
      description: (
        <ul className="list-disc pl-6 space-y-1 text-left">
          <li>You must create an account to access most features.</li>
          <li>You are responsible for safeguarding your credentials.</li>
          <li>Notify us immediately if you suspect unauthorized use.</li>
        </ul>
      ),
    },
    {
      title: "3. Use of the Service",
      description: (
        <ul className="list-disc pl-6 space-y-1 text-left">
          <li>No reverse engineering or tampering with the system.</li>
          <li>No transmission of malware or harmful code.</li>
          <li>No violation of intellectual property or privacy rights.</li>
        </ul>
      ),
    },
    {
      title: "4. Subscriptions and Payment",
      description:
        "Certain features require payment. Fees are non-refundable unless required by law. Late or failed payments may result in suspension of your account.",
    },
    {
      title: "5. Data Ownership and Privacy",
      description:
        "You retain ownership of all Customer Data. By using the Service, you grant us a limited license to process and store data as needed to provide the Service. See our Privacy Policy for details.",
    },
    {
      title: "6. Intellectual Property",
      description:
        "The Service, including software, content, and design, remains our property or that of our licensors. You may not copy, modify, or distribute it without permission.",
    },
    {
      title: "7. Service Availability",
      description:
        "We aim to keep the Service accessible but do not guarantee uninterrupted or error-free availability.",
    },
    {
      title: "8. Termination",
      description:
        "We may suspend or terminate your account for violations of these Terms or non-payment. You may stop using the Service at any time.",
    },
    {
      title: "9. Disclaimer of Warranties",
      description:
        'The Service is provided "as is" without warranties of any kind, express or implied.',
    },
    {
      title: "10. Limitation of Liability",
      description:
        "We are not liable for indirect, incidental, or consequential damages. Our total liability is limited to fees paid in the 12 months prior to a claim.",
    },
    {
      title: "11. Indemnification",
      description:
        "You agree to indemnify and hold us harmless against claims or damages arising from your use of the Service.",
    },
    {
      title: "12. Governing Law & Dispute Resolution",
      description:
        "These Terms are governed by the laws of [Jurisdiction]. Disputes will be resolved exclusively in the courts of [Jurisdiction].",
    },
    {
      title: "13. Changes to Terms",
      description:
        "We may update these Terms from time to time. Continued use of the Service after changes indicates acceptance.",
    },

  ];

  return (
    <div className="relative min-h-screen text-white z-10">
      <TermsSection sections={sections} />
    </div>
  );
};

export default TermsOfService;