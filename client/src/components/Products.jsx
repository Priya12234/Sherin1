import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import petelJeanse from "../assets/Petal-jeans.png";
import petalCorset from "../assets/Petal-corset.png";
import bloomCrop from "../assets/bloom-crop.png";
import bowBelleDress from "../assets/bowbelle-dress.png";

import diamondEarcuff from "../assets/diamond-ear-cuff.png";
import floralEarring from "../assets/floral-earrings.png";
import butterflyTiara from "../assets/butterfly-tiara.png";
import whitepetalChokar from "../assets/whitepetal-chokar.png";

// imageMap for backend images
const imageMap = {
  "Petal-jeans.png": petelJeanse,
  "Petal-corset.png": petalCorset,
  "bloom-crop.png": bloomCrop,
  "bowbelle-dress.png": bowBelleDress,

  "diamond-ear-cuff.png": diamondEarcuff,
  "floral-earrings.png": floralEarring,
  "butterfly-tiara.png": butterflyTiara,
  "whitepetal-chokar.png": whitepetalChokar,
};

const Arrow = ({ direction, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`absolute top-1/2 -translate-y-1/2 bg-[#284E2D] rounded-full p-1 w-7 h-7 flex items-center justify-center text-white shadow-md hover:bg-[#1e3a1b] disabled:opacity-50 z-10 ${
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

const ProductCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(2);
      else setItemsPerPage(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, items.length - itemsPerPage));
  };

  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="relative px-8">
      <Arrow direction="left" disabled={currentIndex === 0} onClick={prev} />

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-1/2 p-2 text-center sm:w-1/4"
            >
              <img
                src={imageMap[item.images?.[0]]}
                alt={item.name}
                className="object-cover w-full h-64 rounded md:h-96"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/400x600/EEE/000?text=No+Image";
                }}
              />

              <p className="mt-2 text-lg text-[#1e3a1b] font-playfair">
                {item.name}
              </p>

              <p className="text-[#1e3a1b] font-playfair">
                ₹{item.price}
                {item.discount > 0 && (
                  <span className="ml-2 text-green-700">
                    ({item.discount}% off)
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Arrow
        direction="right"
        disabled={currentIndex >= items.length - itemsPerPage}
        onClick={next}
      />
    </div>
  );
};

export default function Products() {
  const [tops, setTops] = useState([]);
  const [jewelry, setJewelry] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/");
        const result = await res.json();

        const data = result?.data || [];

        setTops(data.filter((p) => p.category === "Clothing").slice(0, 5));
        setJewelry(data.filter((p) => p.category === "Jewelry").slice(0, 5));
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-[#DCE1DC] py-16 font-serif">
      <h2 className="text-4xl md:text-5xl font-italiana text-center mb-12 text-[#1e3a1b]">
        Discover Effortless Beauty
      </h2>

      {/* CLOTHING */}
      <div className="mb-6">
        <ProductCarousel items={tops} />
      </div>

      <div className="flex justify-center mb-16">
        <Link to="/collection">
          <button className="border-4 border-[#284E2D] px-6 py-2 text-[#1e3a1b] hover:bg-[#284E2D] hover:text-white transition font-playfair">
            View More
          </button>
        </Link>
      </div>

      {/* JEWELRY */}
      <div className="mb-6">
        <ProductCarousel items={jewelry} />
      </div>

      <div className="flex justify-center">
        <Link to="/treasures">
          <button className="border-4 border-[#284E2D] px-6 py-2 text-[#1e3a1b] hover:bg-[#284E2D] hover:text-white transition font-playfair">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
}
