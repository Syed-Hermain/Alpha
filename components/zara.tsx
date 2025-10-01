"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Car {
  src: string;
  alt: string;
}

interface ThumbnailCarouselProps {
  cars: Car[];
  current: number;
  setCurrent: (index: number) => void;
}

function ThumbnailCarousel({ cars, current, setCurrent }: ThumbnailCarouselProps) {
  const slidesToShow = 6; // Intended visible slides count
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Measure slide width and container width dynamically
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        // Measure container width
        const containerRect = containerRef.current.getBoundingClientRect();
        setContainerWidth(containerRect.width);

        // Measure a single slide width (including margins)
        const slideElement = containerRef.current.querySelector("div > div");
        if (slideElement) {
          const slideRect = slideElement.getBoundingClientRect();
          setSlideWidth(slideRect.width);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup
    return () => resizeObserver.disconnect();
  }, [cars.length]); // Re-run if number of slides changes

  const totalSlides = cars.length;
  const maxTranslateX = Math.max(0, slideWidth * totalSlides - containerWidth);
  const maxIndex = Math.max(0, totalSlides - Math.floor(containerWidth / slideWidth));

  // Clamp currentIndex within bounds
  useEffect(() => {
    const clampedIndex = Math.min(Math.max(currentIndex, 0), maxIndex);
    if (clampedIndex !== currentIndex) {
      setCurrentIndex(clampedIndex);
    }
  }, [currentIndex, maxIndex]);

  // Synchronize currentIndex with `current` prop, keeping visible slide in viewport
  useEffect(() => {
    if (current < currentIndex) {
      setCurrentIndex(current);
    } else if (current >= currentIndex + slidesToShow) {
      setCurrentIndex(current - slidesToShow + 1);
    }
  }, [current, currentIndex, slidesToShow]);

  const translateX = Math.min(currentIndex * slideWidth, maxTranslateX);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <div className="w-full mx-auto relative overflow-hidden">
      {/* Slides container */}
      <div
        ref={containerRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${translateX}px)` }}
      >
        {cars.map((car, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 w-[227px] aspect-[2/1] mx-2 rounded overflow-hidden ${
              idx === current ? "border-4 border-black" : "border border-transparent"
            }`}
            onClick={() => setCurrent(idx)}
          >
            <Image
              src={car.src}
              alt={car.alt}
              width={200}
              height={120}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300 cursor-pointer"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full transition disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous Slide"
      >
        &#9664;
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentIndex === maxIndex}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full transition disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next Slide"
      >
        &#9654;
      </button>
    </div>
  );
}

export default ThumbnailCarousel;
