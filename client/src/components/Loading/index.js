import React from "react";

function Loading ({children}) {
  return (
    <button className="hidden md:inline-flex w-full h-full items-center ml-3 border border-blue-400 bg-blue-500 rounded outline-none focus:outline-none text-white text-sm py-1 px-2">
      <svg className="animate-spin h-5 w-5 mr-3 " fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opactiy-75" fill="currentcolor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
      </svg>
      
      {children}
  </button>

  )
}

export default Loading;