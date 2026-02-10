import DriverNavbar from "../drivers/components/driverNavbar";
import {Outlet} from "react-router-dom"
import { useEffect } from "react";

const DriverLayout = ()=>{
      useEffect(()=>{
         const token = localStorage.getItem("token")
         if(!token){
          window.location.replace("/login")
         }
       },[])
    return(
        <div className="min-h-screen flex">
            <DriverNavbar/>
            <div className="flex-1 p-4">
                <Outlet/>
            </div>
        </div>
    )
}

export default DriverLayout