import { Outlet } from "react-router-dom";
import AdminNavbar from "../admin/components/adminNavbar";
const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminNavbar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};


export default AdminLayout;
