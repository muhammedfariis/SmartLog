import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../../../Api/api";
import { Card } from "../../../common/card";
import SpaceBackground from "../../../common/spacebackground/stardust";
import styles from "./dashboard.module.css";

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
    <div className={styles.dashboardContainer}>
      

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.headerSection}
      >
        <h1 className={styles.title}>Admin Dashboard</h1>
        <p className={styles.subtitle}>Fleet & Driver & Assignment overview</p>
      </motion.div>

      <div className={styles.statsGrid}>
        <Card title="Total Drivers" value={drivers.length} color={styles.cardDrivers} />
        <Card title="Total Vehicles" value={vehicles.length} color={styles.cardvehicles} />
        <Card title="Active Trips" value={statusCount("in_progress")} color={styles.cardTrips} />
        <Card title="Dispatchers" value={dispatchers.length} color={styles.cardDispatcher} />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.statusGrid}>
        {[
          ["Scheduled", "scheduled"],
          ["Assigned", "assigned"],
          ["Progress", "in_progress"],
          ["Completed", "completed"],
          ["Cancelled", "cancelled"],
        ].map(([label, key]) => (
          <div key={key} className={styles.statusCard}>
            <p className={styles.statusLabel}>{label}</p>
            <p className={styles.statusValue}>{statusCount(key)}</p>
          </div>
        ))}
      </motion.div>

      <div className={styles.panelsContainer}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className={styles.panel}>
          <h2 className={styles.panelTitle}>Recent Assignments</h2>
          <div className={styles.scrollList}>
            {assignments.map((a, i) => (
              <motion.div
                key={a._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={styles.assignmentItem}
              >
                <div>
                  <p className={styles.driverName}>{a.driver?.Name.toUpperCase() || "Driver"}</p>
                  <p className={styles.locationText}>
                    {a.fromLocation.toUpperCase()} → {a.toLocation.toUpperCase()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className={styles.vehiclePlate}>{a.vehicle?.NumberPlate.toUpperCase()}</p>
                  <span className={styles.statusText}>{a.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className={styles.panel}>
          <h2 className={styles.panelTitle}>Vehicle KM Overview</h2>
          <div className={styles.scrollList}>
            {vehicles.map((v) => (
              <div key={v._id}>
                <div className={styles.progressContainer}>
                  <span style={{ color: 'var(--text-primary)' }}>{v.NumberPlate.toUpperCase()}</span>
                  <span style={{ color: '#8b5cf6' }}>{v.CurrentKm} km</span>
                </div>
                <div className={styles.progressBarTrack}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(v.CurrentKm / 1000, 100)}%` }} // Adjusted divisor for better visual representation
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={styles.progressBarFill}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardAdmin;