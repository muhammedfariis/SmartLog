import DriverNavbar from "../drivers/components/driverNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DriverLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col overflow-x-hidden">

      <DriverNavbar />
      <main className="flex-1 w-full pt-16 sm:pt-20 px-4 pb-10 mx-auto max-w-7xl transition-all duration-300">
        <div className="mt-4 sm:mt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DriverLayout;