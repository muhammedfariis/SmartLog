import AdminLayout from "../../layouts/adminlayout";
export const VehicleCreate = () => {
 return (
    <div className="space-y-6 ">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Vehicle Fleet
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your organization's vehicles
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow">
          + Add Vehicle
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        <button className="bg-gray-100 px-4 py-2 rounded-lg font-medium">
          Trucks (3)
        </button>
        <button className="bg-gray-100 px-4 py-2 rounded-lg font-medium">
          Vans (1)
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow border">

        {/* Table Header */}
        <div className="grid grid-cols-4 px-6 py-3 border-b text-gray-500 font-medium">
          <div>Vehicle</div>
          <div>Number</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {/* Row */}
        <div className="grid grid-cols-4 px-6 py-4 border-b items-center">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
              🚚
            </div>
            <span className="font-medium">Mini Truck</span>
          </div>

          <div>KL-07-AB-1234</div>
          <div className="text-green-600 font-medium">Active</div>

          <div className="text-right text-red-500 cursor-pointer">
            🗑
          </div>
        </div>

        {/* Row */}
        <div className="grid grid-cols-4 px-6 py-4 items-center">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
              🚐
            </div>
            <span className="font-medium">Van</span>
          </div>

          <div>KL-10-CD-7788</div>
          <div className="text-yellow-600 font-medium">Maintenance</div>

          <div className="text-right text-red-500 cursor-pointer">
            🗑
          </div>
        </div>

      </div>

    </div>
  );
};
