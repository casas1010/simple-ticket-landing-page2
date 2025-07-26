'use client';

import { useEffect, useState } from 'react';
import { Copy, Mail, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';

const ContactSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const emailAddress = 'jcasas@simple-ticket.net';
  const calendlyUrl = 'https://calendly.com/jcasasmail';

  // Detect screen size on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Reset state on mount (avoid stuck hover after back nav)
    setIsHovered(false);

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
          className="px-1 py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
        >
          Contact us
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
        <button
          onClick={sendEmail}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Contact us
        </button>

        {isHovered && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-xl p-4 flex gap-4 z-10">
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
            >
              <Copy size={16} />
              Copy Email
            </button>
            <button
              onClick={sendEmail}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
            >
              <Mail size={16} />
              Send Email
            </button>
            <button
              onClick={openCalendly}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
            >
              <Calendar size={16} />
              Schedule Meeting
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSection;