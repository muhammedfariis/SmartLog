import { CalendarDays, ArrowBigRight } from "lucide-react";
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
      case "assigned":
        return "bg-green-900 text-green-300 border-green-700";
      case "in_progress":
        return "bg-violet-900 text-violet-300 border-violet-700";
      case "cancelled":
        return "bg-red-900 text-red-300 border-red-700";
      case "returned":
        return "bg-blue-900 text-blue-300 border-blue-700";
      case "completed":
        return "bg-orange-900 text-orange-300 border-orange-700";
      case "scheduled":
        return "bg-cyan-950 text-cyan-400 border-cyan-700";
      default:
        return "bg-gray-800 text-gray-300 border-gray-600";
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
              <h2>New Assignment</h2>

              <div className={styles.inputFieldWrapper}>
                <label className={styles.label}>Select Vehicle</label>
                <select
                  className={styles.select}
                  value={form.vehicle}
                  name="vehicle"
                  onChange={onchanging}
                >
                  <option value="">Select Vehicle</option>
                  {vehicle.map((veh) => (
                    <option key={veh._id} value={veh._id}>
                      {veh.NumberPlate}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.inputFieldWrapper}>
                <label className={styles.label}>Select Driver</label>
                <select
                  className={styles.select}
                  value={form.driver}
                  name="driver"
                  onChange={onchanging}
                >
                  <option value="">Select Driver</option>
                  {driver.map((data) => (
                    <option key={data._id} value={data._id}>
                      {data.Name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.inputFieldWrapper}>
                <label className={styles.label}>Schedule Date</label>
                <div className={styles.dateContainer}>
                  <CalendarDays size={18} />
                  <DateTimePicker
                    value={form.scheduledDate || null}
                    onChange={(date) =>
                      setForm({ ...form, scheduledDate: date || "" })
                    }
                  />
                </div>

                <label className={styles.label}>Load</label>
                <input
                  className={styles.input}
                  type="text"
                  name="load"
                  value={form.load}
                  onChange={onchanging}
                />

                <label className={styles.label}>Status</label>
                <select
                  className={styles.select}
                  name="status"
                  value={form.status}
                  onChange={onchanging}
                >
                  <option value="">Select Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <label className={styles.label}>Location Assign</label>
                <div className={styles.locationGroup}>
                  <input
                    className={styles.locationInput}
                    placeholder="From"
                    name="fromLocation"
                    value={form.fromLocation}
                    onChange={onchanging}
                  />
                  <input
                    className={styles.locationInput}
                    placeholder="To"
                    name="toLocation"
                    value={form.toLocation}
                    onChange={onchanging}
                  />
                </div>
              </div>

              <button className={styles.submitButton} onClick={assignDrivers}>
                Assign Driver
              </button>
            </div>

            <div className={styles.card}>
              <h2>Recent Assignments</h2>
              <div className={styles.listContainer}>
                {assignment.map((d) => (
                  <div key={d._id} className={styles.assignmentItem}>
                    <div className={styles.colThird}>
                      <p className={styles.label} style={{fontSize: '0.75rem'}}>Driver</p>
                      <p className={styles.driverName}>
                        {d.driver?.Name?.toUpperCase()}
                      </p>
                    </div>

                    <div className={styles.colSixth}>
                      <ArrowBigRight size={20} className="text-violet-500" />
                    </div>

                    <div className={styles.colThird}>
                      <p className={styles.label} style={{fontSize: '0.75rem'}}>Vehicle</p>
                      <p className={styles.vehiclePlate}>
                        {d.vehicle?.NumberPlate?.toUpperCase()}
                      </p>
                    </div>

                    <div className={styles.colSixth}>
                      <span className={`${styles.badge} ${statusBadge(d.status)}`}>
                        {d.status}
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
