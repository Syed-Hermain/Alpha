"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Car = {
  src: string;
  alt: string;
};

export default function InfiniteCarousel({ cars }: { cars: Car[] }) {
  // Clone last and first for infinite loop effect
  const extendedCars = [cars[cars.length - 1], ...cars, cars[0]];

  const [current, setCurrent] = useState(1); // start at first real slide
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionDuration = 500; // ms

  // Slide width in % (100% per slide)
  const slideWidthPercent = 100;

  const handlePrev = () => {
    if (isAnimating) return;
    setCurrent((prev) => prev - 1);
    setIsAnimating(true);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setCurrent((prev) => prev + 1);
    setIsAnimating(true);
  };

  // Jump instantly without animation after transition ends if on cloned slide
  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (current === 0) {
      // Jump to last real slide
      setCurrent(extendedCars.length - 2);
      removeTransition();
    } else if (current === extendedCars.length - 1) {
      // Jump to first real slide
      setCurrent(1);
      removeTransition();
    }
  };

  // Remove transition to jump instantly
  const removeTransition = () => {
    const container = containerRef.current;
    //container.style.transition = "none";
    //container.style.transform = `translateX(-${slideWidthPercent * current}%)`;
    // Force reflow to reset transition
    //container.offsetHeight;
    //container.style.transition = `transform ${transitionDuration}ms ease-in-out`;
  };

  // When current changes and animation allowed, update transform normally
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!isAnimating) {
      container.style.transition = "none";
    } else {
      container.style.transition = `transform ${transitionDuration}ms ease-in-out`;
    }
    container.style.transform = `translateX(-${slideWidthPercent * current}%)`;
  }, [current, isAnimating]);

  return (
    <div className="relative overflow-hidden max-w-3xl mx-auto">
      {/* Slides container */}
      <div
        className="flex"
        style={{ width: `${extendedCars.length * 10}%` }}
        ref={containerRef}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedCars.map((car, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-full relative"
            style={{ width: `${slideWidthPercent}%` }}
          >
            <Image
              src={car.src}
              alt={car.alt}
              className="object-cover h-full w-full"
              draggable={false}
            />

            {(idx === 1 || idx === extendedCars.length - 1) && (
              <button onClick={() => console.log("View 360")} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 justify-center bg-black bg-opacity-70 text-white px-1 rounded flex items-center gap-2">
                <span>Click to view 360</span>
                <Image
                width={15}
                  height={15}
                  src="/three_sixty_view.gif"
                  alt="Loading"
                  className="object-contain"
                />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        aria-label="Previous Slide"
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full"
      >
        &#9664;
      </button>

      {/* Next Button */}
      <button
        aria-label="Next Slide"
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full"
      >
        &#9654;
      </button>
    </div>
  );
}
