"use client";

import React from "react";
import dynamic from "next/dynamic";

// dynamic import client-only
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export default function SplineClient({
  scene,
  className = "w-full h-full",
  preventScroll = false,
}) {
  const handleWheel = (e) => {
    if (preventScroll) e.preventDefault();
  };

  return (
    <div
      className={className}
      onWheel={handleWheel}
      style={{ touchAction: preventScroll ? "none" : undefined }}
    >
      <Spline scene={scene} />
    </div>
  );
}
