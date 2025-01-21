import React from "react";

function UnderConstructionBanner() {
  return (
    <div className="bg-gray-900 text-yellow-400 border-t-4 border-yellow-500 shadow-md text-center py-2 px-4">
      <p className="font-semibold text-md md:text-lg flex items-center justify-center">
        <span className="mr-2 animate-bounce">🚧</span>
        Under Construction
        <span className="ml-2 animate-bounce">🚧</span>
      </p>
      <p className="text-sm md:text-base text-gray-300 mt-1">
        We're actively building and testing. Some features may be unavailable.
      </p>
    </div>
  );
}

export default UnderConstructionBanner;
