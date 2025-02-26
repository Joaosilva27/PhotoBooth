import { useState } from "react";
import "./App.css";
import Webcam from "react-webcam";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-4 relative group">
        <span className="relative z-10">PhotoBooth</span>
        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
      </h1>

      <div className="relative group">
        <div className="relative border-2 border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-800/50">
          <Webcam
            height={400}
            width={400}
            className="object-cover aspect-square"
          />
          <div className="absolute inset-0 border-[0.5px] border-white/10 pointer-events-none"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute w-[95%] h-[95%] border-2 border-white/5 rounded-xl pointer-events-none"></div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="px-6 py-2.5 bg-gray-800 rounded-lg text-gray-100 hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2 border border-gray-700 hover:border-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          Capture
        </button>

        <button className="px-6 py-2.5 bg-gray-800 rounded-lg text-gray-300 hover:text-gray-100 transition-colors duration-200 flex items-center gap-2 border border-gray-700 hover:border-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Save
        </button>
      </div>

      <p className="text-sm text-gray-400 mt-4">
        Made by joaosilva7875@gmail.com
      </p>
    </div>
  );
}

export default App;
