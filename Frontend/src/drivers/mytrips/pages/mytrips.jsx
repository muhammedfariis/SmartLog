import { useState, useEffect } from "react";
import API from "../../../Api/api";
import { useNavigate } from "react-router-dom";
import styles from "./mytrips.module.css";

const Mytrips = () => {
  const navigate = useNavigate();

  const [trip, setTrip] = useState([]);

  const loadTrips = async () => {
    try {
      const api = await API.get("/assigndrivers/mytrips");
      setTrip(api.data.trips);
      console.log(api);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const updateStatus = async (assignmentId, status) => {
    try {
      const api = await API.patch(`/assigndrivers/driverStatus`, {
        assignmentId,
        status,
      });
      loadTrips();
    } catch (err) {
      console.error(err);
    }
  };

  const badgeStyle = (status) => {
    switch (status) {
      case "assigned":
        return styles.badge_assigned;
      case "in_progress":
        return styles.badge_in_progress;
      case "cancelled":
        return styles.badge_cancelled;
      case "returning":
        return styles.badge_returning;
      case "returned":
        return styles.badge_returned;
      case "completed":
        return styles.badge_completed;
      case "scheduled":
        return styles.badge_scheduled;
      default:
        return styles.badge;
    }
  };

  const actionButton = (trip) => {
    if (trip.status === "scheduled") {
      return (
        <button
          className={[styles.btn, styles.btnReady].join(' ')}
          onClick={() => updateStatus(trip._id, "assigned")}
        >
          Ready
        </button>
      );
    }

    if (trip.status === "assigned") {
      return (
        <button
          className={[styles.btn, styles.btnStart].join(' ')}
          onClick={() => updateStatus(trip._id, "in_progress")}
        >
          Start
        </button>
      );
    }

    if (trip.status === "in_progress") {
      return (
        <div className={styles.actionsRow}>
          <button
            className={[styles.btn, styles.btnComplete].join(' ')}
            onClick={() => updateStatus(trip._id, "completed")}
          >
            Complete
          </button>
          <button
            className={[styles.btn, styles.btnCancel].join(' ')}
            onClick={() => updateStatus(trip._id, "cancelled")}
          >
            Cancel
          </button>
        </div>
      );
    }

    if (trip.status === "cancelled") {
      return (
        <button
          className={[styles.btn, styles.btnReturn].join(' ')}
          onClick={() => updateStatus(trip._id, "returning")}
        >
          Return
        </button>
      );
    }

    if (trip.status === "returning") {
      return (
        <button
          className={[styles.btn, styles.btnReached].join(' ')}
          onClick={() => updateStatus(trip._id, "returned")}
        >
          Reached Hub
        </button>
      );
    }

    if (trip.status === "returned") {
      return (
        <button
          className={[styles.btn, styles.btnClose].join(' ')}
          onClick={() => updateStatus(trip._id, "completed")}
        >
          Close Trip
        </button>
      );
    }

    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          My Assigned Trips
        </h1>
        {trip.length === 0 && (
          <p className={styles.subtitle}>No Trips Assigned Yet</p>
        )}
      </div>

      <div className={styles.list}>
        {trip.map((t, i) => (
          <div
            key={t._id}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                Trip ID: {i + 10001}
              </h2>

              <span
                className={[styles.badge, badgeStyle(t.status)].join(' ')}
              >
                {t.status}
              </span>
            </div>

            <div className={styles.grid}>
              <p>
                Route: {t.fromLocation} → {t.toLocation}
              </p>
              <p>Vehicle: {t.vehicle?.NumberPlate}</p>
              <p>Load: {t.load}</p>
              <p>Date: {new Date(t.scheduledDate).toDateString()}</p>
            </div>

            {actionButton(t)}

            <div className={styles.note}>
              <div className={styles.alert}>
                ⚠️ KM must be updated before closing the trip. Incorrect KM
                entries will affect fleet records.
              </div>
              {t.status === "completed" && (
                <button
                  className={styles.updateBtn}
                  onClick={() =>
                    navigate("/drivers/kmupdate", {
                      state: {
                        assignmentId: t._id,
                        vehicleId: t.vehicle?._id,
                        vehiclePlate: t.vehicle?.NumberPlate,
                      },
                    })
                  }
                >
                  Update KM
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mytrips;
