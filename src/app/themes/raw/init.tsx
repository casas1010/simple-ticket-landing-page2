import { useIsMobile } from '@/app/context/mobile_context';
import { AnimatePresence, motion } from 'framer-motion';
import ModulesOrbit from '@/app/ui/modules_orbit/modules_orbit';
import { Module } from '@/app/types/module';
type Props = {
  mainText: string;
  highlight: string;
  subText: string;
  setModule: (m: Module | null) => void;
  component?: React.ReactNode; // NEW PROP
};

export default function MainContentSection(props: Props) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileContent {...props} /> : <DesktopContent {...props} />;
}

function MobileContent({ mainText, highlight, subText, setModule, component: uiComponent }: Props) {
  return (
    <div className="relative z-10 flex flex-col items-center px-8 pt-10 text-left max-w-7xl mx-auto gap-10">
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        {uiComponent}
      </div>
      <div className="relative z-10 flex-1 max-w-2xl pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${mainText}-${highlight}-${subText}`}
            initial={{ rotateY: 15, rotateX: 5, opacity: 0, transformPerspective: 1000 }}
            animate={{ rotateY: 0, rotateX: 0, opacity: 1, transformPerspective: 1000 }}
            exit={{ rotateY: -10, rotateX: -3, opacity: 0, transformPerspective: 1000 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              {mainText}
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {highlight}
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {subText}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function DesktopContent({ mainText, highlight, subText, setModule, component: orbitComponent }: Props) {
  return (
    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start px-8 pt-10 text-left max-w-7xl mx-auto gap-10">
      <div className="relative z-10 flex-1 max-w-2xl pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${mainText}-${highlight}-${subText}`}
            initial={{ rotateY: 15, rotateX: 5, opacity: 0, transformPerspective: 1000 }}
            animate={{ rotateY: 0, rotateX: 0, opacity: 1, transformPerspective: 1000 }}
            exit={{ rotateY: -10, rotateX: -3, opacity: 0, transformPerspective: 1000 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {mainText}
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {highlight}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              {subText}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative z-10 flex-1 w-full max-w-xl">
        {orbitComponent}
      </div>
    </div>
  );
}