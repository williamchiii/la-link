import React from 'react'
import WavesBg from "../components/ui/WavesBg.jsx";

const LinkNotFound = () => {
  return (
    <div className="relative min-h-screen bg-[#101729] flex items-center justify-center text-white px-4">
      <WavesBg />
      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold italic">
          Link not found
        </h1>
        <p className="text-lg sm:text-xl text-white/60">
          This link may have expired or does not exist.
        </p>
        <a
          href="/"
          className="rounded-full bg-white/50 px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-black/10 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-white/60"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

export default LinkNotFound
