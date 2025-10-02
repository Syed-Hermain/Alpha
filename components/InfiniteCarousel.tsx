"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ThumbnailCarousel from "./ThumbnailCarousel";
import Car360Viewer from "./Car360Viewer";

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
  const [showOverlay, setShowOverlay] = React.useState(false);


  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShowOverlay(false);
      setClosing(false);
    }, 400); 
  };


  
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
      
    } else if (current === extendedCars.length - 1) {
      // Jump to first real slide
      setCurrent(1);
      
    }
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
    <>
    <div className="w-[800px] h-[400px]">
    <div className="relative overflow-hidden rounded-md bg-gray-100 flex items-center">
      {/* Slides container */}
      <div
        className="flex"
        style={{ width: `${extendedCars.length * 100}%` }}
        ref={containerRef}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedCars.map((car, idx) => (
          <div
            key={idx}
            className="relative flex-shrink-0 w-full h-full"
            style={{ width: `${slideWidthPercent}%` }}
          >
            <Image
              src={car.src}
              alt={car.alt}
              width={800}
              height={400}
              className="object-contain w-full h-full"
              draggable={false}
            />

            {(idx === 1 || idx === extendedCars.length - 1) && (
              <button onClick={() => setShowOverlay(true)} className="absolute bottom-20 left-1/2 transform -translate-x-1/2 justify-center bg-gray-500/40 text-white px-2 py-1 rounded flex items-center gap-3">
                <span className="text-xs sm:text-sm">Click to view</span>
                <Image
                  src="/three_sixty_view.gif"
                  alt="Loading"
                  className="md:scale-350"
                  width={15}
                  height={15}
                  draggable={false}
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
    <div className="mt-4">
    <ThumbnailCarousel cars={cars} current={current} setCurrent={setCurrent} />
    </div>
    </div>

    { showOverlay && (
      <div
          className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center`}
        >
          <div
            className={`bg-white rounded-lg shadow-lg w-4/5 max-w-xl h-3/4 relative overflow-hidden ${
              closing ? "slide-up" : "slide-down"
            }`}
            style={{ animationFillMode: "forwards" }}
          >
            {/* Close button top-left */}
            <button
              onClick={handleClose}
              className="absolute top-4 left-4 text-black p-2 rounded-full hover:bg-gray-200 transition"
              aria-label="Close overlay"
            >
              &#8592; {/* left arrow */}
            </button>

            {/* Centered content */}
            <div className="h-full flex justify-center items-center">
              <Car360Viewer />
            </div>
          </div>
        </div>
    )}
    </>
  );
}
