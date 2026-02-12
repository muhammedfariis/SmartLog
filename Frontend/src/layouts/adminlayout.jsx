import { Outlet } from "react-router-dom";
import AdminNavbar from "../admin/components/adminNavbar";
import { useEffect } from "react";
import SpaceBackground from "../common/stardust";

const AdminLayout = () => {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
    }
  }, []);

  return (
    <div className="relative min-h-screen">

      <SpaceBackground />

      <div className="flex min-h-screen relative z-10">

        <AdminNavbar />

        <div className="flex-1 ml-56 min-h-screen">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;
