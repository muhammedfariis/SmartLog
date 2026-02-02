import Register from "../Authentication/pages/register";
import Login from "../Authentication/pages/login";
import { Route, Routes, Navigate } from "react-router-dom";
import ROUTEAUTH from "../common/authPath";
import LandingPage from "../landing/landing";
import ROUTEADMIN from "../common/adminPath";
import DashboardAdmin from "../admin/pages/dashboard";
import TeamAdd from "../admin/pages/teamadd";
import AdminLayout from "../layouts/adminlayout";
import {VehicleCreate} from "../admin/pages/vehicles"
const Router = () => {
  return (
    <>
      <Routes>
        {/* landing */}
        <Route path="/" element={<LandingPage />} />
        {/* authentication */}
        <Route path={ROUTEAUTH.REGISTER} element={<Register />} />
        <Route path={ROUTEAUTH.LOGIN} element={<Login />} />
        {/* admin */}
        <Route path="/admin" element = {<AdminLayout/>}>
        <Route path={ROUTEADMIN.DASHBOARD} element={<DashboardAdmin />} />
        <Route path={ROUTEADMIN.VEHICLES} element={<VehicleCreate/>} />
        <Route path={ROUTEADMIN.TEAM} element={<TeamAdd />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
