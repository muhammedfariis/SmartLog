import Register from "../Authentication/pages/register";
import Login from "../Authentication/pages/login";
import { Route, Routes } from "react-router-dom";
import ROUTEAUTH from "../common/authPath";
import LandingPage from "../landing/landing";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element = {<LandingPage/>}/>
        <Route path={ROUTEAUTH.REGISTER} element={<Register />} />
        <Route path={ROUTEAUTH.LOGIN} element={<Login />} />
      </Routes>
    </>
  );
};

export default Router
