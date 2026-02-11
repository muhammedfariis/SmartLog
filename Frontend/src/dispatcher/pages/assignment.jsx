import { CalendarDays, ArrowBigRight } from "lucide-react";

import DateTimePicker from "../../common/datepicker";
import { useEffect, useState } from "react";
import API from "../../Api/api";
const Assignment = () => {
  const [driver, setDriver] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [assignment, setAssignment] = useState([]);

  const [form, setForm] = useState({
    driver: "",
    vehicle: "",
    scheduledDate: "",
    fromLocation: "",
    toLocation: "",
    load: "",
    status: "",
  });

  useEffect(() => {
    API.get("/vehicleassignations/bystatus")
      .then((response) => {
        console.log("Vehicle API Response:", response.data);
        setVehicle(response.data.vehicleActive || []);
      })
      .catch((err) => console.log("Vehicle API error:", err));

    API.get("/addteamMembers/alldrivers")
      .then((res) => {
        console.log("Driver API Response:", res.data);
        setDriver(res.data.readDriver || []);
      })
      .catch((err) => console.log("Driver API error:", err));
  }, []);

  const loadAssignments = async () => {
    try {
      const res = await API.get("/assigndrivers/assignmentShedule");
      setAssignment(res.data.Assignments || []);
    } catch (err) {
      console.log("assignment fetch error:", err);
      setAssignment([]);
    }
  };


   const statusBadge = (status) => {
  switch (status) {
    case "assigned":
      return "bg-green-900 text-green-300 border-green-700";

    case "in_progress":
      return "bg-violet-900 text-violet-300 border-violet-700";

    case "cancelled":
      return "bg-red-900 text-red-300 border-red-700";

    case "returned":
      return "bg-blue-900 text-blue-300 border-blue-700";

    case "completed":
      return "bg-orange-900 text-orange-300 border-orange-700";

    default:
      return "bg-gray-800 text-gray-300 border-gray-600";
  }
};




  useEffect(() => {
    loadAssignments();
      const interval = setInterval(() => {
    loadAssignments();
  }, 5000); 

  return () => clearInterval(interval);
  }, []);

  const assignDrivers = async (e) => {
    console.log(form);

    e.preventDefault();

    try {
      const api = await API.post("/assigndrivers/assignment", form);

      console.log(api);
      alert("assignation completed");
      loadAssignments();
      setForm({
        driver: "",
        vehicle: "",
        scheduledDate: "",
        fromLocation: "",
        toLocation: "",
        load: "",
        status: "",
      });
    } catch (err) {
      console.error(err);
      alert("assignation failed");
    }
  };

  const onchanging = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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
            <select
              className="w-full bg-black border border-violet-500 rounded-xl appearance-none p-3 outline-none"
              value={form.vehicle}
              name="vehicle"
              onChange={onchanging}
            >
              <option value="">Select Vehicle</option>
              {vehicle.map((veh) => (
                <option key={veh._id} value={veh._id}>
                  {veh.NumberPlate}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Select Driver</label>
            <select
              className="w-full bg-black border  border-violet-500 rounded-xl appearance-none p-3 outline-none"
              value={form.driver}
              name="driver"
              onChange={onchanging}
            >
              <option value="">Select Driver</option>
              {driver.map((data) => (
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
                value={form.scheduledDate || null}
                onChange={(date) =>
                  setForm({ ...form, scheduledDate: date || "" })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Load</label>

            <div className="flex items-center gap-3 bg-black border border-violet-500 rounded-xl p-3">
              <input
                className="outline-none text-white p-2 h-7"
                type="text"
                name="load"
                value={form.load}
                onChange={onchanging}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Status</label>

            <select
              name="status"
              value={form.status}
              onChange={onchanging}
              className="w-full bg-black border border-violet-500 rounded-xl p-3 appearance-none outline-none"
            >
              <option value="">Select Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Location Assign</label>

            <div className="flex items-center gap-3 bg-black border border-violet-500 rounded-xl p-3">
              <div className="flex justify-between items-center gap-35">
                <input
                  className="h-8 w-fit rounded-2xl outline-none text-white p-2 bg-violet-800"
                  type="text"
                  placeholder="From"
                  name="fromLocation"
                  value={form.fromLocation}
                  onChange={onchanging}
                />
                <input
                  className="h-8 w-fit rounded-2xl outline-none text-white p-2  bg-violet-800"
                  type="text"
                  placeholder="To"
                  name="toLocation"
                  value={form.toLocation}
                  onChange={onchanging}
                />
              </div>
            </div>
          </div>

          <button
            className="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-xl font-medium"
            onClick={assignDrivers}
          >
            Assign Driver
          </button>
        </div>

        <div className="bg-zinc-900 border border-violet-500/40 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Assignments</h2>
            <div className="h-fit p-2 space-y-3">
  {assignment.map((d) => (
    <div
      key={d._id}
      className="flex items-center justify-between gap-3 px-5 py-3 w-full 
                 border border-violet-600 bg-black rounded-3xl h-16"
    >

      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-400">Driver</p>
        <p className="text-sm text-lime-400 font-semibold truncate">
          {d.driver?.Name?.toUpperCase()}
        </p>
      </div>

      <ArrowBigRight size={20} className="text-violet-500 shrink-0" />

      <div className="min-w-0 flex-1 text-center">
        <p className="text-xs text-gray-400">Vehicle</p>
        <p className="text-sm text-yellow-300 font-semibold truncate">
          {d.vehicle?.NumberPlate?.toUpperCase()}
        </p>
      </div>

      <div className="shrink-0">
        <span className={`px-3 py-1 rounded-full border text-xs whitespace-nowrap ${statusBadge(d.status)}`}>
          {d.status}
        </span>
      </div>

    </div>
  ))}
</div>

       
        </div>
      </div>
    </div>
  );
};

export default Assignment;
