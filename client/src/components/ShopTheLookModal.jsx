import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function ShopTheLookModal({ isOpen, onClose, combo, imageMap }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
      setCurrentSlide(0);
    }
  }, [isOpen]);

  if (!isOpen || !combo) return null;

  // Convert DB image filenames → actual images from the imageMap
  const images =
    combo.images?.map((imgName) => imageMap[imgName] || null).filter(Boolean) ||
    [];

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comboId: combo._id,
          quantity,
        }),
      });

      const data = await res.json();
      console.log("Cart response:", data);

      if (res.status === 401) {
        alert("You must login first!");
        return;
      }

      alert("Added to cart successfully!");
    } catch (err) {
      console.error("Cart error:", err);
      alert("Error adding to cart");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#ECEFE8] text-[#2e4635] p-6 rounded-lg shadow-lg max-w-5xl w-full relative font-serif overflow-hidden"
      >
        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl">
          <FiX />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Carousel */}
          <div className="w-full">
            <div
              ref={sliderRef}
              className="keen-slider rounded overflow-hidden max-h-[420px]"
            >
              {images.map((img, idx) => (
                <div key={idx} className="keen-slider__slide">
                  <img
                    src={img}
                    alt={`Slide ${idx}`}
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

          {/* Details */}
          <div className="pr-4 md:pr-8">
            <h2 className="text-2xl font-semibold font-italiana mb-2">
              {combo.title}
            </h2>

            <p className="mb-1 font-medium text-lg">
              ₹{combo.price}
              {combo.discount > 0 && (
                <span className="text-sm text-red-600 ml-2">
                  ({combo.discount}% OFF)
                </span>
              )}
            </p>

            <p className="text-sm mb-3">{combo.description}</p>

            <p className="text-xs text-gray-500 mb-4">
              This is an exclusive combo. Sold only as a pair.
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-4">
              <span>Pair Quantity:</span>
              <div className="flex items-center border border-gray-400 rounded-md">
                <button
                  className="px-3 py-1"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="px-3 py-1"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="border border-[#2e4635] px-4 py-2 hover:bg-[#2e4635] hover:text-white transition"
              >
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
