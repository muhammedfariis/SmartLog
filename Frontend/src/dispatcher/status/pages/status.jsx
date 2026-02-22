import { useEffect, useState } from "react";
import { Users, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../../Api/api";
import PageMotion from "../../../common/pagemotion";
import Switch from "../../../common/toggle";
import styles from "./status.module.css"; 

const Status = () => {
  const [view, setView] = useState("driver"); 
  const [driverlist, setDriverlist] = useState([]);
  const [displist, setDisplist] = useState([]);

  const drivers = async () => {
    try {
      const api = await API.get("/addteamMembers/alldrivers");
      setDriverlist(api.data.readDriver || []);
    } catch (err) {
      console.error(err);
    }
  };

  const dispatch = async () => {
    try {
      const api = await API.get("/addteamMembers/alldispatchers");
      setDisplist(api.data.readdisp || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    drivers();
    dispatch();
  }, []);

  return (
    <PageMotion>
      <div className={styles.mainWrapper}>
        <div className={styles.container}>
          
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.title}>Team Status</h1>
              <p className={styles.subtitle}>Drivers and Dispatchers Management</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <Switch />
              <div className={styles.tabSwitcher}>
                <button 
                  className={view === "driver" ? styles.activeTab : styles.inactiveTab}
                  onClick={() => setView("driver")}
                >
                  Drivers
                </button>
                <button 
                  className={view === "dispatcher" ? styles.activeTab : styles.inactiveTab}
                  onClick={() => setView("dispatcher")}
                >
                  Dispatchers
                </button>
              </div>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <AnimatePresence mode="wait">
              {view === "driver" ? (
                <motion.div
                  key="driver"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`${styles.tableGrid} ${styles.tableHeader} ${styles.driverCols}`}>
                    <div>DRIVER</div>
                    <div>USERNAME</div>
                    <div>LICENCE-INFO</div>
                    <div>STATUS</div>
                  </div>
                  {driverlist.map((d, i) => (
                    <motion.div
                      key={d._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`${styles.tableGrid} ${styles.tableRow} ${styles.driverCols}`}
                    >
                      <div className={styles.primaryText}>{d.Name.toUpperCase()}</div>
                      <div className={styles.secondaryText}>{d.userName.toUpperCase()}</div>
                      <div>
                        <span className={styles.plateBadge}>{d.LicenceInfo.toUpperCase()}</span>
                      </div>
                      <div>
                        <span className={styles.statusBadge} data-status="active">Online</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="dispatcher"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`${styles.tableGrid} ${styles.tableHeader} ${styles.dispatcherCols}`}>
                    <div>DISPATCHER</div>
                    <div>USERNAME</div>
                    <div>ROLE</div>
                  </div>
                  {displist.map((dis, i) => (
                    <motion.div
                      key={dis._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`${styles.tableGrid} ${styles.tableRow} ${styles.dispatcherCols}`}
                    >
                      <div className={styles.primaryText}>{dis.Name.toUpperCase()}</div>
                      <div className={styles.secondaryText}>{dis.userName.toUpperCase()}</div>
                      <div>
                        <span className={styles.statusBadge} data-status="staff">Dispatcher</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </PageMotion>
  );
};

export default Status;