import React from "react";

export default function ContactUs() {
  return (
    <div className="min-h-screen px-8 py-16 bg-[#eaf0ea] font-playfair text-[#1e3a1b]">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-center text-5xl md:text-6xl font-italiana mb-4">
          Contact Us
        </h1>
        <p className="text-center text-lg md:text-xl mb-12">
          We’re here to help you with anything —<br />
          from style questions to support.
        </p>

        {/* Form and Info in 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Form */}
          <form className="space-y-6 md:col-span-1">
            <div>
              <label className="block mb-1 font-semibold">Full name:</label>
              <input
                type="text"
                className="w-full bg-[#b6d1a8] rounded-md px-4 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email:</label>
              <input
                type="email"
                className="w-full bg-[#b6d1a8] rounded-md px-4 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Message:</label>
              <textarea
                rows="5"
                className="w-full bg-[#b6d1a8] rounded-md px-4 py-2 focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="border-4 border-[#284E2D] text-[#1e3a1b] px-6 py-1 mt-4 font-semibold hover:bg-[#284E2D] hover:text-white transition"
            >
              Submit
            </button>
          </form>

          {/* Center: Divider */}
          <div className="hidden md:flex justify-center">
            <div className="w-px bg-[#1e3a1b] h-full" />
          </div>

          {/* Right: Contact Info */}
          <div className="space-y-8 md:text-left text-lg md:col-span-1">
            <div>
              <p className="font-semibold">Address:</p>
              <p>First Floor, ABC Building, Rajkot</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <a
                href="mailto:abc123@gmail.com"
                className="text-[#2d5e37] underline"
              >
                abc123@gmail.com
              </a>
            </div>
            <div>
              <p className="font-semibold">Business Hours:</p>
              <p>9 am to 10 pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
