
import Buttons from "./button";
import {LogIn} from "lucide-react"
import Switch from "./toggle";
const LandingNav = () => {
  return (
    <>
      <nav className="w-full flex items-center justify-between  p-4 border-b-2 border-gray-800 shadow-md">
        <div className="flex items-center h-12 w-30">
          <img src="/images/logosmartlog-removebg-preview.png" alt="Logo" />
        </div>
         
        <div className="flex gap-5 items-center justify-center">
            <Switch/>
          <Buttons name= "GetReady" Icon={LogIn}/>
        </div>
      </nav>
    </>
  );
};

export default LandingNav;


