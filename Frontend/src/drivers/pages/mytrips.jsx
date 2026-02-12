import { useState, useEffect } from "react";
import API from "../../Api/api";
import { useNavigate } from "react-router-dom";

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
        return "bg-green-950 text-green-300 border border-green-700";

      case "in_progress":
        return "bg-violet-950 text-violet-300 border border-violet-700";

      case "cancelled":
        return "bg-red-950 text-red-400 border border-red-700";

      case "returning":
        return "bg-yellow-950 text-yellow-300 border border-yellow-700";

      case "returned":
        return "bg-blue-950 text-blue-300 border border-blue-700";

      case "completed":
        return "bg-orange-950 text-orange-400 border border-orange-700";

      case "scheduled":
        return "bg-cyan-950 text-cyan-400 border border-cyan-700";

      default:
        return "bg-gray-800 text-gray-300 border border-gray-700";
    }
  };

  const actionButton = (trip) => {
    if (trip.status === "scheduled") {
      return (
        <button
          className="bg-cyan-950  rounded-2xl h-10 active:scale-95 hover:bg-cyan-900 w-30 text-md text-cyan-300"
          onClick={() => updateStatus(trip._id, "assigned")}
        >
          Ready
        </button>
      );
    }

    if (trip.status === "assigned") {
      return (
        <button
          className="bg-green-950  rounded-2xl h-10 active:scale-95 hover:bg-green-900 w-30 text-md text-green-300"
          onClick={() => updateStatus(trip._id, "in_progress")}
        >
          Start
        </button>
      );
    }

    if (trip.status === "in_progress") {
      return (
        <div className="flex justify-between">
          <button
            className="bg-violet-950 rounded-2xl h-10 active:scale-95 hover:bg-violet-900 w-30 text-md text-violet-300"
            onClick={() => updateStatus(trip._id, "completed")}
          >
            Complete
          </button>
          <button
            className="bg-red-950 rounded-2xl h-10 active:scale-95 hover:bg-red-900 w-30 text-md text-red-400"
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
          className="bg-yellow-950 rounded-2xl h-10 active:scale-95 hover:bg-yellow-900 w-30 text-md text-yellow-300"
          onClick={() => updateStatus(trip._id, "returning")}
        >
          Return
        </button>
      );
    }

    if (trip.status === "returning") {
      return (
        <button
          className="bg-blue-950 rounded-2xl h-10 active:scale-95 hover:bg-blue-900 w-30 text-md text-blue-300"
          onClick={() => updateStatus(trip._id, "returned")}
        >
          Reached Hub
        </button>
      );
    }

    if (trip.status === "returned") {
      return (
        <button
          className="bg-orange-950 rounded-2xl h-10 active:scale-95 hover:bg-orange-900 w-30 text-md text-orange-400"
          onClick={() => updateStatus(trip._id, "completed")}
        >
          Close Trip
        </button>
      );
    }

    return null;
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-2 flex-col">
        <h1 className="text-3xl font-bold text-violet-500">
          My Assigned Trips
        </h1>
        {trip.length === 0 && (
          <p className="text-gray-400">No Trips Assigned Yet</p>
        )}
      </div>

      <div className="space-y-5">
        {trip.map((t, i) => (
          <div
            key={t._id}
            className="bg-black border border-violet-500 rounded-2xl p-5 shadow space-y-4"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <h2 className="text-lg font-semibold text-white">
                Trip ID: {i + 10001}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm w-fit ${badgeStyle(t.status)}`}
              >
                {t.status}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-2 text-gray-300">
              <p>
                Route: {t.fromLocation} → {t.toLocation}
              </p>
              <p>Vehicle: {t.vehicle?.NumberPlate}</p>
              <p>Load: {t.load}</p>
              <p>Date: {new Date(t.scheduledDate).toDateString()}</p>
            </div>

            {actionButton(t)}

            <div className="mt-4 border-t border-zinc-800 pt-4 space-y-3">
              <div className="bg-blue-950/40 border border-blue-800 rounded-xl p-3 text-sm text-blue-200">
                ⚠️ KM must be updated before closing the trip. Incorrect KM
                entries will affect fleet records.
              </div>
              {t.status === "completed" && (
                <button
                  className="bg-blue-900 hover:bg-blue-800 active:scale-95 transition rounded-xl px-4 py-2 text-blue-200 text-sm"
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
