"use client";

import { useState, useRef } from "react";

const Car360Viewer = () => {
  const totalImages = 60;
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragStartX = useRef(null);

  const onDragStart = (e) => {
    dragStartX.current = e.clientX || e.touches[0].clientX;
  };

  const onDragMove = (e) => {
    if (dragStartX.current === null) return;
    const currentX = e.clientX || e.touches[0].clientX;
    const diff = currentX - dragStartX.current;

    if (Math.abs(diff) > 10) { // threshold to avoid too sensitive sliding
      if (diff > 0) {
        setCurrentIndex((i) => (i === 0 ? totalImages - 1 : i - 1));
      } else {
        setCurrentIndex((i) => (i === totalImages - 1 ? 0 : i + 1));
      }
      dragStartX.current = currentX;
    }
  };

  const onDragEnd = () => {
    dragStartX.current = null;
  };

  return (
    <div
      className="w-full max-w-md mx-auto select-none"
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      onMouseMove={onDragMove}
      onTouchMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onTouchEnd={onDragEnd}
    >
      <img
        src={`car_images/car_${currentIndex + 1}.png`}
        alt={`Car view ${currentIndex + 1}`}
        className="w-full rounded"
        draggable={false}
      />
    </div>
  );
};

export default Car360Viewer;
