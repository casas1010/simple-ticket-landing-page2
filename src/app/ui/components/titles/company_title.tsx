// company_title.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModule } from '@/app/core/context/module';
import { useIsMobile } from '@/app/core/context/mobile_context';

interface CompanyNameProps {
    name?: string;
}

const CompanyName: React.FC<CompanyNameProps> = ({ name: name = 'TICKET' }) => {
    const [nameProp, setModuleProp] = useState(name);
    const [color, setColor] = useState<string>('white');
    const { module } = useModule();
    const isMobile = useIsMobile();

    // Update the color state whenever module.gradient changes
    useEffect(() => {
        setColor(module?.gradient || 'white');
    }, [module?.gradient]);

    useEffect(() => {
        setModuleProp(name);
    }, [name]);

    const variants = {
        initial: { x: 50, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -50, opacity: 0 },
    };

    const hasSpace = nameProp.includes(' ');

    // console.log("isMobile: "+isMobile)

    return (
        <div className={`p-2 overflow-hidden ${hasSpace&& isMobile ? 'flex flex-col items-start' : 'flex items-center'}`}>
            {/* SIMPLE */}
            <span className="font-bold text-3xl" style={{ color: 'white' }}>SIMPLE</span>

            <div className={`${hasSpace && isMobile ? 'mt-1' : 'ml-1'} relative inline-block`}>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={nameProp}
                        className="font-light text-3xl inline-block"
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        style={{ color }}
                    >
                        {nameProp}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CompanyName;