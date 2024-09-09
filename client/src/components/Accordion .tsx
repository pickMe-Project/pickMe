// components/Accordion.tsx
"use client";

import React, { useState } from "react";
import YouTubePlayer from "@/components/YoutubePlayer";


const Accordion = ({ song }: { song: any }) => {
    
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      id="accordion-collapse"
      data-accordion="collapse"
      className="shadow-lg"
    >
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right rounded-t-lg  focus:ring-gray-200 gap-3 border-b-2`}
          onClick={() => handleToggle(1)}
          aria-expanded={openIndex === 1}
          aria-controls="accordion-collapse-body-1"
        >
          <h2 className="text-3xl font-bold mb-4 text-black font-libre">
          Guitar Tabs
          </h2>
          <svg
            data-accordion-icon
            className={`w-3 h-3 ${
              openIndex === 1 ? "rotate-180" : ""
            } shrink-0`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={`p-5 border border-b-0  ${openIndex === 1 ? "" : "hidden"} h-[600px] `}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div
          className="font-mono text-sm p-4 rounded-lg overflow-hidden h-[500px]"
          style={{ height: "555px", overflowY: "auto" }}
        >
          <img src={song.tabImg} alt={song.name} className="w-full h-auto" />
        </div>
      </div>
      <h2 id="accordion-collapse-heading-2"></h2>
      <div
        id="accordion-collapse-body-2"
        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 ${
          openIndex === 2 ? "" : "hidden"
        }`}
        aria-labelledby="accordion-collapse-heading-2"
      ></div>
      <h2 id="accordion-collapse-heading-3">
        {/* ------------   2nd   -------- */}
        
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right  border-b-0 rounded-t-lg  focus:ring-gray-200 gap-3 `}
          onClick={() => handleToggle(3)}
          aria-expanded={openIndex === 3}
          aria-controls="accordion-collapse-body-3"
        >
          <h2 className="text-3xl font-bold mb-4 text-black font-libre">
            Tutorial Video
          </h2>{" "}
          <svg
            data-accordion-icon
            className={`w-3 h-3 ${
              openIndex === 3 ? "rotate-180" : ""
            } shrink-0`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-3"
        className={`p-5 border border-t-0 ${openIndex === 3 ? "" : "hidden"} h-[650px]`}
        aria-labelledby="accordion-collapse-heading-3"
      >
        <div className="flex-1 bg-white rounded-xl p-6 h-[600px]">
          
          <div
            className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden flex items-center justify-center"
            style={{ height: "555px" }}
          >
            <YouTubePlayer videoId={song.videoId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
