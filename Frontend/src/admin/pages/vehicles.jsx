import { Plus, CalendarDays } from "lucide-react";
import { useState } from "react";
import DateTimePicker from "../../common/datepicker";
import API from "../../Api/api";
export const VehicleCreate = () => {
  const [popup, setPopup] = useState(false);
  const [form, setForm] = useState({
    NumberPlate: "",
    vehicle: "",
    brand: "",
    status: "",
    CurrentKm: "",
    Service: "",
    insurance: "",
    polution: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(form);
    e.preventDefault();

    try {
      const api = await API.post("/vehicleassignations/insertvehicle", form);

      alert("form submit completed");
      console.log("form submit completed", api.data);

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
          onClick={() => setPopup(true)}
        >
          <Plus size={25} /> <span> Add Vehicle</span>
        </button>
      </div>

      {popup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800/40 backdrop-blur-md min-h-screen" />
          <div className="relative flex flex-col items-center justify-center bg-zinc-900 text-white p-6 rounded-2xl shadow-xl border border-violet-500">
            <h2 className="text-xl font-bold mb-4 text-violet-400">
              Add Vehicles
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 flex flex-col items-center">
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Vehicle"
                name="vehicle"
                onChange={handleChange}
              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Brand"
                name="brand"
                onChange={handleChange}

              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Number Plate"
                name="NumberPlate"
                onChange={handleChange}

              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Status"
                name="status"
                onChange={handleChange}

              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Current Km"
                name="CurrentKm"
                onChange={handleChange}

              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Service"
                name="Service"
                onChange={handleChange}

              />
              <div className="flex gap-2">
                <div className="flex items-center flex-col">
                  <label className="text-sm text-gray-400">Insurence</label>

                  <div className="flex items-center gap-3 bg-black border border-violet-500 rounded-lg p-2">
                    <CalendarDays size={18} />
                    <DateTimePicker 
                    value = {form.insurance}
                    onChange = {(date)=>setForm({
                      ...form ,
                      insurance : date
                    })}
                    />
                  </div>
                </div>
                <div className=" flex items-center flex-col">
                  <label className="text-sm  text-gray-400">Polution</label>

                  <div className="flex items-center gap-3 bg-black border border-violet-500 rounded-lg p-2">
                    <CalendarDays size={18} />
                    <DateTimePicker
                     value = {form.polution}
                     onChange = {(date)=>setForm({
                      ...form ,
                      polution : date
                     })}
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
                Save
              </button>
            </div>
             </form>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <input
          className="text-white rounded-3xl h-10 w-60 border-2 outline-0 border-violet-500 p-2"
          type="search"
          placeholder="Search No:Plate"
        />
        <button className="h-10 w-20 rounded-2xl bg-violet-500">Search</button>
      </div>

      <div className="bg-black text-white rounded-2xl shadow border border-violet-500">
        <div className="grid grid-cols-10 py-2 px-3 text-center gap-5 border-b text-gray-500 font-medium">
          <div>Vehicle</div>
          <div>Brand</div>
          <div>NumberPlate</div>
          <div>Status</div>
          <div>Current-Km</div>
          <div>Service-Km</div>
          <div>Polution-Expiry</div>
          <div>Insurance-Expiry</div>
          <div>Delete</div>
          <div>Update</div>
        </div>

        <div className="grid grid-cols-10 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
          <div>Truck</div>
          <div>BharatBenz</div>
          <div>KL-07-AB-1234</div>
          <div className="text-green-600 font-medium">Active</div>
          <div>3000km</div>
          <div>5000km</div>
          <div>{new Date().getDate()}</div>
          <div>{new Date().getDate()}</div>
          <div>Delete</div>
          <div>Update</div>
        </div>

        <div className="grid grid-cols-10 py-2 px-3 text-center gap-5 border-violet-500 border-b items-center">
          <div>Truck</div>
          <div>BharatBenz</div>
          <div>KL-07-AB-1234</div>
          <div className="text-green-600 font-medium">Active</div>
          <div>3000km</div>
          <div>5000km</div>
          <div>{new Date().getDate()}</div>
          <div>{new Date().getDate()}</div>
          <div>Delete</div>
          <div>Update</div>
        </div>

        <div className="grid grid-cols-10 py-2 px-3 text-center gap-5 border-violet-500  border-b items-center">
          <div>Truck</div>
          <div>BharatBenz</div>
          <div>KL-07-AB-1234</div>
          <div className="text-green-600 font-medium">Active</div>
          <div>3000km</div>
          <div>5000km</div>
          <div>{new Date().getDate()}</div>
          <div>{new Date().getDate()}</div>
          <div>Delete</div>
          <div>Update</div>
        </div>

        <div className="grid grid-cols-10 py-2 px-3 text-center gap-5 border-violet-500  items-center">
          <div>Truck</div>
          <div>BharatBenz</div>
          <div>KL-07-AB-1234</div>
          <div className="text-green-600 font-medium">Active</div>
          <div>3000km</div>
          <div>5000km</div>
          <div>{new Date().getDate()}</div>
          <div>{new Date().getDate()}</div>
          <div>Delete</div>
          <div>Update</div>
        </div>
      </div>
    </div>
  );
};
