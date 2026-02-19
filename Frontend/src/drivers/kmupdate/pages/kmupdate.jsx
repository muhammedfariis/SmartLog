import { useState , useEffect } from "react";
import API from "../../Api/api";
import { useLocation } from "react-router-dom";

const Kmupdate = () => {

  const location = useLocation();

  const [km , setKm] = useState({
    vehicleId : "",
    assignmentId : "",
    endKm : "" ,
    startKm : ""
  });

  const [showMsg , setShowMsg] = useState(false);
  const [msgType , setMsgType] = useState("success");
  const [msgText , setMsgText] = useState("");

  const loadVehicleKm = async(vehicleId)=>{
    try{
      const res = await API.get(`/vehicleassignations/startkm/${vehicleId}`);
      const currentKm = res.data.vehicle.CurrentKm;

      setKm(prev => ({
        ...prev,
        startKm: currentKm
      }));

    }catch(err){
      console.error(err);
    }
  };

  useEffect(() => {
    if (location.state) {
      const { vehicleId, assignmentId } = location.state;

      setKm(prev => ({
        ...prev,
        vehicleId,
        assignmentId
      }));

      loadVehicleKm(vehicleId);
    }
  }, [location.state]);

  const updateKm = async (e) =>{
    e.preventDefault();

    try{
      const res = await API.post("/updatekilometer/updateKm" , km);

      setMsgType("success");
      setMsgText("KM Updated Successfully ✅");
      setShowMsg(true);

      setKm({
        vehicleId : '',
        assignmentId : '',
        endKm : '',
        startKm : ""
      });

    }catch(err){
      console.error(err);

      setMsgType("error");
      setMsgText(
        err?.response?.data?.message || "KM Update Failed ❌"
      );
      setShowMsg(true);
    }

    setTimeout(()=> setShowMsg(false), 3000);
  };

  const handle = (e)=>{
    setKm({
      ...km,
      [e.target.name] : e.target.value 
    });
  };

  return (
    <div className="space-y-6 max-w-3xl relative">

      <div
        className={`absolute top-0 right-0 transition-all duration-500 transform
        ${showMsg ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
        ${msgType === "success"
          ? "bg-green-900/80 border-green-500 text-green-200"
          : "bg-red-900/80 border-red-500 text-red-200"}
        backdrop-blur-md border px-6 py-4 rounded-2xl shadow-2xl`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">
            {msgType === "success" ? "✅" : "⛔"}
          </span>
          <div>
            <p className="font-bold">
              {msgType === "success" ? "Success" : "Failed"}
            </p>
            <p className="text-sm">{msgText}</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-violet-500">
          Kilometers Update
        </h1>
        <p className="text-gray-400">
          Update trip kilometer details
        </p>
      </div>

      <form onSubmit={updateKm}
        className="bg-black border border-violet-500 rounded-2xl shadow p-6 space-y-6">

        <div className="grid md:grid-cols-2 gap-5">

          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Starting KM</label>
            <input
              type="number"
              value={km.startKm}
              name="startKm"
              readOnly
              className="w-full p-3 rounded-xl bg-zinc-900 border border-violet-500 text-white outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Ending KM</label>
            <input
              type="number"
              value={km.endKm}
              name="endKm"
              onChange={handle}
              className="w-full p-3 rounded-xl bg-zinc-900 border border-violet-500 text-white outline-none"
            />
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Assignment ID</label>
            <input
              type="text"
              value={km.assignmentId}
              name="assignmentId"
              onChange={handle}
              className="w-full p-3 rounded-xl bg-zinc-900 border border-violet-500 text-white outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Vehicle ID</label>
            <input
              type="text"
              value={km.vehicleId}
              name="vehicleId"
              onChange={handle}
              className="w-full p-3 rounded-xl bg-zinc-900 border border-violet-500 text-white outline-none"
            />
          </div>

        </div>

        <div className="bg-violet-900/20 border border-violet-500/40 rounded-xl p-4 text-sm text-gray-300">
          Make sure KM values are accurate before updating.
        </div>

        <div className="flex justify-end">
          <button type="submit"
            className="w-full md:w-48 py-3 rounded-xl font-semibold
            bg-violet-600 hover:bg-violet-700 transition">
            Update
          </button>
        </div>

      </form>
    </div>
  );
};

export default Kmupdate;
