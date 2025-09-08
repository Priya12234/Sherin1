import React from "react";
import leafImage from "../assets/leaves.png"; // Make sure this path is correct

export default function AboutSherin() {
  const pageStyle = {
    minHeight: "100vh",
    background: "#dfe6d1", // fallback color
    backgroundImage: `radial-gradient(ellipse at center,
      #dfe6d1 0%,     /* Light creamy center */
      #c8d1b5 60%,    /* Muted sage green */
      #7e9a7c 100%    /* Dusty green on the edges */
    )`,
    position: "relative", // to contain absolutely positioned elements
    overflow: "hidden", // prevents image overflow on small screens
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const leafStyle = {
    position: "absolute",
    top: "0",
    right: "0",
    width: "40%",
    zIndex: 0,
  };

  const contentStyle = {
    zIndex: 1,
    textAlign: "center",
  };

  return (
    <div style={pageStyle}>
      {/* Leaf image in top-right corner */}
      <img src={leafImage} alt="Leaf decoration" style={leafStyle} />

      {/* Content */}
      <div style={contentStyle}>
        <h1 className="text-5xl md:text-7xl font-italiana text-[#1e3a1b] mb-4">
          About Sherin
        </h1>
        <p className="max-w-2xl text-lg font-playfair text-[#3a4d39] leading-relaxed">
          Welcome to a space dedicated to timeless elegance and effortless
          beauty. Our brand is built on a foundation of passion for quality,
          sustainability, and the belief that style is a personal expression of
          who you are. Each piece in our collection is thoughtfully designed to
          inspire confidence and grace in your everyday life.
        </p>
      </div>
    </div>
  );
}
