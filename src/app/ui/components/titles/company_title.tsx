
// company_title.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModule } from '@/app/core/context/module';

interface CompanyNameProps {
    name?: string;
}

const CompanyName: React.FC<CompanyNameProps> = ({ name: name = 'TICKET' }) => {
    const [nameProp, setModuleProp] = useState(name);
    const [color, setColor] = useState<string>('white'); // state for dynamic color
    const { module, setModule } = useModule();

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

    return (
        <div className="flex items-center p-2 overflow-hidden">
            {/* Apply dynamic color to SIMPLE */}
            <span className="font-bold text-3xl" style={{ color: 'white' }}>         SIMPLE       </span>

            <div className="ml-1 relative inline-block">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={nameProp}
                        className="font-light text-3xl inline-block"
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        style={{ color }} // Apply dynamic color here too
                    >
                        {nameProp}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CompanyName;


