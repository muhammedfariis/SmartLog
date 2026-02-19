import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../../../Api/api";
import { Card } from "../../../common/card";
import SpaceBackground from "../../../common/stardust";
import styles from "./dashboard.module.css"

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

  const statusCount = (s) => assignments.filter((a) => a.status === s).length;

  return (
    <div className={styles.wrapper}>
      <SpaceBackground />

      <div className={styles.header}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          
        >
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>Fleet & Driver & Assignment overview</p>
        </motion.div>

        <div className={styles.cardGrid}>
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
          className="grid grid-cols-2 md:grid-cols-5 gap-4 shrink-0"
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
              className={styles.statusCard}
            >
              <p className={styles.statusLabel}>{label}</p>
              <p className={styles.statusValue}>{statusCount(key)}</p>
            </div>
          ))}
        </motion.div>

        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.panel}
          >
            <h2 className={styles.panelTitle}>
              Recent Assignments
            </h2>

            <div className={styles.scrollArea}>
              {assignments.map((a, i) => (
                <motion.div
                  key={a._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex justify-between items-center bg-black/50 border border-zinc-800 rounded-xl px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-sm">{a.driver?.Name.toUpperCase() || "Driver"}</p>
                    <p className="text-gray-400 text-xs">
                      {a.fromLocation.toUpperCase()} → {a.toLocation.toUpperCase()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-violet-400 text-sm">{a.vehicle?.NumberPlate.toUpperCase()}</p>
                    <span className="text-xs text-gray-400">{a.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 bg-zinc-900/70 border border-violet-600 rounded-2xl p-6 flex flex-col overflow-hidden backdrop-blur-3xl"
          >
            <h2 className="text-xl font-semibold mb-4 text-violet-400 shrink-0">
              Vehicle KM Overview
            </h2>

            <div className="space-y-3 flex-1 overflow-y-auto pr-2 scrollbar-hide">
              {vehicles.map((v) => (
                <div key={v._id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{v.NumberPlate.toUpperCase()}</span>
                    <span>{v.CurrentKm} km</span>
                  </div>

                  <div className="w-full bg-zinc-800/50 h-2 rounded">
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
      </div>
    </div>
  );
};

export default DashboardAdmin;
