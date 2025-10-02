"use client"
import React, { useEffect, useState } from "react";
import { FaHeart, FaFacebookF } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const sliderMessages: string[] = [
  "Lowest price ever",
  "GST Saving & Navratri Offers included",
];

const SpinnyCarCard: React.FC = () => {
  const [sliderIdx, setSliderIdx] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSliderIdx((prev) => (prev + 1) % sliderMessages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-md mx-auto rounded-2xl border bg-white shadow p-4 font-sans">
      {/* Title and Heart */}
      <div className="flex justify-between items-start mb-1">
        <span className="text-lg font-bold text-purple-900">
          2022 Mahindra Thar LX Hard Top Diesel AT 4WD
        </span>
        <div className="flex flex-col items-center">
          <FaHeart className="text-lg text-purple-900" />
          <span className="text-xs text-gray-400">4 people<br />shortlisted</span>
        </div>
      </div>
      {/* Info Line */}
      <div className="flex gap-2 text-gray-800 text-base">
        <span>38K km</span>
        <span>·</span>
        <span>Diesel</span>
        <span>·</span>
        <span>Automatic</span>
      </div>
      {/* Home Test Drive */}
      <div className="flex items-center gap-2 text-gray-600 mt-1">
        <span role="img" aria-label="home" className="text-lg">🏠</span>
        <span>Home Test Drive: Available</span>
      </div>
      {/* Location */}
      <div className="flex items-center gap-2 text-gray-600 mt-1">
        <span role="img" aria-label="location" className="text-lg">📍</span>
        <span>Spinny Car Hub, Trillium Avenue, Gurgaon</span>
      </div>
      {/* Assured Tag */}
      <div className="flex gap-2 items-center mt-2">
        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded font-semibold">Assured</span>
        <span className="text-xs text-gray-500">High quality, less driven</span>
      </div>
      {/* Green Sliding Offers */}
      <div className="overflow-hidden bg-green-50 border-y border-green-300 mt-2 h-8 flex items-center">
        <div key={sliderIdx}
          className="w-full text-center font-medium text-green-700 text-sm animate-slide"
        >
          {sliderMessages[sliderIdx]}
        </div>
        <style jsx>{`
          @keyframes slide {
            0% { opacity: 0; transform: translateY(100%); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-100%); }
          }
          .animate-slide {
            animation: slide 2s linear;
          }
        `}</style>
      </div>
      {/* Price and EMI */}
      <div className="mt-4">
        <div className="text-xs text-gray-700">Fixed on road price</div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-purple-900">₹14.11 Lakh</span>
          <span className="text-xs text-gray-500 font-semibold">+ 1% TCS</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Includes RC transfer, insurance & more
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-base font-medium text-gray-800">or ₹24,266/m</span>
          <button className="bg-purple-700 text-white px-4 py-1 rounded-lg text-xs font-semibold shadow hover:bg-purple-800">
            Calculate your EMI
          </button>
        </div>
      </div>
      {/* Action buttons */}
      <div className="flex gap-2 mt-4">
        <button className="flex-1 py-2 bg-purple-700 text-white rounded-xl font-semibold text-base shadow hover:bg-purple-800">
          BOOK NOW
          <span className="block text-xs font-normal">100% refundable</span>
        </button>
        <button className="flex-1 py-2 bg-[#EB1C5D] text-white rounded-xl font-semibold text-base shadow hover:bg-pink-600">
          FREE TEST DRIVE
        </button>
      </div>
      {/* Sharing options */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="text-sm text-gray-700">Share with a friend :</span>
        <FaFacebookF className="text-lg text-purple-800 cursor-pointer" />
        <span className="text-lg text-purple-800 cursor-pointer">✖</span>
        <FiMail className="text-lg text-purple-800 cursor-pointer" />
      </div>
    </div>
  );
};

export default SpinnyCarCard;
