'use client';

import { useEffect, useState } from 'react';
import { Copy, Mail, Calendar } from 'lucide-react';

type ContactSectionProps = {
  text?: string;
};

const ContactSection = ({ text = "Contact us" }: ContactSectionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const emailAddress = 'jcasas@simple-ticket.net';
  const calendlyUrl = 'https://calendly.com/jcasasmail';

  const toast = {
    success: (message: string) => alert(message),
    error: (message: string) => alert(message),
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sendEmail = () => {
    const emailUri = `mailto:${emailAddress}?subject=Contact&body=Hi there!`;
    window.open(emailUri, '_blank');
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      toast.success('Email address copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy email');
    }
  };

  const openCalendly = () => {
    window.open(calendlyUrl, '_blank');
  };

  if (isMobile) {
    return (
      <div className="flex justify-center items-center">
        <button
          onClick={openCalendly}
          className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm rounded-lg hover:from-indigo-600 hover:to-purple-700 transition shadow-md"
        >
          {text}
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-xl p-4 flex gap-4 z-10 border border-gray-200">
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md transition-colors"
            >
              <Copy size={25} />
              Copy Email
            </button>
            <button
              onClick={sendEmail}
              className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md transition-colors"
            >
              <Mail size={25} />
              Send Email
            </button>
            <button
              onClick={openCalendly}
              className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md transition-colors"
            >
              <Calendar size={25} />
              Schedule Meeting
            </button>
          </div>
        )}

        <button
          onClick={sendEmail}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition shadow-md"
        >
          {text}
        </button>
      </div>
    </div>
  );
};

export default ContactSection;