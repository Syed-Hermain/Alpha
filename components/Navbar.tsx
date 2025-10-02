// components/SpinnyNavbar.tsx
import { FaSearch, FaHeart, FaUser } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import Image from "next/image";

export default function SpinnyNavbar() {
  return (
    <nav className="w-full flex items-center justify-between bg-white py-4 px-1">
      {/* Logo */}
      <div className="flex items-center">
        
          {/* The 'S' logo could be SVG or image */}
          <Image
          src= "/Nav/spinny-logo.png"
          alt="Company logo"
          width={130}
          height={50}
          priority
          />
      </div>

      {/* Location Selector & Search */}
      <div className="flex items-center gap-2">
        <button className="flex items-center border rounded-full px-2 py-3 text-gray-700 bg-white hover:bg-gray-100 shadow-sm transition">
          <MdLocationOn className="text-xl text-[#EB1C5D]" />
          <span className="font-semibold text-sm text-purple-900">Delhi NCR</span>
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div className="relative w-64">
          <input
            type="text"
            className="w-full pl-4 pr-8 py-2.5 border rounded-full outline-none text-gray-600 bg-gray-50"
            placeholder="Search by km driven year"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400 text-lg" />
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <div className="flex gap-5">
          <div className="flex items-center gap-1 group relative cursor-pointer">
            <span className="text-lg font-semibold text-purple-900">Buy car</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
          <div className="flex items-center gap-1 group relative cursor-pointer">
            <span className="text-lg font-semibold text-purple-900">Sell car</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="relative text-lg font-semibold text-purple-900">
              Service car
              <span className="absolute -top-4 left-2 bg-[#5C30CC] text-white text-xs rounded px-2 py-0.5">NEW</span>
            </span>
          </div>
          <div className="flex items-center gap-1 group relative cursor-pointer">
            <span className="text-lg font-semibold text-purple-900">More</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </div>

      {/* User Icons & Contact */}
      <div className="flex items-center gap-6">
        <div className="flex gap-3 items-center">
          <FaHeart className="text-2xl text-purple-900" />
          <div className="flex items-center gap-1 group relative cursor-pointer">
            <FaUser className="text-2xl text-purple-900" />
            <span className="font-medium text-purple-900 ml-1">Account</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
        <div className="text-center">
          <span className="block text-xs text-gray-500">Call us at</span>
          <span className="text-lg font-bold text-purple-900">727-727-7275</span>
        </div>
      </div>
    </nav>
  );
}

