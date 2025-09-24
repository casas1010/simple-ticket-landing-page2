import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slide2Content from "../components/bank_partnership/slide2";
import Slide1Content from "../components/bank_partnership/slide1";
import Slide3Content from "../components/bank_partnership/slide3";

// Define types for Slide props
interface SlideProps {
  title: string;
  content: React.ReactNode;
}

// Main Presentation Component
const BankPartnershipPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: SlideProps[] = [
    {
      title: "Lanscape of Bank Partnerships",
      content: <Slide1Content />
    },
    {
      title: "Partnership Benefits",
      content: <Slide2Content />
    },
    {
      title: "Partnership Benefits",
      content: <Slide3Content />
    },
    // Add more slides here as needed
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="text-white flex flex-col items-center py-8 px-6">
      {/* Header with slide title */}
      {/* <h1 className="text-3xl font-bold mb-10">{slides[currentSlide].title}</h1> */}
      
      {/* Slide content fixed height */}
      <div 
        className="flex items-center justify-center w-full overflow-hidden"
        style={{ height: "500px" }}
      >
        {/* <div className="w-full h-full overflow-auto"> */}
          {slides[currentSlide].content}
        {/* </div> */}
      </div>
      
      {/* Navigation controls */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={prevSlide}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          disabled={slides.length <= 1}
        >
          <ChevronLeft size={20} />
          Previous
        </button>
        
        {/* Slide indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextSlide}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          disabled={slides.length <= 1}
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Slide counter */}
      <div className="mt-4 text-sm text-gray-300">
        {currentSlide + 1} of {slides.length}
      </div>
    </div>
  );
};

export default BankPartnershipPage;