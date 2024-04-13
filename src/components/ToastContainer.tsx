"use client";

import { ToastContainer } from "react-toastify";

const contextClass = {
  success: "bg-success",
  error: "bg-systemRed",
  info: "bg-headlineText",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

export default function AppToastContainer() {
  return (
    <ToastContainer
      className="mt-14"
      toastClassName={(context) => 
        contextClass[context?.type || "default"] + " flex flex-row items-center px-4 py-2 rounded-md my-1 overflow-hidden cursor-pointer"
      }
      closeButton={false}
      closeOnClick
    />
  );
}
