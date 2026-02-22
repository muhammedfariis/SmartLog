import { useEffect, useState } from "react";
import { Plus, Trash, UserCheck, UserX, UserPlus } from "lucide-react";
import API from "../../../Api/api";
import { motion, AnimatePresence } from "framer-motion";
import PageMotion from "../../../common/pagemotion";
import SpaceBackground from "../../../common/spacebackground/stardust";
import Switch from "../../../common/toggle";
import styles from "./teamAdd.module.css";

const TeamAdd = () => {
  const [driverView, setDriverView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDriverForm, setIsDriverForm] = useState(true);
  const [msg, setMsg] = useState(null);
  const [driverlist, setDriverlist] = useState([]);
  const [displist, setDisplist] = useState([]);

  const [formDriver, setFormDriver] = useState({ Name: "", userName: "", password: "", LicenceInfo: "" });
  const [formDisp, setFormDisp] = useState({ Name: "", userName: "", password: "" });

  const fetchDrivers = async () => {
    try {
      const res = await API.get("/addteamMembers/alldrivers");
      setDriverlist(res.data.readDriver || []);
    } catch (err) { console.error(err); }
  };

  const fetchDisp = async () => {
    try {
      const res = await API.get("/addteamMembers/alldispatchers");
      setDisplist(res.data.readdisp || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchDrivers(); fetchDisp(); }, []);
  useEffect(() => {
    if (msg) { const t = setTimeout(() => setMsg(null), 3000); return () => clearTimeout(t); }
  }, [msg]);

  const handleDriverChange = (e) => setFormDriver({ ...formDriver, [e.target.name]: e.target.value });
  const handleDispChange = (e) => setFormDisp({ ...formDisp, [e.target.name]: e.target.value });

  const submitForm = async (e) => {
    e.preventDefault();
    const endpoint = isDriverForm ? "/addteamMembers/createDrivers" : "/addteamMembers/createDispatchers";
    const payload = isDriverForm ? { ...formDriver, role: "driver" } : { ...formDisp, role: "dispatcher" };
    
    try {
      await API.post(endpoint, payload);
      setMsg({ type: "success", text: `${isDriverForm ? "Driver" : "Dispatcher"} added successfully` });
      setShowModal(false);
      isDriverForm ? (setFormDriver({ Name: "", userName: "", password: "", LicenceInfo: "" }), fetchDrivers()) 
                   : (setFormDisp({ Name: "", userName: "", password: "" }), fetchDisp());
    } catch (err) { setMsg({ type: "error", text: "Failed to create member" }); }
  };

  const deleteMember = async (id, type) => {
    if (!window.confirm("Permanent delete this member?")) return;
    try {
      type === 'driver' ? await API.delete(`/addteamMembers/deleteDrivers/${id}`) : await API.delete(`/addteamMembers/deleteDispatchers/${id}`);
      setMsg({ type: "success", text: "Member removed" });
      type === 'driver' ? fetchDrivers() : fetchDisp();
    } catch (err) { setMsg({ type: "error", text: "Delete failed" }); }
  };

  const toggleBlock = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "blocked" ? "un-blocked" : "blocked";
      await API.patch(`/addteamMembers/blockDispatcher/${id}`, { status: newStatus });
      setMsg({ type: "success", text: `User ${newStatus}` });
      fetchDrivers(); fetchDisp();
    } catch (err) { console.error(err); }
  };

  return (
    <PageMotion>
      <div className="dark:block hidden">
        <SpaceBackground />
      </div>

      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Team Members</h1>
            <p className={styles.subtitle}>Manage drivers and dispatchers authority</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Switch />
            <button className={styles.addButton} onClick={() => { setIsDriverForm(true); setShowModal(true); }}>
              <UserPlus size={20} strokeWidth={2.5} /> Add Team Member
            </button>
          </div>
        </div>

        <div className={styles.tabContainer}>
          <button 
            className={`${styles.tabButton} ${driverView ? styles.activeTab : ""}`}
            onClick={() => setDriverView(true)}
          >
            Drivers
          </button>
          <button 
            className={`${styles.tabButton} ${!driverView ? styles.activeTab : ""}`}
            onClick={() => setDriverView(false)}
          >
            Dispatchers
          </button>
        </div>

        <div className={styles.tableContainer}>
          <div className={`${styles.tableGrid} ${styles.tableHeader} ${driverView ? styles.driverGrid : styles.dispatcherGrid}`}>
            <div>FULL NAME</div>
            <div>USERNAME</div>
            {driverView && <div>LICENSE INFO</div>}
            <div>STATUS</div>
            <div>ACTIONS</div>
          </div>

          <AnimatePresence mode="wait">
            {(driverView ? driverlist : displist).map((member, i) => (
              <motion.div
                key={member._id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`${styles.tableGrid} ${styles.tableRow} ${driverView ? styles.driverGrid : styles.dispatcherGrid}`}
              >
                <div style={{ fontWeight: 700 }}>{(member.Name || "").toUpperCase()}</div>
                <div style={{ color: "var(--text-muted)" }}>{member.userName}</div>
                {driverView && <div style={{ fontWeight: 600 }}>{member.LicenceInfo || "N/A"}</div>}
                <div>
                    <span style={{ 
                        color: member.status === 'blocked' ? '#ef4444' : '#22c55e',
                        fontSize: '0.8rem', fontWeight: 800
                    }}>
                        {(member.status || 'ACTIVE').toUpperCase()}
                    </span>
                </div>
                <div className={styles.actionWrapper}>
                  <button className={`${styles.iconBtn} ${styles.deleteBtn}`} onClick={() => deleteMember(member._id, driverView ? 'driver' : 'disp')}>
                    <Trash size={18} />
                    <span className={styles.btnLabel}>Remove</span>
                  </button>
                  <button onClick={() => toggleBlock(member._id, member.status)} className={`${styles.iconBtn} ${styles.statusBtn}`}>
                    {member.status === 'blocked' ? <UserCheck size={18} /> : <UserX size={18} />}
                    <span className={styles.btnLabel}>{member.status === 'blocked' ? "Unblock" : "Block User"}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalBackdrop} onClick={() => setShowModal(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={styles.modalContent}>
              <h2 className={styles.modalTitle}>New {isDriverForm ? "Driver" : "Dispatcher"}</h2>
              
              <div className={styles.tabContainer} style={{ width: '100%', marginBottom: '1.5rem' }}>
                    <button className={`${styles.tabButton} ${isDriverForm ? styles.activeTab : ""}`} style={{ flex: 1 }} onClick={() => setIsDriverForm(true)}>Driver</button>
                    <button className={`${styles.tabButton} ${!isDriverForm ? styles.activeTab : ""}`} style={{ flex: 1 }} onClick={() => setIsDriverForm(false)}>Dispatcher</button>
              </div>

              <form onSubmit={submitForm} className={styles.modalForm}>
                <input className={styles.inputField} placeholder="Full Name" name="Name" value={isDriverForm ? formDriver.Name : formDisp.Name} onChange={isDriverForm ? handleDriverChange : handleDispChange} required />
                <input className={styles.inputField} placeholder="Username" name="userName" value={isDriverForm ? formDriver.userName : formDisp.userName} onChange={isDriverForm ? handleDriverChange : handleDispChange} required />
                <input className={styles.inputField} placeholder="Password" name="password" type="password" value={isDriverForm ? formDriver.password : formDisp.password} onChange={isDriverForm ? handleDriverChange : handleDispChange} required />
                {isDriverForm && <input className={styles.inputField} placeholder="License Information" name="LicenceInfo" value={formDriver.LicenceInfo} onChange={handleDriverChange} required />}
                
                <div className={styles.modalActions}>
                  <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className={styles.saveBtn}>Create Member</button>
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
    </PageMotion>
  );
};

export default TeamAdd;