import { useState, useEffect } from "react";
import API from "../../../Api/api";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Undo2, MapPin, Truck,CircleX, Box, Calendar, Play, CheckCircle, XCircle, RefreshCcw, AlertCircle, ChevronRight } from "lucide-react";
import PageMotion from "../../../common/pagemotion";
import Switch from "../../../common/toggle";
import styles from "./mytrips.module.css";

const Mytrips = () => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState([]);

  const loadTrips = async () => {
    try {
      const api = await API.get("/assigndrivers/mytrips");
      setTrip(api.data.trips || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const updateStatus = async (assignmentId, status) => {
    try {
      await API.patch(`/assigndrivers/driverStatus`, { assignmentId, status });
      loadTrips();
    } catch (err) {
      console.error(err);
    }
  };

  const getActions = (t) => {
    switch (t.status) {
      case "scheduled":
        return <button className={`${styles.btn} ${styles.btnReady}`} onClick={() => updateStatus(t._id, "assigned")}><CheckCircle size={20}/> Confirm My Presence</button>;
      case "assigned":
        return <button className={`${styles.btn} ${styles.btnStart}`} onClick={() => updateStatus(t._id, "in_progress")}><Play size={20}/> Start Trip Engine</button>;
      case "in_progress":
        return (
          <div className={styles.actionsContainer}>
            <button className={`${styles.btn} ${styles.btnComplete}`} onClick={() => updateStatus(t._id, "completed")}><CheckCircle size={20}/> Mark as Delivered</button>
            <button className={`${styles.btn} ${styles.btnCancel}`} onClick={() => updateStatus(t._id, "cancelled")}><XCircle size={20}/> Cancel Mission</button>
          </div>
        );
      case "cancelled":
        return <button className={`${styles.btn} ${styles.btnReturn}`} onClick={() => updateStatus(t._id, "returning")}><RefreshCcw size={20}/> Start Return Trip</button>;
        case "returning" : 
        return <button className={`${styles.btn} ${styles.btnReturned}`} onClick={() => updateStatus(t._id, "returned")}><Undo2 size={20}/>Complete Return </button>;
        case "returned" : 
        return <button className={`${styles.btn} ${styles.btnClose}`} onClick={() => updateStatus(t._id, "completed")}><CircleX size={20}/>Close Trip </button>;

        
      default:
        return null;
    }
  };

  return (
    <PageMotion>
      <div className={styles.mainWrapper}>
        <div className={styles.container}>
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.title}>Trip Dashboard</h1>
              <p className={styles.subtitle}>Manage your active assignments</p>
            </div>
            <Switch />
          </div>

          <div className={styles.list}>
            <AnimatePresence mode="popLayout">
              {trip.length > 0 ? (
                trip.map((t, i) => (
                  <motion.div
                    key={t._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={styles.card}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.tripId}>ID: {i + 10001}</span>
                      <span className={styles.statusBadge} data-status={t.status}>
                        {t.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className={styles.routeContainer}>
                      <div className={styles.routeItem}>
                        <MapPin size={18} color="#ef4444" />

                        <span>{t.fromLocation}</span>
                      </div>
                      <ChevronRight size={14} style={{ color: '#94a3b8'}} />
                      <div className={styles.routeItem}>
                        <span>{t.toLocation}</span>
                      </div>
                    </div>

                    <div className={styles.detailsGrid}>
                      <div className={styles.detailItem}><Truck size={16}/> {t.vehicle?.NumberPlate}</div>
                      <div className={styles.detailItem}><Box size={16}/> {t.load || "Standard Load"}</div>
                      <div className={styles.detailItem}><Calendar size={16}/> {new Date(t.scheduledDate).toLocaleDateString()}</div>
                    </div>

                    <div className={styles.actionsContainer}>
                      {getActions(t)}
                      
                      {t.status === "completed" && (
                        <button 
                          className={styles.updateBtn}
                          onClick={() => navigate("/drivers/kmupdate", { state: { assignmentId: t._id, vehicleId: t.vehicle?._id }})}
                        >
                           Update Kilometers
                        </button>
                      )}
                    </div>

                    <div className={styles.warningBanner}>
                      <AlertCircle size={20} />
                      <p>Ensure Ending KM matches dashboard before closing the trip.</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>You have no assigned trips at the moment.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageMotion>
  );
};

export default Mytrips;