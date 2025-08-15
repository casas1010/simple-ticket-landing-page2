import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Variants } from 'framer-motion';
import { useModule } from '@/app/core/context/module';
import { FaLinkedin, FaYoutube } from 'react-icons/fa';
const fadeUpVariant: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

const Footer = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '-50px' });
    const { module, setModule } = useModule();

    return (
        <footer className="w-full bg-transparent relative z-10" ref={ref}>
            {/* Mountain wave design */}
            <div className="relative overflow-hidden">
                {/* First mountain layer */}
                <div className="wave-container">
                    <svg
                        viewBox="0 0 4800 120"
                        className="wave-svg fill-gray-400 opacity-80"
                        preserveAspectRatio="none"
                    >
                        <path d="M0,60 C300,10 600,110 900,60 C1200,10 1500,110 1800,60 C2100,10 2400,110 2700,60 C3000,10 3300,110 3600,60 C3900,10 4200,110 4500,60 C4700,20 4800,60 4800,60 L4800,120 L0,120 Z" />
                    </svg>
                </div>

                {/* Second mountain layer */}
                <div className="wave-container absolute top-3">
                    <svg
                        viewBox="0 0 4800 120"
                        className="wave-svg-reverse fill-gray-500 opacity-60"
                        preserveAspectRatio="none"
                    >
                        <path d="M0,80 C400,30 800,130 1200,80 C1600,30 2000,130 2400,80 C2800,30 3200,130 3600,80 C4000,30 4400,130 4800,80 L4800,120 L0,120 Z" />
                    </svg>
                </div>

                {/* Third mountain layer */}
                <div className="wave-container absolute top-6">
                    <svg
                        viewBox="0 0 4800 120"
                        className="wave-svg-slow fill-purple-400 opacity-70"
                        preserveAspectRatio="none"
                    >
                        <path d="M0,100 C500,40 1000,160 1500,100 C2000,40 2500,160 3000,100 C3500,40 4000,160 4500,100 C4700,60 4800,100 4800,100 L4800,120 L0,120 Z" />
                    </svg>
                </div>
            </div>

            {/* Main footer content */}
            <div className="bg-black text-white py-16 px-6 relative z-10">
                <div className="max-w-6xl mx-auto text-center space-y-6">
                    {/* Brand section */}
                    <motion.div
                        variants={fadeUpVariant}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-2xl">
                            SIMPLE TICKET
                        </span>
                    </motion.div>

                    <motion.p
                        variants={fadeUpVariant}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        transition={{ delay: 0.2 }}
                        className="text-gray-300 text-lg tracking-wide"
                    >
                        TOGETHER, LET'S SIMPLIFY CUSTOMER SUPPORT.
                    </motion.p>

                    {/* Navigation links */}
                    <motion.nav
                        variants={fadeUpVariant}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-8 md:gap-12"
                    >
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                const url = new URL(window.location.href);
                                url.searchParams.set('mode', 'about-us');
                                window.history.pushState({}, '', url);
                                window.scrollTo({ top: 0, behavior: 'smooth' });

                                setTimeout(() => {
                                    setModule(null);
                                }, 600);
                            }}
                            className="text-gray-300 hover:text-white transition-colors duration-200 text-lg font-medium"
                        >
                            ABOUT US
                        </a>
                    </motion.nav>

                    {/* Copyright */}
                    <motion.p
                        variants={fadeUpVariant}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        transition={{ delay: 0.6 }}
                        className="text-sm text-gray-500 mt-8"
                    >
                        © {new Date().getFullYear()} Simple Ticket. All rights reserved.
                    </motion.p>



                    {/* Social media */}
                    <motion.div
                        variants={fadeUpVariant}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center gap-4 mt-4"
                    >
                        <a
                            href="https://www.linkedin.com/company/simple-ticket/?viewAsMember=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-blue-500 transition-colors duration-200 text-2xl"
                        >
                            <FaLinkedin />
                        </a>

                        <a
                            href="https://www.youtube.com/@simple_ticket/videos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-blue-500 transition-colors duration-200 text-2xl"
                        >
                            <FaYoutube />
                        </a>
                    </motion.div>





                </div>
            </div>

            <style jsx>{`
                .wave-container {
                    width: 100%;
                    height: 80px;
                }

                .wave-svg,
                .wave-svg-reverse,
                .wave-svg-slow {
                    width: 300%;
                    height: 100%;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                }

                .wave-svg {
                    animation: wave-move 40s infinite;
                }

                .wave-svg-reverse {
                    animation: wave-move-reverse 55s infinite;
                }

                .wave-svg-slow {
                    animation: wave-move 70s infinite;
                }

                @keyframes wave-move {
                    0% {
                        transform: translateX(0);
                    }
                    50% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                @keyframes wave-move-reverse {
                    0% {
                        transform: translateX(-50%);
                    }
                    50% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;