import { CalendarDays } from "lucide-react";

import DateTimePicker from "../../common/datepicker"
const Assignment = ()=>{

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-violet-500">
          Dispatch Center
        </h1>
        <p className="text-gray-400">
          Schedule trips and manage driver assignments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-zinc-900 border border-violet-500/40 rounded-2xl p-6 space-y-5 shadow-lg">
          <h2 className="text-xl font-semibold">
            New Assignment
          </h2>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">
              Select Driver
            </label>
            <select className="w-full bg-black border border-violet-500 rounded-xl p-3 outline-none">
              <option>Select driver</option>
              <option>Driver A</option>
              <option>Driver B</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">
              Select Vehicle
            </label>
            <select className="w-full bg-black border  border-violet-500 rounded-xl p-3 outline-none">
              <option>Select vehicle</option>
              <option>Truck KL07</option>
              <option>Van KL08</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">
              Schedule Date
            </label>

            <div className="flex items-center gap-3 bg-black border border-violet-500 rounded-xl p-3">
              <CalendarDays size={18} />
              <DateTimePicker/>
            </div>
          </div>

          <button className="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-xl font-medium">
            Assign Driver
          </button>
        </div>

        <div className="bg-zinc-900 border border-violet-500/40 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Recent Assignments
          </h2>

          <div className="h-64 flex items-center justify-center text-gray-500">
            No assignments scheduled
          </div>
        </div>

      </div>
    </div>
  );
}

export default Assignment