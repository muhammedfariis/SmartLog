import { CalendarDays , ArrowBigRight } from "lucide-react";

import DateTimePicker from "../../common/datepicker";
import { useEffect, useState } from "react";
import API from "../../Api/api";
const Assignment = () => {
  const [driver, setDriver] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [assignment , setAssignment] = useState([])

  

  const [form, setForm] = useState({
    driver: "",
    vehicle: "",
    scheduledDate: "",
    fromLocation: "",
    toLocation: "",
    load: "",
  });

  useEffect(() => {
    API.get("/vehicleassignations/allvehicles").then((response) =>
      setVehicle(response.data.vehicle),
    );

    API.get("/addteamMembers/alldrivers").then((res) =>
      setDriver(res.data.driver),
    );
  }, []);


  useEffect(()=>{
   API.get("/assigndrivers/assignmentShedule")
   .then((response)=>{
    setAssignment(response.data.Assignments)
   })
  },[])

  const assignDrivers = async (e) => {
    console.log(form);

    e.preventDefault();

    try {
      const api = await API.post("/assigndrivers/assignment", ...form);

      console.log(api);
      alert("assignation completed");
    } catch (err) {
      console.error(err);
      alert("assignation failed");
    }
  };

  const onchanging = (e)=>{
    setForm({
      ...form ,
      [e.target.name] : e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-violet-500">Dispatch Center</h1>
        <p className="text-gray-400">
          Schedule trips and manage driver assignments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-violet-500/40 rounded-2xl p-6 space-y-5 shadow-lg">
          <h2 className="text-xl font-semibold">New Assignment</h2>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Select Vehicle</label>
            <select className="w-full bg-black border border-violet-500 rounded-xl p-3 outline-none"
             value={form.vehicle}
             onChange={(e)=>setForm({...form , vehicle : e.target.value})}
            >
              <option>Select Vehicle</option>
             {vehicle.map((veh)=>(
              <option key={veh._id} value={veh._id}>
                {veh.NumberPlate}
              </option>
             ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Select Driver</label>
            <select className="w-full bg-black border  border-violet-500 rounded-xl p-3 outline-none"
            value={form.driver}
            onChange={(e)=>setForm({...form , driver : e.target.value})}
            >
              <option>Select Driver</option>
               {driver.map((data)=>(
                <option key={data._id} value={data._id}>
                  {data.Name}
                </option>
               ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Schedule Date</label>

            <div className="flex items-center gap-3 bg-black border border-violet-500 rounded-xl p-3">
              <CalendarDays size={18} />
              <DateTimePicker 
               onChange={(date)=>setForm({...form , scheduledDate : date})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Location Assign</label>

            <div className="flex items-center gap-3 bg-black border border-violet-500 rounded-xl p-3">
              <div className="flex justify-between items-center gap-35">
                <input
                  className="h-8 w-fit rounded-2xl outline-none text-white p-2 bg-violet-800"
                  type="text"
                  placeholder="From"
                  value={form.fromLocation}
                  onChange={onchanging}
                />
                <input
                  className="h-8 w-fit rounded-2xl outline-none text-white p-2  bg-violet-800"
                  type="text"
                  placeholder="To"
                  value={form.toLocation}
                  onChange={onchanging}
                />
              </div>
            </div>
          </div>

          <button className="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-xl font-medium"
            onClick={assignDrivers}
          >
            Assign Driver
          </button>
        </div>

        <div className="bg-zinc-900 border border-violet-500/40 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Assignments</h2>

          <div className="h-64 flex items-center justify-center text-gray-500">
             {assignment.map((d)=>(
              <div>
                {d.driver.Name} <ArrowBigRight/> {d.vehicle.NumberPlate}
              </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
