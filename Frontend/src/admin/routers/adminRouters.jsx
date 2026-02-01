import { Route, Routes } from "react-router-dom";
import ROUTE from "../../common/adminPath";
import VehicleCreate from "../pages/vehicles";
import DashboardAdmin from "../pages/dashboard";
import AdminNavbar from "../components/adminNavbar";
import TeamAdd from "../pages/teamadd";
const AdminLandingRoutes = () => {
  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path={ROUTE.TEAM} element={<TeamAdd/>} />
        <Route path={ROUTE.VEHICLES} element={<VehicleCreate />} />
        <Route path={ROUTE.DASHBOARD} element={<DashboardAdmin />} />
      </Routes>
    </>
  );
};

export default AdminLandingRoutes;
