'use client';

import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useModule } from './core/context/module';

import { PLATFORM_FEATURES } from './core/data/features';
import { MODULES } from './core/data/modules';
import StarBackground from './ui/components/backgrounds/star';
import Header from './ui/components/header/header';
import { ModuleFeatures } from './ui/components/lists/modules';
import ModulesOrbit from './ui/components/modules_orbit/modules_orbit';
import PlatformFeatures from './ui/components/platform_features';
import TitleAndIcon from './ui/components/title_and_icon';
import ContactUs from './ui/components/contact_us';
import RawPage from './ui/pages/raw';
import ModulePage from './ui/pages/module';
import AboutUs from './ui/pages/about_us';
import Footer from './ui/components/footer';
import { useEffect } from 'react';

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
      return <RawPage />;
    }

    if (mode == 'about-us') {
      return <AboutUs key="about" />;
    }

    return <ModulePage mode={mode} key={mode} />;
  };

  return (
    <div className="bg-[#35495f] relative w-full overflow-hidden">
      <StarBackground />
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

      <Footer />
    </div>
  );
}