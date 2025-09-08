import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import floralTop from "../assets/floral-top.png";
import opalKnit from "../assets/opal-knit.png";
import shoulderTop from "../assets/shoulder-top.png";
import mintZip from "../assets/mint-zip.png";
import greenEarrings from "../assets/green-earrings.png";
import forestRing from "../assets/forest-ring.png";
import pearlEarrings from "../assets/pearl-earrings.png";
import goldenNecklace from "../assets/golden-necklace.png";

const productsData = {
  tops: [
    { name: "Floral Top", price: "₹500", image: floralTop },
    { name: "Opal green Knit", price: "₹500", image: opalKnit },
    { name: "Soft Shoulder Top", price: "₹500", image: shoulderTop },
    { name: "Mint Zip-Up", price: "₹500", image: mintZip },
    { name: "Another Mint Zip-Up", price: "₹500", image: mintZip },
  ],
  jewelry: [
    { name: "Green Bloom Earrings", price: "₹500", image: greenEarrings },
    { name: "Forest Ring", price: "₹500", image: forestRing },
    { name: "Pearl Drop Earrings", price: "₹500", image: pearlEarrings },
    { name: "Golden Bloom Necklace Set", price: "₹500", image: goldenNecklace },
    { name: "Another Forest Ring", price: "₹500", image: forestRing },
  ],
};

// Arrow button - UPDATED: Made smaller and simplified positioning
const Arrow = ({ direction, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    // Made button smaller and positioned at the edges of the parent
    className={`absolute top-1/2 -translate-y-1/2 bg-[#284E2D] rounded-full p-1 w-7 h-7 flex items-center justify-center text-white shadow-md hover:bg-[#1e3a1b] disabled:opacity-50 disabled:cursor-not-allowed z-10 ${
      direction === "left" ? "left-0" : "right-0"
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  </button>
);

// Carousel - UPDATED: Logic is now responsive to screen size
const ProductCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Effect to update visible items based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Tailwind's 'sm' breakpoint is 640px
      if (window.innerWidth < 640) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    // This logic now works correctly because itemsPerPage is dynamic
    setCurrentIndex((prev) => Math.min(prev + 1, items.length - itemsPerPage));
  };

  // Calculate slide percentage dynamically
  const slidePercentage = 100 / itemsPerPage;

  return (
    // UPDATED: Layout structure to prevent button overlap
    <div className="relative px-8">
      <Arrow
        direction="left"
        onClick={handlePrev}
        disabled={currentIndex === 0}
      />

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * slidePercentage}%)`,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex-shrink-0 w-1/2 p-2 text-center sm:w-1/4"
            >
              {/* Image classes are preserved for original design */}
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-64 rounded md:h-96"
              />

              <p className="mt-2 text-lg text-[#1e3a1b] font-playfair">
                {item.name}
              </p>
              <p className="text-[#1e3a1b] font-playfair">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      <Arrow
        direction="right"
        onClick={handleNext}
        disabled={currentIndex >= items.length - itemsPerPage}
      />
    </div>
  );
};

// Main export (No changes needed here)
export default function Products() {
  return (
    <div className="bg-[#DCE1DC] py-16">
      <h2 className="text-4xl md:text-5xl font-italiana text-center mb-12 text-[#1e3a1b]">
        Discover Effortless Beauty
      </h2>

      {/* Tops */}
      <div className="mb-6">
        <ProductCarousel items={productsData.tops} />
      </div>

      <div className="flex justify-center mb-16">
        <Link to="/collection">
          <button className="border-4 border-[#284E2D] text-[#1e3a1b] font-playfair px-6 py-2 hover:bg-[#284E2D] hover:text-white transition">
            View More
          </button>
        </Link>
      </div>

      {/* Jewelry */}
      <div className="mb-6">
        <ProductCarousel items={productsData.jewelry} />
      </div>

      <div className="flex justify-center">
        <Link to="/treasures">
          <button className="border-4 border-[#284E2D] text-[#1e3a1b] font-playfair px-6 py-2 hover:bg-[#284E2D] hover:text-white transition">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
}
