import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import earrings from "../assets/earrins.png";
import blackDress from "../assets/dress2.png";

export default function ShopTheLookModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const images = [earrings, blackDress];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-[#ECEFE8] text-[#2e4635] p-6 rounded-lg shadow-lg max-w-5xl w-full relative font-serif overflow-hidden"
      >
        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl">
          <FiX />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Carousel with Indicators */}
          <div className="w-full">
            <div
              ref={sliderRef}
              className="keen-slider rounded overflow-hidden max-h-[420px]"
            >
              {images.map((img, idx) => (
                <div key={idx} className="keen-slider__slide">
                  <img
                    src={img}
                    alt={`Slide ${idx + 1}`}
                    className="w-full object-contain h-[400px]"
                  />
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-2 gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === idx ? "bg-[#2e4635]" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="pr-4 md:pr-8">
            <h2 className="text-2xl font-semibold font-italiana mb-2">
              Black Dress and silver earrings
            </h2>
            <p className="mb-2 font-medium">₹2000</p>
            <p className="text-sm mb-3 font-plusjakartasans">
              A stylish floral top designed for comfort and elegance. Perfect
              for casual outings or semi-formal occasions.
            </p>
            <p className="text-xs text-gray-500 mb-4 font-plusjakartasans">
              This is our exclusive collection, you can only buy this in pair
            </p>

            {/* Sizes */}
            <div className="flex gap-2 mb-4">
              {["S", "M", "L"].map((size) => (
                <button
                  key={size}
                  className="border border-[#2e4635] px-3 py-1 hover:bg-[#2e4635] hover:text-white transition text-sm"
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-4">
              <span>Pair Quantity:</span>
              <div className="flex items-center border border-gray-400 rounded-md">
                <button className="px-2">-</button>
                <span className="px-3">1</span>
                <button className="px-2">+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="border border-[#2e4635] px-4 py-2 hover:bg-[#2e4635] hover:text-white transition">
                Add to cart
              </button>
              <button className="bg-[#4B6A5A] text-white px-4 py-2 hover:bg-[#3a574b] transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
