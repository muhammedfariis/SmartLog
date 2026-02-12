import React from "react";
import earthImg from "../../../Frontend/public/images/earth.png";

const SpaceBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full animate-spin-slow">
          {[...Array(200)].map((_, i) => {
            const size = Math.random() * 1 + 1;
            const angle = Math.random() * 360;
            const distance = Math.random() * 600 + 10; 
            return (
              <div
                key={i}
                className="absolute bg-white rounded-full opacity-70"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `50%`,
                  left: `50%`,
                  transform: `rotate(${angle}deg) translate(${distance}px)`,
                }}
              />
            );
          })}
        </div>
      </div>

      

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin 200s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SpaceBackground;
