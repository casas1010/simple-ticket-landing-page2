import React, { useEffect, useState } from 'react';

// Define types for Card props
interface CardProps {
  title: string;
  items: string[];
  references: string[];
  logos?: string[]; // multiple logos
  index: number; // for staggered animations
}

// Card Component
const Card: React.FC<CardProps> = ({ title, items, logos, index, references }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`relative group bg-white text-gray-800 rounded-2xl shadow-md p-4 w-full md:w-1/3 h-[400px] flex flex-col items-center justify-between overflow-hidden transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {/* Card Content */}
      <div className="flex flex-col items-center w-full flex-1 overflow-hidden">
        {logos && (
          <div className="flex gap-3 mb-3 justify-center items-center">
            {logos.map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt={`${title} logo ${idx + 1}`}
                className={`h-10 object-contain transition-all duration-500 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: isVisible ? `${300 + idx * 100}ms` : '0ms',
                }}
              />
            ))}
          </div>
        )}

        <h2
          className={`text-base font-semibold mb-2 text-center transition-all duration-500 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{
            transitionDelay: isVisible ? `${logos ? 500 : 300}ms` : '0ms',
          }}
        >
          {title}
        </h2>

        <ul className="space-y-2 text-left w-full text-sm overflow-auto">
          {items.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-start gap-1 transition-all duration-500 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{
                transitionDelay: isVisible
                  ? `${(logos ? 600 : 400) + idx * 150}ms`
                  : '0ms',
              }}
            >
              <span className="text-base">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gray-900/90 text-white flex flex-col items-center justify-center gap-3 px-3 transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0">
        <h3 className="text-base font-semibold">References</h3>
        <ul className="space-y-1 text-center text-sm">
          {references.map((ref, idx) => (
            <li key={idx}>
              <a
                href={ref}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-300 break-all"
              >
                {ref}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Slide 1 Content
const Slide1Content: React.FC = () => {
  const data: CardProps[] = [
    {
      title: 'Apple Pay / Apple Card',
      logos: [
        'https://w7.pngwing.com/pngs/736/942/png-transparent-apple-logo-company-amar-trademark-heart-logo.png',
        'https://w7.pngwing.com/pngs/879/509/png-transparent-product-design-goldman-sachs-brand-logo-chief-executive-design-blue-text-logo-thumbnail.png',
      ],
      items: [
        'Apple partnered with Goldman Sachs to launch Apple Card',
        'Built a seamless digital-first banking experience',
        'Shows the power of combining tech + finance',
      ],
      references: ['https://youtu.be/ugjhVHcYbMU?si=cAx5QB3x7ZvDiODm&t=23'],
      index: 0,
    },
    {
      title: 'Chase + TouchBistro',
      logos: [
        'https://w7.pngwing.com/pngs/51/911/png-transparent-logo-chase-bank-jpmorgan-chase-boulder-bank-blue-angle-text.png',
        'https://softwareconnect.com/images/touchbistro-360279?w=1024&h=512',
      ],
      items: [
        'Chase partnered with restaurant POS platform TouchBistro',
        'Integrated payments + banking for small businesses',
        'Demonstrates banks gain reach by embedding into software',
      ],
      references: [
        'https://www.chase.com/business/support/payments/integrations/touchbistro',
      ],
      index: 1,
    },
    {
      title: 'Evolv + United Bankers Bank',
      logos: [
        'https://lirp.cdn-website.com/5be199f3/dms3rep/multi/opt/evolv+logo+1-1920w.png',
        'https://www.ubb.bank/media/reznp2x0/ubb-logo.jpg',
      ],
      items: [
        'Evolv provides digital banking software to UBB',
        'Partnership enables community banks to offer modern tech',
        'Proof that even regional players invest in tech alliances',
      ],
      references: [
        'https://www.poweredbyevolv.com/evolv-partners-with-united-bankers-bank-to-enhance-merchant-services',
      ],
      index: 2,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl h-[400px] justify-center items-center mx-auto">
      {data.map((card, idx) => (
        <Card
          key={idx}
          title={card.title}
          items={card.items}
          logos={card.logos}
          index={idx}
          references={card.references}
        />
      ))}
    </div>
  );
};

export default Slide1Content;