// components/HeroSection.jsx
import { Link } from "react-router-dom";
import modelImg from "../assets/model.png";
import bgImage from "../assets/bg.png";

export default function HeroSection() {
  return (
    <>
      {/* Top Border Divider */}
      <div className="mt-16 border-t border-black" />

      {/* Hero Section */}
      <div className="relative flex min-h-screen">
        {/* Left: Background Image */}
        <div
          className="w-1/3 bg-cover "
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        {/* Model Image Overlapping */}
        <img
          src={modelImg}
          alt="Model"
          className="absolute top-[52.5%] left-[15%] -translate-y-1/2 h-[95%] object-contain z-10 hidden md:block"
        />

        {/* Right: Text Content */}
        <div className="flex-1 bg-[#DCE1DC] flex flex-col justify-center items-end px-8">
          <h2
            className="text-6xl font-italiana  mb-4 relative right-[50px]"
            style={{ color: "#355E3B" }}
          >
            Elegance begins with
          </h2>
          <h1
            className="text-[9rem] font-[Italianno] relative right-[50px] leading-none"
            style={{ color: "#355E3B" }}
          >
            Sherin
          </h1>
          <div
            className="group relative mt-12 h-[55px] w-[260px] overflow-hidden border border-[#355E3B] text-center font-sans uppercase tracking-widest text-sm cursor-pointer"
            onClick={() => {
              const el = document.querySelector("#shop");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {/* -- Top Layer (Visible by default) -- */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#DCE1DC] text-[#355E3B] transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
              <span>Shop The Look</span>
            </div>

            {/* -- Bottom Layer (Revealed on hover) -- */}
            <Link
              to="/shop"
              className="absolute inset-0 flex items-center justify-center translate-y-full bg-[#355E3B] text-[#DCE1DC] transition-transform duration-500 ease-in-out group-hover:translate-y-0"
            >
              <span>Let's go →</span>
            </Link>
          </div>
        </div>
      </div>
      <div className=" bg-[#DCE1DC] border-t border-black mt-8" />
    </>
  );
}
