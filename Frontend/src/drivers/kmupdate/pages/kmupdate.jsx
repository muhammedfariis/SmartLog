import { useState, useEffect } from "react";
import API from "../../../Api/api";
import { useLocation } from "react-router-dom";
import PageMotion from "../../../common/pagemotion";
import Switch from "../../../common/toggle";
import { Gauge, Save, AlertCircle } from "lucide-react";
import styles from "./kmupdate.module.css";

const Kmupdate = () => {
  const location = useLocation();

  const [km, setKm] = useState({
    vehicleId: "",
    assignmentId: "",
    endKm: "",
    startKm: ""
  });

  const [showMsg, setShowMsg] = useState(false);
  const [msgType, setMsgType] = useState("success");
  const [msgText, setMsgText] = useState("");

  const loadVehicleKm = async (vehicleId) => {
    try {
      const res = await API.get(`/vehicleassignations/startkm/${vehicleId}`);
      const currentKm = res.data.vehicle.CurrentKm;
      setKm(prev => ({ ...prev, startKm: currentKm }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (location.state) {
      const { vehicleId, assignmentId } = location.state;
      setKm(prev => ({ ...prev, vehicleId, assignmentId }));
      loadVehicleKm(vehicleId);
    }
  }, [location.state]);

  const updateKm = async (e) => {
    e.preventDefault();
    try {
      await API.post("/updatekilometer/updateKm", km);
      setMsgType("success");
      setMsgText("KM Updated Successfully ✅");
      setShowMsg(true);
      setKm({ vehicleId: '', assignmentId: '', endKm: '', startKm: "" });
    } catch (err) {
      setMsgType("error");
      setMsgText(err?.response?.data?.message || "KM Update Failed ❌");
      setShowMsg(true);
    }
    setTimeout(() => setShowMsg(false), 3000);
  };

  const handle = (e) => {
    setKm({ ...km, [e.target.name]: e.target.value });
  };

  return (
    <PageMotion>
      <div className={styles.mainWrapper}>
        <div className={styles.container}>
          
          {/* Header Section */}
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.title}>Kilometers Update</h1>
              <p className={styles.subtitle}>Log trip distance and update vehicle mileage</p>
            </div>
            <Switch />
          </div>

          {/* Form Card */}
          <div className={styles.formCard}>
            <form onSubmit={updateKm} className={styles.form}>
              
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label className={styles.label}>Starting KM</label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="number"
                      value={km.startKm}
                      name="startKm"
                      readOnly
                      className={`${styles.input} ${styles.readOnlyInput}`}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Ending KM</label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="number"
                      value={km.endKm}
                      name="endKm"
                      onChange={handle}
                      required
                      placeholder="Enter final reading"
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Assignment ID</label>
                  <input
                    type="text"
                    value={km.assignmentId}
                    name="assignmentId"
                    onChange={handle}
                    readOnly
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Vehicle ID</label>
                  <input
                    type="text"
                    value={km.vehicleId}
                    name="vehicleId"
                    onChange={handle}
                    readOnly
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.infoBox}>
                <AlertCircle size={18} />
                <span>Make sure KM values are accurate before updating. This will impact maintenance logs.</span>
              </div>

              <div className={styles.actions}>
                <button type="submit" className={styles.submitBtn}>
                  <Save size={18} /> Update Kilometers
                </button>
              </div>
            </form>
          </div>

          <div className={`${styles.toast} ${showMsg ? styles.toastEnter : styles.toastExit} ${msgType === 'success' ? styles.toastSuccess : styles.toastError}`}>
             <p>{msgText}</p>
          </div>

        </div>
      </div>
    </PageMotion>
  );
};

export default Kmupdate;