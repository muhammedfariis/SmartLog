import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Register from "../Authentication/register/pages/register";
import Login from "../Authentication/login/pages/login";
import ROUTEAUTH from "../common/authPath";
import LandingPage from "../landing/pages/landing";

import Contact from "../landing/contact";
import Terms from "../landing/terms";
import About from "../landing/about";

import ROUTEADMIN from "../common/adminPath";
import DashboardAdmin from "../admin/dashboard/pages/dashboard";
import TeamAdd from "../admin/teamaddings/pages/teamadd";
import AdminLayout from "../layouts/adminlayout/adminlayout";
import { VehicleCreate } from "../admin/vehicles/pages/vehicles";

import DisptLayout from "../layouts/dispatcherlayout/dispatcherlayout";
import Assignment from "../dispatcher/pages/assignment";
import Status from "../dispatcher/pages/status";
import DISPATCHERPATH from "../common/dispatcherPath";

import Mytrips from "../drivers/pages/mytrips";
import DRIVERSPATH from "../common/driverspath";
import Kmupdate from "../drivers/pages/kmupdate";
import DriverLayout from "../layouts/driverlayout/driverlayout";

import API from "../Api/api";
import ProtectedRoute from "./protectRouter";

const Router = () => {
  const [adminExist, setAdmin] = useState(false);

  useEffect(() => {
    const chekAdmin = async () => {
      try {
        const res = await API.get("/authentication/admin");
        setAdmin(res.data.admin);
      } catch (err) {
        setAdmin(true);
      }
    };

    chekAdmin();
  }, []);

  if (adminExist === null) return null;

  return (
    <Routes>
      {/* landing */}
      <Route
        path="/"
        element={
          adminExist ? <Navigate to={ROUTEAUTH.LOGIN} /> : <LandingPage />
        }
      />

      <Route path="/terms" element={<Terms/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/about" element={<About/>}/>


      {/* auth */}

      <Route
        path={ROUTEAUTH.REGISTER}
        element={adminExist ? <Navigate to={ROUTEAUTH.LOGIN} /> : <Register />}
      />

      <Route path={ROUTEAUTH.LOGIN} element={<Login />} />

      {/* admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardAdmin />} />
        <Route path={ROUTEADMIN.DASHBOARD} element={<DashboardAdmin />} />
        <Route path={ROUTEADMIN.VEHICLES} element={<VehicleCreate />} />
        <Route path={ROUTEADMIN.TEAM} element={<TeamAdd />} />
      </Route>

      {/* dispatcher */}
      <Route
        path="/dispatcher"
        element={
          <ProtectedRoute>
            <DisptLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Assignment />} />
        <Route path={DISPATCHERPATH.ASSIGNMENT} element={<Assignment />} />
        <Route path={DISPATCHERPATH.DETAILS} element={<Status />} />
      </Route>

      {/* driver */}
      <Route
        path="/drivers"
        element={
          <ProtectedRoute>
            <DriverLayout />
          </ProtectedRoute>
        }
      >
        <Route path={DRIVERSPATH.KMUPDATE} element={<Kmupdate />} />
        <Route index element={<Mytrips />} />
        <Route path={DRIVERSPATH.TRIPS} element={<Mytrips />} />
      </Route>
      {/* problem */}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
