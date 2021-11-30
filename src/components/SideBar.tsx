import React from "react";

function SideBar() {
  return (
    <div className="pt-8">
      <h4 className="text-left text-gray-500">Study</h4>
      <div className="flex flex-row content-center items-center rounded-md hover:bg-accent cursor-pointer">
        <svg fill="none" className="w-12 h-12" viewBox="0 0 32 32">
          <path
            d="M8.57178 13.2785C8.57178 11.9414 9.69104 10.8574 11.0717 10.8574H26.0718C27.4525 10.8574 28.5718 11.9414 28.5718 13.2785V23.8649C28.5718 25.2021 27.4525 26.286 26.0718 26.286H11.0717C9.69104 26.286 8.57178 25.2021 8.57178 23.8649V13.2785Z"
            fill="#7B89C9"
          ></path>
          <path
            d="M3.42871 8.13541C3.42871 6.7983 4.55438 5.71436 5.94296 5.71436H21.0288C22.4174 5.71436 23.5431 6.7983 23.5431 8.13541V18.7219C23.5431 20.059 22.4174 21.1429 21.0288 21.1429H5.94296C4.55438 21.1429 3.42871 20.059 3.42871 18.7219V8.13541Z"
            fill="#4257B2"
          ></path>
        </svg>
        <h3 className="font-semibold">FlashCards</h3>
      </div>
      <div className="flex flex-row content-center items-center rounded-md hover:bg-accent cursor-pointer">
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="#4257B2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        <h3 className="font-semibold">Test</h3>
      </div>
    </div>
  );
}

export default SideBar;
