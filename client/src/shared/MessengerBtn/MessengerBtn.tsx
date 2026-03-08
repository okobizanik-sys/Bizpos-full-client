"use client";
import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";

const MessengerBtn = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [zoom, setZoom] = useState(false); // State for zoom effect

  const toggleOptions = () => {
    setZoom(!zoom);
    setShowOptions(!showOptions);

    // Remove zoom effect after the animation duration (e.g., 300ms)
    setTimeout(() => setZoom(false), 300);
  };

  return (
    <div className="bottom-15 right-5 fixed z-[99]">
      {/* Main Messenger Button */}
      <button
        onClick={toggleOptions}
        className={`btnzoom text-white p-2 rounded-full shadow-md hover:scale-125 transition-all duration-300 ${
          zoom ? "scale-125" : "scale-100"
        }`}
        style={{
          background: "linear-gradient(135deg, #00C6FF, #0072FF)",
        }}
      >
        <FaFacebookMessenger className="text-3xl" />
      </button>

      {/* Popup Buttons */}
      {showOptions && (
        <div className="absolute -top-32 right-0 mt-2 flex flex-col space-y-2">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/+8801805112114"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white w-12 h-12 mx-auto flex justify-center items-center rounded-full shadow-md hover:scale-110  transition duration-300"
          >
            <FaWhatsapp className="text-2xl" />
          </a>

          {/* Messenger Button */}
          <Link
            // to="https://m.me/107585752267101"
            href="https://www.facebook.com/UniCrescentLtd"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white w-12 h-12 mx-auto flex justify-center items-center rounded-full shadow-md hover:scale-110 hover:bg-opacity-80 transition duration-300"
          >
            <FaFacebookMessenger className="text-2xl" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MessengerBtn;
