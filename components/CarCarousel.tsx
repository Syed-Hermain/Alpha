"use client";
import React, { useState, useEffect, useRef } from "react";


const images = [
  { src: "cars1.avif", alt: "Car 1" },
  { src: "cars2.avif", alt: "Car 2" },
  { src: "cars3.avif", alt: "Car 3" },
  { src: "cars4.avif", alt: "Car 4" },
  { src: "cars5.avif", alt: "Car 5" },
];

const intervalTime = 4000; // auto play interval ms

export default function InfiniteCarousel() {
  const [current, setCurrent] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const timeoutRef = useRef(null);

  // Auto play effect
  
  function resetTimeout() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  function goPrev() {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function goNext() {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  function selectIndex(index) {
    setCurrent(index);
  }

  return (
    <div className="relative max-w-4xl mx-auto p-4">
      {/* Carousel container */}
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        {/* Images container */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          
          style={{
            transform: `translateX(-${current * 100}%)`,
            width: `${images.length * 100}%`,
          }}
        >
          {images.map((image, idx) => (
            <section
              key={idx}
              className="flex-shrink-0 w-full relative select-none"
              aria-hidden={current !== idx}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-220 h-120 object-cover"
                draggable={false}
              />
              {/* On first image, show 360° button */}
              {idx === 0 && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  aria-label="360 Degree View"
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-80 transition"
                >
                  {/* Simple 360° SVG icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.364-6.364l-2.828 2.828M7.464 16.536l-2.829 2.828m0-11.314l2.828 2.828M16.536 16.536l2.828 2.828"
                    />
                  </svg>
                  does that exist?
                </button>
              )}
            </section>
          ))}
        </div>

        {/* Prev/Next Buttons */}
        <button
          onClick={goPrev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full z-10 hover:bg-opacity-70 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goNext}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full z-10 hover:bg-opacity-70 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail selector below */}
      <div className="flex justify-center mt-4 space-x-3 select-none">
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => selectIndex(idx)}
            className={`border-4 rounded-lg overflow-hidden transition ${
              idx === current ? "border-black" : "border-transparent"
            }`}
            aria-label={`Select image ${idx + 1}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-20 h-12 object-cover"
              draggable={false}
            />
          </button>
        ))}
      </div>

      {/* Sidebar */}
      <>
        {sidebarOpen && (
          <>
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-30"
              aria-hidden="true"
            />
            <aside className="fixed right-0 top-0 w-80 h-full bg-white p-6 shadow-lg z-40 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">360° View</h2>
              <p>
                This is the interactive 360° view sidebar content. You can embed your 360° viewer inside this panel.
              </p>
              <button
                aria-label="Close sidebar"
                onClick={() => setSidebarOpen(false)}
                className="mt-6 bg-red-600 text-white py-2 rounded w-full hover:bg-red-700 transition"
              >
                Close
              </button>
            </aside>
          </>
        )}
      </>
    </div>
  );
}
