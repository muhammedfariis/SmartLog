
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../../Api/api";
import { Card } from "../../common/card";

const DashboardAdmin = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);

  const loadData = async () => {
    try {
      const [d1, v1, a1, disp1] = await Promise.all([
        API.get("/addteamMembers/alldrivers"),
        API.get("/vehicleassignations/allvehicles"),
        API.get("/assigndrivers/assignmentShedule"),
        API.get("/addteamMembers/alldispatchers"),
      ]);

      setDrivers(d1.data.readDriver || []);
      setVehicles(v1.data.vehicles || []);
      setAssignments(a1.data.Assignments || []);
      setDispatchers(disp1.data.readdisp || []);
    } catch (err) {
      console.log("dashboard load error", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const statusCount = (s) =>
    assignments.filter((a) => a.status === s).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-zinc-900 to-black text-white p-8 space-y-8">
      
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold text-violet-500">
          Admin Dashboard
        </h1>
        <p className="text-gray-400">
          Fleet & Driver & Assignment overview
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card
          title="Total Drivers"
          value={drivers.length}
          color="border-violet-600 bg-violet-950/40"
        />
        <Card
          title="Total Vehicles"
          value={vehicles.length}
          color="border-indigo-600 bg-indigo-950/40"
        />
        <Card
          title="Active Trips"
          value={statusCount("in_progress")}
          color="border-green-600 bg-green-950/40"
        />
        <Card
          title="Dispatchers"
          value={dispatchers.length}
          color="border-pink-600 bg-pink-950/40"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        {[
          ["Scheduled", "scheduled"],
          ["Assigned", "assigned"],
          ["Progress", "in_progress"],
          ["Completed", "completed"],
          ["Cancelled", "cancelled"],
        ].map(([label, key]) => (
          <div
            key={key}
            className="bg-zinc-900 border border-violet-700 rounded-xl p-4 text-center"
          >
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-xl font-bold text-violet-400">
              {statusCount(key)}
            </p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 border border-violet-600 rounded-2xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4 text-violet-400">
          Recent Assignments
        </h2>

        <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide pr-2">
          {assignments.map((a, i) => (
            <motion.div
              key={a._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex justify-between items-center bg-black border border-zinc-800 rounded-xl px-4 py-3"
            >
              <div>
                <p className="font-semibold text-sm">
                  {a.driver?.Name || "Driver"}
                </p>
                <p className="text-gray-400 text-xs">
                  {a.fromLocation} → {a.toLocation}
                </p>
              </div>

              <div className="text-right">
                <p className="text-violet-400 text-sm">
                  {a.vehicle?.NumberPlate}
                </p>
                <span className="text-xs text-gray-400">
                  {a.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-zinc-900 border border-violet-600 rounded-2xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4 text-violet-400">
          Vehicle KM Overview
        </h2>

        <div className="space-y-3">
          {vehicles.map((v) => (
            <div key={v._id}>
              <div className="flex justify-between text-sm mb-1">
                <span>{v.NumberPlate}</span>
                <span>{v.CurrentKm} km</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded">
                <div
                  className="bg-violet-600 h-2 rounded transition-all"
                  style={{ width: `${Math.min(v.CurrentKm / 10, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardAdmin;
