import { useState, useEffect } from "react";
import { Plus, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DateTimePicker from "../../../common/datepicker";
import API from "../../../Api/api";
import PageMotion from "../../../common/pagemotion";
import Switch from "../../../common/toggle";
import styles from "./assignment.module.css";

const Assignment = () => {
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [assignments, setAssignments] = useState([]);
  
  const [form, setForm] = useState({
    driver: "",
    vehicle: "",
    scheduledDate: null,
    fromLocation: "",
    toLocation: "",
    load: "",
    status: "scheduled",
  });

  const fetchData = async () => {
    try {
      const [vRes, dRes, aRes] = await Promise.all([
        API.get("/vehicleassignations/bystatus"),
        API.get("/addteamMembers/alldrivers"),
        API.get("/assigndrivers/assignmentShedule")
      ]);
      setVehicles(vRes.data.vehicleActive || []);
      setDrivers(dRes.data.readDriver || []);
      setAssignments((aRes.data.Assignments || []).filter(a => a.status !== "completed"));
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (msg) {
      const t = setTimeout(() => setMsg(null), 3000);
      return () => clearTimeout(t);
    }
  }, [msg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/assigndrivers/assignment", form);
      setMsg({ type: "success", text: "Driver Assigned Successfully" });
      setPopup(false);
      setForm({ driver: "", vehicle: "", scheduledDate: null, fromLocation: "", toLocation: "", load: "", status: "scheduled" });
      fetchData();
    } catch (err) {
      setMsg({ type: "error", text: "Assignment Failed" });
    }
  };

  return (
    <PageMotion>
      <div className={styles.mainWrapper}>
        <div className={styles.container}>
          
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.title}>Dispatch Center</h1>
              <p className={styles.subtitle}>Real-time management of transport assets</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <Switch />
              <button className={styles.addButton} onClick={() => setPopup(true)}>
                <Plus size={20} strokeWidth={3} /> New Assignment
              </button>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <div className={`${styles.tableGrid} ${styles.tableHeader}`}>
              <div>DRIVER</div>
              <div>VEHICLE</div>
              <div>LOAD</div>
              <div>FROM</div>
              <div>TO</div>
              <div>SCHEDULED</div>
              <div>STATUS</div>
            </div>

            <AnimatePresence>
              {assignments.length > 0 ? (
                assignments.map((a, i) => (
                  <motion.div
                    key={a._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`${styles.tableGrid} ${styles.tableRow}`}
                  >
                    <div style={{ fontWeight: 700, color: '#10b981' }}>{a.driver?.Name || "Unassigned"}</div>
                    <div className={styles.plateBadge}>{a.vehicle?.NumberPlate}</div>
                    <div>{a.load || 'General'}</div>
                    <div>{a.fromLocation}</div>
                    <div>{a.toLocation}</div>
                    <div>{a.scheduledDate ? new Date(a.scheduledDate).toLocaleDateString() : 'N/A'}</div>
                    <div>
                      <span className={styles.statusBadge} data-status={a.status}>
                        {a.status.replace('_', ' ')}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className={styles.emptyState}>No active assignments found</div>
              )}
            </AnimatePresence>
          </div>

          {popup && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalBackdrop} onClick={() => setPopup(false)} />
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Register Assignment</h2>
                <form onSubmit={handleSubmit} className={styles.modalForm}>
                  
                  <select required value={form.vehicle} onChange={(e)=>setForm({...form, vehicle: e.target.value})} className={styles.selectField}>
                    <option value="">Select Vehicle</option>
                    {vehicles.map(v => <option key={v._id} value={v._id}>{v.NumberPlate} ({v.brand})</option>)}
                  </select>

                  <select required value={form.driver} onChange={(e)=>setForm({...form, driver: e.target.value})} className={styles.selectField}>
                    <option value="">Select Driver</option>
                    {drivers.map(d => <option key={d._id} value={d._id}>{d.Name}</option>)}
                  </select>

                  <div className={styles.dateGrid}>
                    <input className={styles.inputField} placeholder="From Location" value={form.fromLocation} required onChange={(e)=>setForm({...form, fromLocation: e.target.value})} />
                    <input className={styles.inputField} placeholder="To Location" value={form.toLocation} required onChange={(e)=>setForm({...form, toLocation: e.target.value})} />
                  </div>

                  <input className={styles.inputField} placeholder="Load Details" value={form.load} onChange={(e)=>setForm({...form, load: e.target.value})} />

                  <div className={styles.dateInputBox}>
                    <CalendarDays size={18} />
                    <DateTimePicker value={form.scheduledDate} onChange={(d) => setForm({ ...form, scheduledDate: d })} />
                  </div>

                  <div className={styles.modalActions}>
                    <button type="button" className={styles.cancelBtn} onClick={() => setPopup(false)}>Cancel</button>
                    <button type="submit" className={styles.saveBtn}>Confirm</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {msg && (
            <div className={`${styles.alert} ${msg.type === "success" ? styles.successAlert : styles.errorAlert}`}>
              {msg.text}
            </div>
          )}
        </div>
      </div>
    </PageMotion>
  );
};

export default Assignment; 