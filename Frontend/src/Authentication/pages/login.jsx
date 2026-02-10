import { Link, useNavigate } from "react-router-dom";
import ROUTEAUTH from "../../common/authPath";
import API from "../../Api/api";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const api = await API.post("/authentication/login", form);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);

      const role = api.data.user.role;

      setTimeout(() => {
        if (role === "admin") navigate("/admin/vehicles");
        else if (role === "dispatcher") navigate("/dispatcher/assignment");
        else if (role === "driver") navigate("/drivers/trips");
      }, 1200);

      setForm({ userName: "", password: "" });

    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Login failed";

      setErrorMsg(msg);
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white px-4 relative">

      <div
        className={`absolute top-8 transition-all duration-500 transform
        ${showError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
        bg-red-900/80 backdrop-blur-md border border-red-500
        text-red-200 px-6 py-4 rounded-2xl shadow-2xl`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">⛔</span>
          <div>
            <p className="font-bold">Access Denied</p>
            <p className="text-sm">{errorMsg}</p>
          </div>
        </div>
      </div>

      <div
        className={`absolute top-8 transition-all duration-500 transform
        ${showSuccess ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
        bg-green-900/80 backdrop-blur-md border border-green-500
        text-green-200 px-6 py-4 rounded-2xl shadow-2xl`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-bold">Login Completed</p>
            <p className="text-sm">Redirecting...</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 border-amber-300 border-2 rounded-4xl p-8 max-w-md w-full">

        <div className="flex flex-col items-center">
          <div className="flex items-center text-4xl font-bold h-20 w-40 text-violet-400">
            <img
              src="/images/logosmartlog-removebg-preview.png"
              alt=""
            />
          </div>
          <p className="text-gray-300 text-center">
            Fleet Management Platform
          </p>
        </div>

        <h1 className="text-3xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            className="h-12 w-full p-2 border-2 border-violet-400 rounded-3xl bg-black text-white focus:ring-2 focus:ring-violet-500 outline-none"
            type="text"
            placeholder="userName"
            name="userName"
            required
            value={form.userName}
            onChange={handleChange}
          />

          <input
            className="h-12 w-full p-2 border-2 border-violet-400 rounded-3xl bg-black text-white focus:ring-2 focus:ring-violet-500 outline-none"
            type="password"
            placeholder="Password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
          />

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" required className="accent-violet-400" />
            I agree to the
            <Link to="/terms" className="text-violet-400 hover:underline">
              Terms & Conditions
            </Link>
          </label>

          <button
            type="submit"
            className="h-12 w-full bg-violet-400 text-black font-semibold rounded-3xl
            hover:bg-violet-500 transition transform hover:scale-105 active:scale-95"
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
};

export default Login;
