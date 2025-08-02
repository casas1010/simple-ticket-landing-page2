




// components/AboutUsHero.jsx
import React from 'react';

const AboutUsHero = () => {
  return (
    <div className="hero-container">
      <div className="content">
        <p className="tagline">SIMPLE SOLUTIONS. POWERFUL RESULTS.</p>
        <h1 className="main-title">About Us</h1>
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span className="scroll-text">Scroll</span>
        </div>
      </div>

      <style jsx>{`
        .hero-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #3730a3 50%, #7c3aed 75%, #ec4899 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .content {
          text-align: center;
          z-index: 2;
          max-width: 800px;
          padding: 0 20px;
        }

        .tagline {
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 30px;
          text-transform: uppercase;
        }

        .main-title {
          font-size: clamp(4rem, 12vw, 8rem);
          font-weight: 700;
          background: linear-gradient(90deg, #a855f7, #ec4899, #f97316);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          line-height: 1.1;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.5));
          animation: scrollPulse 2s ease-in-out infinite;
        }

        .scroll-text {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @keyframes scrollPulse {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(5px);
          }
        }

        @media (max-width: 768px) {
          .tagline {
            font-size: 12px;
            letter-spacing: 2px;
          }
        }
      `}</style>
    </div>
  );
};


export default AboutUsHero;