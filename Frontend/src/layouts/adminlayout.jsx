import { Outlet } from "react-router-dom";
import AdminNavbar from "../admin/components/adminNavbar";
import { useEffect } from "react";
const AdminLayout = () => {

   useEffect(()=>{
     const token = localStorage.getItem("token")
     if(!token){
      window.location.replace("/login")
     }
   },[])

  return (
    <div className="flex min-h-screen">
      <AdminNavbar />
      <div className="flex-1 min-h-screen ">
        <Outlet />
      </div>
    </div>
  );
};


export default AdminLayout;
