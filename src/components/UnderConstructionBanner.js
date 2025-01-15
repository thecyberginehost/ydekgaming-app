import React from "react";

function UnderConstructionBanner() {
  return (
    <div className="bg-gradient-to-r from-yellow-500 to-red-500 shadow-lg text-white text-center py-3 px-4">
      <p className="font-bold text-lg animate-pulse">
        🚧 UNDER CONSTRUCTION 🚧
      </p>
      <p className="text-sm">
        Limited functionality & testing in progress. We're building something epic!
      </p>
    </div>
  );
}

export default UnderConstructionBanner;
