"use client";
import Image from "next/image";
import { useState, useEffect } from "react";


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
    setCurrent,
    visibleCount = 5,
}: ThumbnailCarouselProps) {
    // Finite carousel showing multiple thumbnails,
    // current is zero-based index for original cars array
    const [startIndex, setStartIndex] = useState(0);
    const total = cars.length;

    // Make sure startIndex keeps the current thumbnail visible
    useEffect(() => {
        if (current < startIndex) {
            setStartIndex(current);
        } else if (current >= startIndex + visibleCount) {
            setStartIndex(current - visibleCount + 1);
        }
    }, [current, startIndex, visibleCount]);

    const handlePrev = () => {
        if (startIndex > 0) setStartIndex(startIndex - 1);
    };

    const handleNext = () => {
        if (startIndex < total - visibleCount) setStartIndex(startIndex + 1);
    };

    return (
        <div className="flex items-center max-w-3xl mx-auto mt-4 relative">
            <div className="flex overflow-hidden space-x-2">
                {cars
                    .slice(startIndex, startIndex + visibleCount)
                    .map((car, idx) => {
                        const realIndex = startIndex + idx;
                        const isActive = realIndex === current;
                        return (
                            <div
                                key={realIndex}
                                onClick={() => setCurrent(realIndex)}
                                className={`cursor-pointer border-1 ${isActive ? "border-black" : "border-transparent"
                                    } rounded-md overflow-hidden flex-shrink-0 w-100 h-12`}
                            >
                                <Image
                                    src={car.src}
                                    alt={car.alt}
                                    width={80}
                                    height={48}
                                    objectFit="cover"
                                    draggable={false}
                                />
                            </div>
                        );
                    })}
            </div>
            <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full ${startIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-900"
                    }`}
            >
                &#9664;
            </button>
            <button
                onClick={handleNext}
                disabled={startIndex >= total - visibleCount}
                className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full ${startIndex >= total - visibleCount
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-gray-900"
                    }`}
            >
                &#9654;
            </button>
        </div>
    );
}

export default ThumbnailCarousel;