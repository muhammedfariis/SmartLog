import { Outlet } from "react-router-dom";
import AdminNavbar from "../../admin/components/adminNavbar";
import { useEffect } from "react";
import SpaceBackground from "../../common/stardust";
import style from "../adminlayout/adminlayout.module.css"
const AdminLayout = () => {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
    }
  }, []);

  return (
    <div className={style.admin}>

      {/* <SpaceBackground /> */}

      <div className={style.adminNav}>

        <AdminNavbar />

        <div className={style.contents}>
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;
