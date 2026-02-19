import { useEffect, useState } from "react";
import { Plus, Trash, Ban, CircleSlash2 } from "lucide-react";
import API from "../../../Api/api";
import { motion } from "framer-motion";
import PageMotion from "../../../common/pagemotion";
import SpaceBackground from "../../../common/spacebackground/stardust";
import styles from "./teamAdd.module.css";

const TeamAdd = () => {
  const [driverView, setDriverView] = useState(true);
  const [dispatcherView, setDispatcherView] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDriverForm, setIsDriverForm] = useState(true);

  const [msg, setMsg] = useState(null);
  const [driverlist, setDriverlist] = useState([]);
  const [displist, setDisplist] = useState([]);

  const [formDriver, setFormDriver] = useState({
    Name: "",
    userName: "",
    password: "",
    LicenceInfo: "",
  });

  const [formDisp, setFormDisp] = useState({
    Name: "",
    userName: "",
    password: "",
  });

  const getStatusUI = (status) => {
    const s = status ? status.toLowerCase() : "active";
    if (s === "blocked") {
      return {
        className: styles.statusBlocked,
        text: "Unblock",
        icon: <CircleSlash2 size={20} />,
      };
    }
    return {
      className: styles.statusActive,
      text: "Block User",
      icon: <Ban size={20} />,
    };
  };

  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 3000);
    return () => clearTimeout(t);
  }, [msg]);

  const fetchDrivers = async () => {
    try {
      const res = await API.get("/addteamMembers/alldrivers");
      setDriverlist(res.data.readDriver || []);
    } catch (err) {
      console.error("Fetch Drivers Error:", err);
    }
  };

  const fetchDisp = async () => {
    try {
      const res = await API.get("/addteamMembers/alldispatchers");
      setDisplist(res.data.readdisp || []);
    } catch (err) {
      console.error("Fetch Dispatchers Error:", err);
    }
  };

  useEffect(() => {
    fetchDrivers();
    fetchDisp();
  }, []);

  const handleDriverChange = (e) =>
    setFormDriver({ ...formDriver, [e.target.name]: e.target.value });
  const handleDispChange = (e) =>
    setFormDisp({ ...formDisp, [e.target.name]: e.target.value });

  const submitDriver = async (e) => {
    e.preventDefault();
    try {
      await API.post("/addteamMembers/createDrivers", {
        ...formDriver,
        role: "driver",
      });
      setMsg({ type: "success", text: "Driver created successfully" });
      setFormDriver({ Name: "", userName: "", password: "", LicenceInfo: "" });
      setShowModal(false);
      fetchDrivers();
    } catch (err) {
      setMsg({ type: "error", text: "Failed to create driver" });
    }
  };

  const submitDisp = async (e) => {
    e.preventDefault();
    try {
      await API.post("/addteamMembers/createDispatchers", {
        ...formDisp,
        role: "dispatcher",
      });
      setMsg({ type: "success", text: "Dispatcher created successfully" });
      setFormDisp({ Name: "", userName: "", password: "" });
      setShowModal(false);
      fetchDisp();
    } catch (err) {
      setMsg({ type: "error", text: "Failed to create dispatcher" });
    }
  };

  const deleteDriver = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/addteamMembers/deleteDrivers/${id}`);
      fetchDrivers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDispatcher = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/addteamMembers/deleteDispatchers/${id}`);
      fetchDisp();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleBlock = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "blocked" ? "un-blocked" : "blocked";
      await API.patch(`/addteamMembers/blockDispatcher/${id}`, {
        status: newStatus,
      });
      fetchDisp();
      fetchDrivers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PageMotion>
      <SpaceBackground className={styles.background} />

      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Team Management</h1>
            <p className={styles.subtitle}>
              Manage your organization's personnel
            </p>
          </div>
          <button
            className={styles.addButton}
            onClick={() => {
              setIsDriverForm(true);
              setShowModal(true);
            }}
          >
            <Plus size={20} /> <span>Add Team Member</span>
          </button>
        </div>

        {msg && (
          <div
            className={`${styles.alert} ${msg.type === "success" ? styles.successAlert : styles.errorAlert}`}
          >
            {msg.text}
          </div>
        )}

        {showModal && (
          <div className={styles.modalOverlay}>
            <div
              className={styles.modalBackdrop}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={styles.modalContent}
            >
              <div className={styles.modalHeader}>
                <h2>Add New Team Member</h2>
                <p className={styles.subtitle}>
                  Select account type and enter details
                </p>
              </div>

              <div className={styles.tabContainer}>
                <button
                  className={styles.tabButton}
                  style={{
                    backgroundColor: isDriverForm ? "#7c3aed" : "transparent",
                  }}
                  onClick={() => setIsDriverForm(true)}
                >
                  Driver
                </button>
                <button
                  className={styles.tabButton}
                  style={{
                    backgroundColor: !isDriverForm ? "#7c3aed" : "transparent",
                  }}
                  onClick={() => setIsDriverForm(false)}
                >
                  Dispatcher
                </button>
              </div>

              <form
                onSubmit={isDriverForm ? submitDriver : submitDisp}
                className={styles.modalForm}
              >
                <input
                  className={styles.modalInput}
                  placeholder="Full Name"
                  name="Name"
                  value={isDriverForm ? formDriver.Name : formDisp.Name}
                  onChange={
                    isDriverForm ? handleDriverChange : handleDispChange
                  }
                  required
                />
                <input
                  className={styles.modalInput}
                  placeholder="Username"
                  name="userName"
                  value={isDriverForm ? formDriver.userName : formDisp.userName}
                  onChange={
                    isDriverForm ? handleDriverChange : handleDispChange
                  }
                  required
                />
                <input
                  className={styles.modalInput}
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={isDriverForm ? formDriver.password : formDisp.password}
                  onChange={
                    isDriverForm ? handleDriverChange : handleDispChange
                  }
                  required
                />
                {isDriverForm && (
                  <input
                    className={styles.modalInput}
                    placeholder="License Information"
                    name="LicenceInfo"
                    value={formDriver.LicenceInfo}
                    onChange={handleDriverChange}
                    required
                  />
                )}

                <div className={styles.modalActions}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className={styles.cancelBtn}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.saveBtn}>
                    Save Member
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        <div className={styles.tabContainer}>
          <button
            className={styles.tabButton}
            style={{ backgroundColor: driverView ? "#7c3aed" : "transparent" }}
            onClick={() => {
              setDriverView(true);
              setDispatcherView(false);
            }}
          >
            Drivers
          </button>
          <button
            className={styles.tabButton}
            style={{
              backgroundColor: dispatcherView ? "#7c3aed" : "transparent",
            }}
            onClick={() => {
              setDriverView(false);
              setDispatcherView(true);
            }}
          >
            Dispatchers
          </button>
        </div>

        {driverView && (
          <div className={styles.tableWrapper}>
            <div className={`${styles.tableHeader} ${styles.driverGrid}`}>
              <div>NAME</div>
              <div>USERNAME</div>
              <div>LICENSE</div>
              <div>ACTIONS</div>
            </div>

            {driverlist.map((d, i) => {
              const ui = getStatusUI(d.status);
              return (
                <motion.div
                  key={d._id || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`${styles.tableRow} ${styles.driverGrid}`}
                >
                  <div style={{ fontWeight: "bold" }}>
                    {(d.Name || "Unknown").toUpperCase()}
                  </div>
                  <div>{(d.userName || "").toUpperCase()}</div>
                  <div>{(d.LicenceInfo || "N/A").toUpperCase()}</div>
                  <div className={styles.actionGroup}>
                    <button
                      className={`${styles.iconButton} ${styles.deleteBtn}`}
                      onClick={() => deleteDriver(d._id)}
                    >
                      <Trash size={18} />
                      <span className={styles.btnText}>Delete</span>
                    </button>
                    <button
                      onClick={() => toggleBlock(d._id, d.status)}
                      className={`${styles.iconButton} ${ui.className}`}
                    >
                      {ui.icon}
                      <span className={styles.btnText}>{ui.text}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {dispatcherView && (
          <div className={styles.tableWrapper}>
            <div className={`${styles.tableHeader} ${styles.dispatcherGrid}`}>
              <div>NAME</div>
              <div>USERNAME</div>
              <div>ACTIONS</div>
            </div>
            {displist.map((dis, i) => {
              const ui = getStatusUI(dis.status);
              return (
                <motion.div
                  key={dis._id || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`${styles.tableRow} ${styles.dispatcherGrid}`}
                >
                  <div style={{ fontWeight: "bold" }}>
                    {(dis.Name || "Unknown").toUpperCase()}
                  </div>
                  <div>{(dis.userName || "").toUpperCase()}</div>
                  <div className={styles.actionGroup}>
                    <button
                      className={`${styles.iconButton} ${styles.deleteBtn}`}
                      onClick={() => deleteDispatcher(dis._id)}
                    >
                      <Trash size={18} />
                      <span className={styles.btnText}>Delete</span>
                    </button>
                    <button
                      onClick={() => toggleBlock(dis._id, dis.status)}
                      className={`${styles.iconButton} ${ui.className}`}
                    >
                      {ui.icon}
                      <span className={styles.btnText}>{ui.text}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </PageMotion>
  );
};

export default TeamAdd;
