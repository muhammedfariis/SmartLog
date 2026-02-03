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
import DisptLayout from "../layouts/dispatcherlayout";
import Assignment from "../dispatcher/pages/assignment";
import Status from "../dispatcher/pages/status";
import DISPATCHERPATH from "../common/dispatcherPath";
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
        {/* dispatcher */}
        <Route path="/dispatcher" element = {<DisptLayout/>}>
        <Route path={DISPATCHERPATH.ASSIGNMENT} element = {<Assignment/>}/>
        <Route path={DISPATCHERPATH.STATUS} element = {<Status/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
