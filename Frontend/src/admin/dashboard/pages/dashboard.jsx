import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../../../Api/api";
import { Card } from "../../../common/card";
import SpaceBackground from "../../../common/stardust";
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
      <SpaceBackground />

      <div className={styles.contentWrapper}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className={styles.headerSection}
        >
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>Fleet & Driver & Assignment overview</p>
        </motion.div>

        <div className={styles.statsGrid}>
          <Card
            title="Total Drivers"
            value={drivers.length}
            color={styles.cardDrivers}
          />
          <Card
            title="Total Vehicles"
            value={vehicles.length}
            color={styles.cardvehicles}
          />
          <Card
            title="Active Trips"
            value={statusCount("in_progress")}
            color={styles.cardTrips}
          />
          <Card
            title="Dispatchers"
            value={dispatchers.length}
            color={styles.cardDispatcher}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.statusGrid}
        >
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.panel}
          >
            <h2 className={styles.panelTitle}>Recent Assignments</h2>

            <div className={styles.scrollList}>
              {assignments.map((a, i) => (
                <motion.div
                  key={a._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={styles.assignmentItem}
                >
                  <div>
                    <p className={styles.driverName}>
                      {a.driver?.Name.toUpperCase() || "Driver"}
                    </p>
                    <p className={styles.locationText}>
                      {a.fromLocation.toUpperCase()} → {a.toLocation.toUpperCase()}
                    </p>
                  </div>

                  <div className={styles.rightAlign}>
                    <p className={styles.vehiclePlate}>
                      {a.vehicle?.NumberPlate.toUpperCase()}
                    </p>
                    <span className={styles.statusText}>{a.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${styles.panel} ${styles.panelBlur3xl}`}
          >
            <h2 className={styles.panelTitle}>Vehicle KM Overview</h2>

            <div className={styles.scrollList}>
              {vehicles.map((v) => (
                <div key={v._id}>
                  <div className={styles.progressContainer}>
                    <span>{v.NumberPlate.toUpperCase()}</span>
                    <span>{v.CurrentKm} km</span>
                  </div>

                  <div className={styles.progressBarTrack}>
                    <div
                      className={styles.progressBarFill}
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