import { Outlet } from "react-router-dom";
import DispatcherNavbar from "../dispatcher/components/dispatcherNavbar";
import { useEffect } from "react";
import SpaceBackground from "../common/stardust";

const DisptLayout = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background - full screen */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SpaceBackground />
      </div>

      {/* Foreground content */}
      <div className="flex min-h-screen relative z-10">
        <DispatcherNavbar />
        <div className="flex-1 ml-56 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DisptLayout;
