import { Outlet } from "react-router-dom";
import DispatcherNavbar from "../dispatcher/components/dispatcherNavbar";
import { useEffect } from "react";

const DisptLayout = () => {
    useEffect(()=>{
       const token = localStorage.getItem("token")
       if(!token){
        window.location.replace("/login")
       }
     },[])
  return (
    <div className="min-h-screen  flex">
      <DispatcherNavbar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DisptLayout;
