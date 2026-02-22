import { useState, useEffect } from "react";
import { Plus, CalendarDays, Trash, SquarePen, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DateTimePicker from "../../../common/datepicker";
import API from "../../../Api/api";
import PageMotion from "../../../common/pagemotion";
import SpaceBackground from "../../../common/spacebackground/stardust";
import Switch from "../../../common/toggle"
import styles from "./vehicles.module.css";

export const VehicleCreate = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState(null);
  const [vehicle, setVehicle] = useState([]);
  const [editId, setEdit] = useState(null);
  const [form, setForm] = useState({
    NumberPlate: "",
    vehicle: "",
    brand: "",
    status: "",
    CurrentKm: "",
    Service: "",
    insurance: null,
    polution: null,
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const fetchVehicle = async () => {
    try {
      const api = await API.get("/vehicleassignations/allvehicles");
      setVehicle(api.data.vehicles);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const vehicleSearch = async (plate) => {
    if (!plate.trim()) { fetchVehicle(); return; }
    try {
      setLoading(true);
      const api = await API.get(`vehicleassignations/search?plate=${plate}`);
      setVehicle(api.data.search);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/vehicleassignations/deletevehicles/${id}`);
      setMsg({ type: "success", text: "Vehicle removed" });
      fetchVehicle();
    } catch (err) {
      setMsg({ type: "error", text: "Delete failed" });
    }
  };

  const updateVehicle = (v) => {
    setForm({
      vehicle: v.vehicle,
      brand: v.brand,
      NumberPlate: v.NumberPlate,
      status: v.status,
      CurrentKm: v.CurrentKm,
      Service: v.Service,
      insurance: v.insurance ? new Date(v.insurance) : null,
      polution: v.polution ? new Date(v.polution) : null,
    });
    setEdit(v._id);
    setPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const convertForm = {
      ...form,
      CurrentKm: Number(form.CurrentKm),
      Service: Number(form.Service),
      polution: form.polution ? new Date(form.polution) : null,
      insurance: form.insurance ? new Date(form.insurance) : null,
    };

    try {
      if (editId) {
        await API.put(`/vehicleassignations/updatevehicles/${editId}`, convertForm);
        setMsg({ type: "success", text: "Vehicle updated successfully" });
      } else {
        await API.post("/vehicleassignations/insertvehicle", convertForm);
        setMsg({ type: "success", text: "Vehicle created successfully" });
      }
      setPopup(false);
      setEdit(null);
      fetchVehicle();
    } catch (err) {
      setMsg({ type: "error", text: "Operation failed" });
    }
  };

  useEffect(() => { fetchVehicle(); }, []);
  useEffect(() => {
    const timer = setTimeout(() => vehicleSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    if (msg) { const t = setTimeout(() => setMsg(null), 3000); return () => clearTimeout(t); }
  }, [msg]);

  return (
    <PageMotion>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Vehicle Fleet</h1>
            <p className={styles.subtitle}>Real-time management of transport assets</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Switch />
            <button className={styles.addButton} onClick={() => { setPopup(true); setEdit(null); setForm({}); }}>
              <Plus size={20} strokeWidth={3} /> Add New Vehicle
            </button>
          </div>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input 
              className={styles.searchBar} 
              placeholder="Search by Plate Number..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <div className={`${styles.tableGrid} ${styles.tableHeader}`}>
            <div>TYPE</div>
            <div>BRAND</div>
            <div>PLATE</div>
            <div>STATUS</div>
            <div>KM</div>
            <div>SERVICE</div>
            <div>POLLUTION</div>
            <div>INSURANCE</div>
            <div>ACTIONS</div>
          </div>

          <AnimatePresence>
            {vehicle.map((v, i) => (
              <motion.div
                key={v._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className={`${styles.tableGrid} ${styles.tableRow}`}
              >
                <div style={{ fontWeight: 700 }}>{v.vehicle.toUpperCase()}</div>
                <div>{v.brand.toUpperCase()}</div>
                <div className={styles.plate}>{v.NumberPlate.toUpperCase()}</div>
                <div>
                  <span className={styles.statusBadge}
                   data-status = {v.status?.toLowerCase()}
                  >
                    {v.status}
                  </span>
                </div>
                <div>{v.CurrentKm}</div>
                <div>{v.Service}</div>
                <div>{v.polution ? new Date(v.polution).toLocaleDateString() : 'N/A'}</div>
                <div>{v.insurance ? new Date(v.insurance).toLocaleDateString() : 'N/A'}</div>
                
                <div className={styles.actionWrapper}>
                  <button className={`${styles.iconBtn} ${styles.updateBtn}`} onClick={() => updateVehicle(v)}>
                    <SquarePen size={18} />
                    <span className={styles.btnLabel}>Edit</span>
                  </button>
                  <button className={`${styles.iconBtn} ${styles.deleteBtn}`} onClick={() => deleteVehicle(v._id)}>
                    <Trash size={18} />
                    <span className={styles.btnLabel}>Delete</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {popup && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalBackdrop} onClick={() => setPopup(false)} />
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={styles.modalContent}>
              <h2 className={styles.modalTitle}>{editId ? "Update Asset" : "Register Vehicle"}</h2>
              <form onSubmit={handleSubmit} className={styles.modalForm}>
                <select name="vehicle" required value={form.vehicle} onChange={handleChange} className={styles.selectField}>
                  <option value="">Select Type</option>
                  <option value="truck">Truck</option>
                  <option value="minitruck">Mini Truck</option>
                  <option value="van">Van</option>
                  <option value="container">Container</option>
                </select>
                <input className={styles.inputField} placeholder="Manufacturer / Brand" name="brand" value={form.brand} required onChange={handleChange} />
                <input className={styles.inputField} placeholder="Number Plate" name="NumberPlate" required value={form.NumberPlate} onChange={handleChange} />
                <select name="status" required value={form.status} onChange={handleChange} className={styles.selectField}>
                  <option value="">Set Status</option>
                  <option value="Active">Active</option>
                  <option value="Maintainance">Maintenance</option>
                  <option value="In-Transist">In-Transit</option>
                  <option value="Retired">Retired</option>
                </select>
                <div className={styles.dateGrid}>
                  <input className={styles.inputField} placeholder="Current KM" name="CurrentKm" type="number" value={form.CurrentKm} onChange={handleChange} />
                  <input className={styles.inputField} placeholder="Service KM" name="Service" type="number" value={form.Service} onChange={handleChange} />
                </div>
                
                <div className={styles.dateGrid}>
                  <div className={styles.dateGroup}>
                    <label>Insurance Expiry</label>
                    <div className={styles.dateInputBox}>
                      <CalendarDays size={16} />
                      <DateTimePicker value={form.insurance} onChange={(d) => setForm({ ...form, insurance: d })} />
                    </div>
                  </div>
                  <div className={styles.dateGroup}>
                    <label>Pollution Expiry</label>
                    <div className={styles.dateInputBox}>
                      <CalendarDays size={16} />
                      <DateTimePicker value={form.polution} onChange={(d) => setForm({ ...form, polution: d })} />
                    </div>
                  </div>
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
    </PageMotion>
  );
};