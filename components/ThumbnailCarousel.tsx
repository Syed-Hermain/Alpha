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
};

function ThumbnailCarousel({ cars, current, setCurrent }: ThumbnailCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const baseSlideWidth = 243; // 227px slide width + ~16px margin (mx-2 is 8px each side)

  // Measure container width and update slidesToShow accordingly
  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
        const count = Math.floor(width / baseSlideWidth);
        setSlidesToShow(count > 0 ? count : 1);
      }
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const maxIndex = Math.max(0, cars.length - slidesToShow);

  // Keep currentIndex in sync with selected slide ensuring it stays visible
  useEffect(() => {
    let newIndex = currentIndex;

    if (current < currentIndex) {
      newIndex = current;
    } else if (current >= currentIndex + slidesToShow) {
      newIndex = current - slidesToShow + 1;
    }

    newIndex = Math.max(0, Math.min(newIndex, maxIndex));

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  }, [current]);

  const translateX = currentIndex * baseSlideWidth;

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };


  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full max-w-[800px] mx-auto"
      style={{ height: "140px" }} // Adjust height based on image aspect ratio
    >
      {/* Slides container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${translateX}px)` }}
      >
        {cars.map((car, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 w-[227px] mx-2 rounded overflow-hidden aspect-[2/1] ${
              idx === current ? "border-4 border-black" : "border border-transparent"
            }`}
            onClick={() => setCurrent(idx)}
          >
            <Image
              src={car.src}
              alt={car.alt}
              width={227}
              height={114} // Adjusted for 2:1 ratio
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
