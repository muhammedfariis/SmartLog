import { Link } from "react-router-dom";
import ROUTEAUTH from "../../common/authPath";
import API from "../../Api/api";
import { useState } from "react";

const Login = () =>{

const [form , setForm] = useState({

})




 return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white px-4">
      <div className="flex flex-col gap-8 border-amber-300 border-2 rounded-4xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="flex items-center text-4xl font-bold h-20 w-40 text-violet-400">
            <img
              className=""
              src="/images/logosmartlog-removebg-preview.png"
              alt=""
            />
          </div>
          <p className="text-gray-300 text-center">Fleet Management Platform</p>
        </div>

        <h1 className="text-3xl font-bold text-center">Login</h1>

        <form className="flex flex-col gap-4">
          
          <input
            className="h-12 w-full p-2 border-2 border-violet-400 rounded-3xl bg-black text-white"
            type="text"
            placeholder="userName"
            required
          />
          <input
            className="h-12 w-full p-2 border-2 border-violet-400 rounded-3xl bg-black text-white"
            type="password"
            placeholder="Password"
            required
          />

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" required className="accent-violet-400" />I
            agree to the{" "}
            <Link to="/terms" className="text-violet-400 hover:underline">
              Terms & Conditions
            </Link>
          </label>

          <button
            type="submit"
            className="h-12 w-full bg-violet-400 text-black font-semibold rounded-3xl hover:bg-violet-500 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-400">
          Don't have an Account?{" "}
          <Link
            to={ROUTEAUTH.REGISTER}
            className="text-violet-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );

}

export default Login