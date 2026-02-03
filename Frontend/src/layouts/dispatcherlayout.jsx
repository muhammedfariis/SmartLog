import { Outlet } from "react-router-dom";
import DispatcherNavbar from "../dispatcher/components/dispatcherNavbar";

const DisptLayout = () => {
  return (
    <div className="min-h-screen flex">
      <DispatcherNavbar />
      <div className="flex-1 gap-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DisptLayout;
