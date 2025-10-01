"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";


type Car = {
    src: string;
    alt: string;
};

type ThumbnailCarouselProps = {
    cars: Car[];
    current: number;
    setCurrent: (index: number) => void;
    visibleCount?: number;
};

function ThumbnailCarousel({
    cars,
    current,
    setCurrent
}: ThumbnailCarouselProps) {
    // Finite carousel showing multiple thumbnails,
    // current is zero-based index for original cars array
    const slidesToShow =5;
    const totalSlides = cars.length;
    const maxIndex = totalSlides - slidesToShow;
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideWidth =220;
const containerRef = useRef<HTMLDivElement>(null);
    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    }

    const handleNext = () =>{
        if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1); 
    }

    return (
        <div className="w-full mx-auto relative overflow-hidden">
      {/* Slides container */}
      <div
        ref={containerRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * slideWidth}px)` }}
      >
        {cars.map((car, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[200px] mx-2 rounded overflow-hidden"
            onClick={() => setCurrent(idx+1)}
          >
            <Image
              src={car.src}
              alt={car.alt}
              width={200}
              height={120}
              className="object-cover w-full h-full"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full transition disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Previous Slide"
      >
        &#9664;
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentIndex === maxIndex}
        className={`absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full transition disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Next Slide"
      >
        &#9654;
      </button>
    </div>
    )

}

export default ThumbnailCarousel;