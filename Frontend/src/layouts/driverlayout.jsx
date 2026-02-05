import DriverNavbar from "../drivers/components/driverNavbar";
import {Outlet} from "react-router-dom"

const DriverLayout = ()=>{
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