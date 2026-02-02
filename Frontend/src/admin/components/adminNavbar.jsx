import { Link } from "react-router-dom";
import { User2Icon, LogOut, SunMoonIcon } from "lucide-react";
const AdminNavbar = () => {
  return (
    <>
      <div className="min-h-screen  w-56  ">
        <div className="flex min-h-screen flex-col justify-between items-center border-r-2 border-gray-900">
          <div className="flex items-center w-40 h-20">
            <img src="/images/logosmartlog-removebg-preview.png" alt="" />
          </div>
          <div className="flex flex-col gap-10  p-5 text-white justify-center items-center">
            <Link
              className="hover:bg-gray-300 hover:text-black rounded-2xl h-10 w-30 flex items-center justify-center"
              to="/admin/vehicles"
            >
              Vehicles
            </Link>
            <Link
              className="hover:bg-gray-300 hover:text-black rounded-2xl h-10 w-30 flex items-center justify-center"
              to="/admin/team"
            >
              Team
            </Link>
            <Link
              className="hover:bg-gray-300 hover:text-black rounded-2xl h-10 w-30 flex items-center justify-center"
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
          </div>

          <div className="flex items-center justify-center w-40 h-20">
            <button
              className="group flex items-center rounded-full h-10 w-10 
               bg-gray-300 text-black hover:w-25 transition-all duration-300 
             overflow-hidden px-3"
            >
              <SunMoonIcon
                size={20}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />

              <span
                className="ml-3 opacity-0  
                  transition-opacity duration-200 group-hover:opacity-100"
              >
                Light
              </span>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-fit w-40 p-5 bg-gray-300 rounded-2xl ">
            <div className="flex items-center justify-center gap-2 h-15">
              <div>
                <User2Icon size={40} />
              </div>
              <div className="flex flex-col  justify-center">
                <h1>Administrator</h1>
                <p>admin</p>
              </div>
            </div>

            <div>
              <button
                className="group flex items-center rounded-full h-10 w-10 
               bg-black text-white hover:w-30 transition-all duration-300 
             overflow-hidden px-3"
              >
                <LogOut
                  size={20}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />

                <span
                  className="ml-4 opacity-0  
                  transition-opacity duration-200 group-hover:opacity-100"
                >
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
