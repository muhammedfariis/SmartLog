import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <>
      <header className="h-20  w-full ">
        <nav className="pl-5 pr-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center w-40 h-20">
              <img
                src="/images/logosmartlog-removebg-preview.png"
                alt=""
              />
            </div>
            <div className="flex gap-10 rounded-2xl h-12 w-fit p-5 text-white bg-gray-900 justify-center items-center">
              <Link to="/">Home</Link>
              <Link to="/vehicles">Assignation</Link>
              <Link to="/drivers">AssignedDrivers</Link>
            </div>

            <div className="flex items-center justify-center w-40 h-20">
              <button className="h-10 w-20 bg-white rounded-2xl">toggle</button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default AdminNavbar;
