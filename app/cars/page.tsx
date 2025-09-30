"use client";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import React, { useState } from "react";



export default function SpinnyCarPage() {
  

  const cars = [
    { src: "cars1.avif", alt: "Car 1" },
    { src: "cars2.avif", alt: "Car 2" },
    { src: "cars3.avif", alt: "Car 3" },
    { src: "cars4.avif", alt: "Car 4" },
    { src: "cars5.avif", alt: "Car 5" },
    { src: "cars6.avif", alt: "Car 6" },
    { src: "cars7.avif", alt: "Car 7" },
    { src: "cars8.avif", alt: "Car 8" }
  ];


  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6">GSAP Car Image Carousel</h1>

      <InfiniteCarousel cars={cars} />


      <div className="mt-10">
        About the info of this thang. Now let's consider the view of this.
      </div>
    </div>
  );
}
