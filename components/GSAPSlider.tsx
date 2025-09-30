"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const colorArray = [
  "#683A5E",
  "#262626",
  "#426F42",
  "#8B814C",
  "#36648B",
  "#36648B",
];

const slideTitles = [
  "1. Controlling the slider",
  "2. Powered by GSAP",
  "3. Bottom dot animation",
  "4. Random dog",
  "5. Sliders are useful",
  "6. Follow me on Twitter",
];

export default function GSAPFullScreenSlider() {
  const containerRef = useRef(null);
  const panelWrapRef = useRef(null);
  const slidesRef = useRef([]);
  const dotsRef = useRef([]);
  const [dots, setDots] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const iwRef = useRef(window.innerWidth);
  const dragInstance = useRef(null);
  const dotAnim = useRef(null);
  const titleAnim = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const panelWrap = panelWrapRef.current;
    const slides = slidesRef.current;

    // Set slides background colors
    slides.forEach((slide, i) => {
      gsap.set(slide, { backgroundColor: colorArray[i] });
    });

    // Create dots
    const newDots = slides.map((_, i) => i);
    setDots(newDots);

    // Position elements horizontally with proper width
    function sizeIt() {
      iwRef.current = window.innerWidth;
      gsap.set(panelWrap, { width: slides.length * iwRef.current });
      slides.forEach((slide) => {
        gsap.set(slide, { width: iwRef.current });
      });
      gsap.set(container, { x: -activeSlide * iwRef.current });
      if (dragInstance.current) {
        dragInstance.current.vars.snap = newDots.map((i) => -i * iwRef.current);
      }
    }

    sizeIt();

    // Setup Draggable
    dragInstance.current = Draggable.create(container, {
      type: "x",
      edgeResistance: 1,
      snap: newDots.map((i) => -i * iwRef.current),
      inertia: true,
      bounds: container.parentNode,
      onDrag: updateDotAnim,
      onThrowUpdate: updateDotAnim,
      onDragEnd: onSlideChange,
      allowNativeTouchScrolling: false,
      zIndexBoost: false,
    })[0];

    window.addEventListener("resize", () => {
      sizeIt();
    });

    // GSAP dot and title animation
    dotAnim.current = gsap.timeline({ paused: true });
    dotAnim.current.to(
      ".dot",
      {
        stagger: { each: 1, yoyo: true, repeat: 1 },
        scale: 2.1,
        rotation: 0.1,
        ease: "none",
      },
      0.5
    );

    titleAnim.current = gsap.to(".title", {
      y: -(slides.length * 30),
      rotation: 0.01,
      ease: "none",
      paused: true,
    });

    return () => {
      if (dragInstance.current) {
        dragInstance.current.kill();
      }
      window.removeEventListener("resize", sizeIt);
    };
  }, []);

  // Animate dots and titles while dragging
  function updateDotAnim() {
    if (!dragInstance.current) return;
    const x = gsap.getProperty(containerRef.current, "x");
    const t = Math.abs(x) / iwRef.current + 1;
    dotAnim.current.time(t);
    titleAnim.current.progress(t / (dots.length + 1));
  }

  // On drag end or dot/arrow click, snap to nearest slide
  function onSlideChange() {
    if (!dragInstance.current) return;
    const x = dragInstance.current.endX;
    const slideIndex = Math.round(Math.abs(x) / iwRef.current);
    if (slideIndex !== activeSlide) {
      setActiveSlide(slideIndex);
    }
    gsap.to(containerRef.current, {
      x: -slideIndex * iwRef.current,
      duration: 0.5,
      ease: "power3.inOut",
      onUpdate: updateDotAnim,
    });
  }

  // When clicking nav dots or arrows
  function slideTo(index) {
    if (!dragInstance.current) return;
    setActiveSlide(index);
    gsap.to(containerRef.current, {
      x: -index * iwRef.current,
      duration: 0.5,
      ease: "power3.inOut",
      onUpdate: updateDotAnim,
      onComplete: () => {
        dragInstance.current.vars.endX = -index * iwRef.current;
        dragInstance.current.update();
        dragInstance.current.endX = -index * iwRef.current;
        dragInstance.current.update();
      },
    });
  }

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden bg-black" id="masterWrap">
        {/* arrows */}
        <svg
          id="leftArrow"
          onClick={() => slideTo(activeSlide === 0 ? dots.length - 1 : activeSlide - 1)}
          className="arrow absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-75 hover:opacity-100 w-10 h-10 stroke-white stroke-2 fill-none"
          viewBox="0 0 100 100"
        >
          <g strokeLinejoin="round" strokeLinecap="round">
            <circle r="46" cx="50" cy="50" />
            <polyline points="60 25, 30 50, 60 75" />
          </g>
        </svg>

        <svg
          id="rightArrow"
          onClick={() => slideTo(activeSlide === dots.length - 1 ? 0 : activeSlide + 1)}
          className="arrow absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-75 hover:opacity-100 w-10 h-10 stroke-white stroke-2 fill-none"
          viewBox="0 0 100 100"
        >
          <g strokeLinejoin="round" strokeLinecap="round">
            <circle r="46" cx="50" cy="50" />
            <polyline points="40 25, 70 50, 40 75" />
          </g>
        </svg>

        {/* slides container */}
        <div
          id="panelWrap"
          ref={panelWrapRef}
          className="flex h-full"
          style={{ width: `${dots.length * 100}vw` }}
        >
          {[...Array(dots.length)].map((_, i) => (
            <section
              key={i}
              ref={(el) => (slidesRef.current[i] = el)}
              className="w-screen flex flex-col items-center justify-center"
            >
              <h3 className="mb-4 text-white text-2xl font-bold">{slideTitles[i]}</h3>
              <p className="max-w-md text-center text-white font-light">
                {/* Add slide content as needed */}
                This is slide number {i + 1}.
              </p>
            </section>
          ))}
        </div>

        {/* nav dots */}
        <div className="dots absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50">
          {dots.map((_, i) => (
            <div
              key={i}
              className={`dot w-3 h-3 rounded-full cursor-pointer transition-transform ${
                i === activeSlide ? "scale-150 bg-white" : "bg-gray-400"
              }`}
              onClick={() => slideTo(i)}
              title={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* rotating titles (for demo as in original) */}
        <div className="titleWrap absolute bottom-20 left-1/2 transform -translate-x-1/2 overflow-hidden h-7 w-48 pointer-events-none">
          {slideTitles.map((title, i) => (
            <div key={i} className="title text-white text-center text-sm leading-7">
              {title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
