import { Link } from "react-router-dom";
import { User2Icon, LogOut } from "lucide-react";
const AdminNavbar = () => {
  return (
    <>
      <div className="min-h-screen  w-fit ">
        <div className="flex min-h-screen flex-col justify-between items-center">
          <div className="flex items-center w-40 h-20">
            <img src="/images/logosmartlog-removebg-preview.png" alt="" />
          </div>
          <div className="flex flex-col gap-10  p-5 text-white justify-center items-center">
             
            <Link
              className="hover:bg-gray-800 rounded-2xl h-10 w-30 flex items-center justify-center"
              to="/vehicles"
            >
              Vehicles
            </Link>
            <Link
              className="hover:bg-gray-800 rounded-2xl h-10 w-30 flex items-center justify-center"
              to="/team"
            >
              Team
            </Link>
            <Link
              className="hover:bg-gray-800 rounded-2xl h-10 w-30 flex items-center justify-center"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </div>

          <div className="flex items-center justify-center w-40 h-20">
            <button className="h-10 w-20 bg-white rounded-2xl">toggle</button>
          </div>
          <div className="flex flex-col items-center justify-center h-fit w-fit p-5 bg-white rounded-2xl gap-2">
            <div className="flex items-center justify-center">
              <User2Icon size={30} />
              <h1>administrator</h1>
            </div>
            <div>
              <button
                className="group flex items-center rounded-full h-10 w-10 
               bg-black text-white hover:w-32 transition-all duration-300 
             verflow-hidden px-3"
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
