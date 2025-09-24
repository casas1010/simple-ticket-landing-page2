'use client';

import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useModule } from './core/context/module';


import { MODULES } from './core/data/modules';
import StarBackground from './ui/components/backgrounds/star';
import Header from './ui/components/header/header';

import LandingPage from './ui/pages/landing';
import ModulePage from './ui/pages/module';
import AboutUs from './ui/pages/about_us';
import Footer from './ui/components/footer';
import { useEffect } from 'react';
import ContactUs from './ui/components/contact_us';
import TermsOfService from './ui/pages/terms_of_service';
import PrivacyPolicy from './ui/pages/privacy_policy';
import BankPartnershipPage from './ui/pages/bank_pitch';


export default function MainPageClient() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const { module, setModule } = useModule();


  useEffect(() => {
    if (mode == null) return;
    var filtered = MODULES.filter((r) => r.mode == mode);
    if (filtered.length == 0) return;
    setModule(filtered[0]);

  }, []);


  const renderUi = () => {
    if (mode == null) {
      return <LandingPage />;
    }

    if (mode == 'about-us') {
      return <AboutUs key="about" />;
    }

    if (mode == 'terms-of-service') {
      return <TermsOfService key="terms-of-service" />;
    }

    if (mode == 'privacy-policy') {
      return <PrivacyPolicy key="privacy" />
    }

    if (mode == 'bank') {
      return <BankPartnershipPage key="bank" />
    }

    return <ModulePage mode={mode} key={mode} />;
  };



return (
  <div className="bg-[#35495f] relative w-full overflow-hidden">
    <StarBackground />
    <div className="relative z-1">
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={mode || 'raw'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {renderUi()}
        </motion.div>
      </AnimatePresence>
      <ContactUs />
      <Footer />
    </div>
  </div>
);
}