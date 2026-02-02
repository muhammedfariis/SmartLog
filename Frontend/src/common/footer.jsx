import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black border-t-2 border-gray-700 text-gray-300 py-8  mt-20">
      <div className="  px-6 flex   justify-between items-center gap-4">
        <div className="text-lg flex flex-col h-fit w-fit ">
          <img
            className="w-40 h-30 hover:scale-150 transition-all duration-500 ease-in-out"
            src="/images/logosmartlog-removebg-preview.png"
            alt=""
          />
          © {new Date().getFullYear()} SmartLog Platform
        </div>

        <div className="flex gap-6 text-lg">
          <Link to="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link to="/faq" className="hover:text-white">
            FaQ
          </Link>
          <Link to="/services" className="hover:text-white">
            Services
          </Link>
          <Link to="/register" className="hover:text-white">
            GetReady
          </Link>
        </div>

        <div className="text-lg text-center md:text-right">
          <p>muhammedfariis101@gmail.com</p>
          <p className="text-gray-500">Developed by Muhammed Faris</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
