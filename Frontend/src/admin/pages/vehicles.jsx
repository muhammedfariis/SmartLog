import { Plus, CalendarDays, Trash, SquarePen } from "lucide-react";
import { useState, useEffect } from "react";
import DateTimePicker from "../../common/datepicker";
import API from "../../Api/api";
export const VehicleCreate = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [popup, setPopup] = useState(false);
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const vehicleSearch = async (plate) => {
    console.log("search : ", plate);

    try {
      if (!plate.trim()) {
        fetchVehicle();
        return;
      }

      setLoading(true);

      const api = await API.get(`vehicleassignations/search?plate=${plate}`);

      setVehicle(api.data.search);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicle = async () => {
    try {
      const api = await API.get("/vehicleassignations/allvehicles");
      console.log("data from backend : ", api.data);

      setVehicle(api.data.vehicles);
    } catch (err) {
      console.log("fetching error :", err);
    }
  };

  const deleteVehicle = async (id) => {
    try {
      const api = await API.delete(`/vehicleassignations/deletevehicles/${id}`);
      console.log(api);

      fetchVehicle();
    } catch (err) {
      console.error(err.message, "delete vehicles not working");
    }
  };

  const emptyForm = {
    NumberPlate: "",
    vehicle: "",
    brand: "",
    status: "",
    CurrentKm: "",
    Service: "",
    insurance: null,
    polution: null,
  };

  const resetvalues = () => {
    setForm(emptyForm);
    setEdit(null);
  };

  const updateVehicle = (v) => {
    setForm({
      vehicle: v.vehicle,
      brand: v.brand,
      NumberPlate: v.NumberPlate,
      status: v.status,
      CurrentKm: v.CurrentKm,
      Service: v.Service,
      insurance: new Date(v.insurance),
      polution: new Date(v.polution),
    });
    setEdit(v._id);
    setPopup(true);
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      vehicleSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSubmit = async (e) => {
    console.log(form);
    e.preventDefault();

    if (
      !form.vehicle ||
      !form.NumberPlate.trim() ||
      !form.brand.trim() ||
      !form.status ||
      !form.CurrentKm ||
      !form.Service ||
      form.insurance === null ||
      form.polution === null
    ) {
      return alert("Please fill all fields!");
    }

    const convertForm = {
      ...form,
      CurrentKm: Number(form.CurrentKm),
      Service: Number(form.Service),
      polution: new Date(form.polution),
      insurance: new Date(form.insurance),
      NumberPlate: form.NumberPlate.trim(),
    };

    try {
      let api = undefined;

      if (editId) {
        api = await API.put(
          `/vehicleassignations/updatevehicles/${editId}`,
          convertForm,
        );
        alert("vehicle updated");
      } else {
        api = await API.post("/vehicleassignations/insertvehicle", convertForm);
        alert("vehicle created");
      }
      setEdit(null);
      console.log("form submit completed", api.data);
      await fetchVehicle();
      setPopup(false);
      setForm({
        vehicle: "",
        NumberPlate: "",
        brand: "",
        status: "",
        CurrentKm: "",
        Service: "",
        insurance: null,
        polution: null,
      });
    } catch (err) {
      alert("vehicles not created");
      console.error(err.response?.data || err.message);
      alert("Failed to create vehicle. Check console for details.");
    }
  };

  const getStatus = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-900 text-green-400";

      case "retired":
        return "bg-red-900 text-red-400";

      case "maintainance":
        return "bg-yellow-900 text-yellow-400";

      case "in-transist":
        return "bg-violet-900 text-violet-400";

      default:
        return "bg-black text-white";
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-violet-500">
            Vehicle's Fleet
          </h1>
          <p className="text-gray-300 mt-1">
            Manage your organization's vehicles
          </p>
        </div>

        <button
          className="bg-violet-500 flex items-center justify-center gap-1 hover:bg-violet-700 text-white px-5 py-2 rounded-xl shadow"
          onClick={() => {
            setPopup(true);
            resetvalues();
          }}
        >
          <Plus size={25} /> <span> Add Vehicle</span>
        </button>
      </div>

      {popup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800/40 backdrop-blur-md min-h-screen" />
          <div className="relative flex flex-col items-center justify-center bg-zinc-900 text-white p-6 rounded-2xl shadow-xl border border-violet-500">
            <h2 className="text-xl font-bold mb-4 text-violet-400">
              {editId ? "Update Vehicle" : "Add Vehicle"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-3 flex flex-col items-center"
            >
               <select
                name="vehicle"
                required
                value={form.vehicle}
                onChange={handleChange}
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none appearance-none text-white"
              >
                <option value="">Select vehicle</option>
                <option value="truck">truck</option>
                <option value="minitruck">minitruck</option>
                <option value="van">van</option>
                <option value="container">container</option>
              </select>
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Brand"
                name="brand"
                value={form.brand}
                required
                onChange={handleChange}
              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Number Plate"
                name="NumberPlate"
                required
                value={form.NumberPlate}
                onChange={handleChange}
              />
              <select
                name="status"
                required
                value={form.status}
                onChange={handleChange}
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none appearance-none text-white"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Maintainance">Maintainance</option>
                <option value="In-Transist">In-Transist</option>
                <option value="Retired">Retired</option>
              </select>

              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Current Km"
                name="CurrentKm"
                required
                value={form.CurrentKm}
                onChange={handleChange}
              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Service"
                name="Service"
                required
                value={form.Service}
                onChange={handleChange}
              />
              <div className="flex gap-2">
                <div className="flex items-center flex-col">
                  <label className="text-sm text-gray-400">Insurence</label>

                  <div className="flex items-center gap-3 bg-black border border-violet-500 rounded-lg p-2">
                    <CalendarDays size={18} />
                    <DateTimePicker
                      value={form.insurance}
                      onChange={(date) =>
                        setForm({
                          ...form,
                          insurance: date,
                        })
                      }
                    />
                  </div>
                </div>
                <div className=" flex items-center flex-col">
                  <label className="text-sm  text-gray-400">Polution</label>

                  <div className="flex items-center gap-3 bg-black border border-violet-500 rounded-lg p-2">
                    <CalendarDays size={18} />
                    <DateTimePicker
                      value={form.polution}
                      onChange={(date) =>
                        setForm({
                          ...form,
                          polution: date,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setPopup(false)}
                  className="px-4 py-2 rounded-lg border border-gray-500"
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700"
                  type="submit"
                >
                  {editId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <input
          className="text-white rounded-3xl h-10 w-96 border-2 outline-0  border-violet-500 p-5 text-lg"
          type="text"
          value={search}
          placeholder="Search Number Plate"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && (
        <div className="bg-transparent">
          <p className="text-violet-700 animate-bounce inset-0 -z-50 backdrop-blur-3xl shadow-2xl">
            Loading...
          </p>
        </div>
      )}

      <div className="bg-black text-white rounded-3xl shadow border border-violet-500">
        <div className="grid grid-cols-9 py-2 px-3 text-center gap-5 border-b border-violet-500 text-gray-500 font-medium">
          <div>Vehicle</div>
          <div>Brand</div>
          <div>NumberPlate</div>
          <div>Status</div>
          <div>Current-Km</div>
          <div>Service-Km</div>
          <div>Polution-Expiry</div>
          <div>Insurance-Expiry</div>
          <div>Actions</div>
        </div>
        {vehicle.map((v) => (
          <div
            key={v._id}
            className="grid grid-cols-9 py-2 px-3 text-center gap-5 justify-center border-violet-500 items-center"
          >
            <div>{v.vehicle}</div>
            <div>{v.brand}</div>
            <div>{v.NumberPlate}</div>
            <div className="flex justify-center items-center">
              <div className={` w-fit px-2 rounded-3xl ${getStatus(v.status)}`}>
                {v.status}
              </div>
            </div>
            <div>{v.CurrentKm}</div>
            <div>{v.Service}</div>
            <div>{new Date(v.polution).toLocaleDateString()}</div>
            <div>{new Date(v.insurance).toLocaleDateString()}</div>
            <div className="flex items-center justify-center gap-1">
              <div>
                <button
                  className="group flex items-center  rounded-full h-10 w-10 
               bg-red-900 text-red-600 hover:w-25 transition-all duration-300 
             overflow-hidden px-2"
                  onClick={() => deleteVehicle(v._id)}
                >
                  <Trash
                    size={22}
                    color="red"
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  />

                  <span
                    className="ml-2 opacity-0  
                  transition-opacity duration-200 group-hover:opacity-100"
                  >
                    Delete
                  </span>
                </button>
              </div>

              <div>
                <button
                  className="group flex items-center  rounded-full h-10 w-10 
               bg-blue-950 text-blue-600 hover:w-25 transition-all duration-300 
             overflow-hidden px-2"
                  onClick={() => updateVehicle(v)}
                >
                  <SquarePen
                    size={22}
                    color="blue"
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  />

                  <span
                    className="ml-2 opacity-0  
                  transition-opacity duration-200 group-hover:opacity-100"
                  >
                    Update
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
