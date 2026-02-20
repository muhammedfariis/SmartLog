import { useState , useEffect } from "react";
import API from "../../../Api/api";
import { useLocation } from "react-router-dom";
import styles from "./kmupdate.module.css";

const Kmupdate = () => {

  const location = useLocation();

  const [km , setKm] = useState({
    vehicleId : "",
    assignmentId : "",
    endKm : "" ,
    startKm : ""
  });

  const [showMsg , setShowMsg] = useState(false);
  const [msgType , setMsgType] = useState("success");
  const [msgText , setMsgText] = useState("");

  const loadVehicleKm = async(vehicleId)=>{
    try{
      const res = await API.get(`/vehicleassignations/startkm/${vehicleId}`);
      const currentKm = res.data.vehicle.CurrentKm;

      setKm(prev => ({
        ...prev,
        startKm: currentKm
      }));

    }catch(err){
      console.error(err);
    }
  };

  useEffect(() => {
    if (location.state) {
      const { vehicleId, assignmentId } = location.state;

      setKm(prev => ({
        ...prev,
        vehicleId,
        assignmentId
      }));

      loadVehicleKm(vehicleId);
    }
  }, [location.state]);

  const updateKm = async (e) =>{
    e.preventDefault();

    try{
      const res = await API.post("/updatekilometer/updateKm" , km);

      setMsgType("success");
      setMsgText("KM Updated Successfully ✅");
      setShowMsg(true);

      setKm({
        vehicleId : '',
        assignmentId : '',
        endKm : '',
        startKm : ""
      });

    }catch(err){
      console.error(err);

      setMsgType("error");
      setMsgText(
        err?.response?.data?.message || "KM Update Failed ❌"
      );
      setShowMsg(true);
    }

    setTimeout(()=> setShowMsg(false), 3000);
  };

  const handle = (e)=>{
    setKm({
      ...km,
      [e.target.name] : e.target.value 
    });
  };

  return (
    <div className={styles.container}>

      <div
        className={[
          styles.toast,
          showMsg ? styles.toastEnter : styles.toastExit,
          msgType === 'success' ? styles.toastSuccess : styles.toastError,
        ].join(' ')}
      >
        <div className={styles.toastRow}>
          <span className={styles.toastEmoji}>
            {msgType === "success" ? "✅" : "⛔"}
          </span>
          <div>
            <p className={styles.toastTitle}>
              {msgType === "success" ? "Success" : "Failed"}
            </p>
            <p className={styles.toastMsg}>{msgText}</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className={styles.headerTitle}>
          Kilometers Update
        </h1>
        <p className={styles.headerSubtitle}>
          Update trip kilometer details
        </p>
      </div>

      <form onSubmit={updateKm}
        className={styles.form}>

        <div className={styles.row}>

          <div className={styles.field}>
            <label className={styles.label}>Starting KM</label>
            <input
              type="number"
              value={km.startKm}
              name="startKm"
              readOnly
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Ending KM</label>
            <input
              type="number"
              value={km.endKm}
              name="endKm"
              onChange={handle}
              className={styles.input}
            />
          </div>

        </div>

        <div className={styles.row}>

          <div className={styles.field}>
            <label className={styles.label}>Assignment ID</label>
            <input
              type="text"
              value={km.assignmentId}
              name="assignmentId"
              onChange={handle}
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
              className={styles.input}
            />
          </div>

        </div>

        <div className={styles.info}>
          Make sure KM values are accurate before updating.
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.button}>
            Update
          </button>
        </div>

      </form>
    </div>
  );
};

export default Kmupdate;
