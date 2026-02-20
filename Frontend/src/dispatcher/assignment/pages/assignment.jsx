import { 
  Truck, 
  User, 
  CalendarDays, 
  Navigation, 
  Package, 
  ClipboardList, 
  ArrowBigDownDash,
  ArrowRight
} from 'lucide-react';
import DateTimePicker from "../../../common/datepicker";
import { useEffect, useState } from "react";
import API from "../../../Api/api";
import SpaceBackground from "../../../common/spacebackground/stardust";
import PageMotion from "../../../common/pagemotion";
import styles from "./assignment.module.css"
const Assignment = () => {
  const [driver, setDriver] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [assignment, setAssignment] = useState([]);

  const [form, setForm] = useState({
    driver: "",
    vehicle: "",
    scheduledDate: "",
    fromLocation: "",
    toLocation: "",
    load: "",
    status: "",
  });

  useEffect(() => {
    API.get("/vehicleassignations/bystatus")
      .then((response) => setVehicle(response.data.vehicleActive || []))
      .catch((err) => console.log("Vehicle API error:", err));

    API.get("/addteamMembers/alldrivers")
      .then((res) => setDriver(res.data.readDriver || []))
      .catch((err) => console.log("Driver API error:", err));
  }, []);

  const loadAssignments = async () => {
    try {
      const res = await API.get("/assigndrivers/assignmentShedule");

      const list = res.data.Assignments || []
       const active = list.filter(
        s => s.status !== "completed"
       )
        
      setAssignment(active);
    } catch (err) {
      console.log("assignment fetch error:", err);
      setAssignment([]);
    }
  };
   const statusBadge = (status) => {
  switch (status) {
    case "assigned": return styles.badgeAssigned;
    case "in_progress": return styles.badgeInProgress;
    case "cancelled": return styles.badgeCancelled;
    case "returned": return styles.badgeReturned;
    case "completed": return styles.badgeCompleted;
    case "scheduled": return styles.badgeScheduled;
    default: return styles.badgeDefault;
  }
};

  useEffect(() => {
    loadAssignments();
    const interval = setInterval(loadAssignments, 5000);
    return () => clearInterval(interval);
  }, []);

  const assignDrivers = async (e) => {
    e.preventDefault();
    try {
      await API.post("/assigndrivers/assignment", form);
      alert("assignation completed");
      loadAssignments();
      setForm({
        driver: "",
        vehicle: "",
        scheduledDate: "",
        fromLocation: "",
        toLocation: "",
        load: "",
        status: "",
      });
    } catch (err) {
      console.error(err);
      alert("assignation failed");
    }
  };

  const onchanging = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
  <PageMotion>
    <div className={styles.container}>
      <SpaceBackground />

      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <h1>Dispatch Center</h1>
          <p>Schedule trips and manage driver assignments</p>
        </div>

        <div className={styles.mainGrid}>
          <div className={`${styles.card} ${styles.formCard}`}>
            <h2><ClipboardList size={22} /> New Assignment</h2>

            <div className={styles.formGrid}>
              <div className={styles.inputFieldWrapper}>
                <label className={styles.label}>Vehicle</label>
                <div className={styles.inputGroup}>
                  <Truck size={18} />
                  <select className={styles.select} value={form.vehicle} name="vehicle" onChange={onchanging}>
                    <option value="">Select Vehicle</option>
                    {vehicle.map((veh) => (
                      <option key={veh._id} value={veh._id}>{veh.NumberPlate}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.inputFieldWrapper}>
                <label className={styles.label}>Driver</label>
                <div className={styles.inputGroup}>
                  <User size={18} />
                  <select className={styles.select} value={form.driver} name="driver" onChange={onchanging}>
                    <option value="">Select Driver</option>
                    {driver.map((data) => (
                      <option key={data._id} value={data._id}>{data.Name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.inputFieldWrapper}>
                <label className={styles.label}>Schedule Date</label>
                <div className={styles.inputGroup}>
                  <CalendarDays size={18} />
                  <div className={styles.dateContainer}>
                    <DateTimePicker
                      value={form.scheduledDate || null}
                      onChange={(date) => setForm({ ...form, scheduledDate: date || "" })}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.inputFieldWrapper}>
                <label className={styles.label}>Load</label>
                <div className={styles.inputGroup}>
                  <Package size={18} />
                  <input className={styles.input} type="text" name="load" value={form.load} onChange={onchanging} placeholder="e.g. Tyre/Logs" />
                </div>
              </div>

              <div className={`${styles.inputFieldWrapper} ${styles.fullWidth}`}>
                <label className={styles.label}>Route (From - To)</label>
                <div className={styles.locationGroup}>
                  <input className={styles.locationInput} placeholder="Starting" name="fromLocation" value={form.fromLocation} onChange={onchanging} />
                  <div style={{display:'flex', alignItems:'center' , justifyContent : "center"}}><ArrowBigDownDash size={16} /></div>
                  <input className={styles.locationInput} placeholder="Ending" name="toLocation" value={form.toLocation} onChange={onchanging} />
                </div>
              </div>

              <div className={`${styles.inputFieldWrapper} ${styles.fullWidth}`}>
                <label className={styles.label}>Status</label>
                <div className={styles.inputGroup}>
                  <Navigation size={18} />
                  <select className={styles.select} name="status" value={form.status} onChange={onchanging}>
                    <option value="scheduled">Scheduled</option>
                    <option value="assigned">Assigned</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            <button className={styles.submitButton} onClick={assignDrivers}>
              Assign Driver
            </button>
          </div>

          <div className={styles.card}>
            <h2><Navigation size={22} /> Recent Assignments</h2>
            <div className={styles.listContainer}>
              {assignment.map((d) => (
                <div key={d._id} className={styles.assignmentItem}>
                  <div className={styles.infoBlock}>
                    <span className={styles.infoLabel}>Driver</span>
                    <span className={styles.driverName}>{d.driver?.Name}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ArrowRight size={18} color="#4b5563" />
                  </div>

                  <div className={styles.infoBlock}>
                    <span className={styles.infoLabel}>Vehicle</span>
                    <span className={styles.vehiclePlate}>{d.vehicle?.NumberPlate}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span className={`${styles.badge} ${statusBadge(d.status)}`}>
                      {d.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageMotion>
);
};

export default Assignment;
