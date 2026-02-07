
const Kmupdate = ()=>{

 return (
    <div className="space-y-6 max-w-3xl">

      <div>
        <h1 className="text-3xl font-bold text-violet-500">Kilometers Update</h1>
        <p className="text-gray-400">
          Update trip kilometer details
        </p>
      </div>

      <div className="bg-black border border-violet-500 rounded-2xl shadow p-6 space-y-6">


        <div className="grid md:grid-cols-2 gap-5">

          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Starting KM</label>
            <input
              type="number"
              className="w-full p-3 rounded-xl bg-zinc-900 border border-violet-500 text-white outline-none focus:ring-2 focus:ring-violet-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Ending KM</label>
            <input
              type="number"
              className="w-full p-3 rounded-xl bg-zinc-900 border border-violet-500 text-white outline-none focus:ring-2 focus:ring-violet-600"
            />
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Assignment ID</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl bg-zinc-900 border border-violet-500 text-white outline-none focus:ring-2 focus:ring-violet-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Vehicle ID</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl bg-zinc-900 border border-violet-500 text-white outline-none focus:ring-2 focus:ring-violet-600"
            />
          </div>

        </div>

        <div className="bg-violet-900/20 border border-violet-500/40 rounded-xl p-4 text-sm text-gray-300">
          Make sure KM values are accurate before updating.
        </div>

        <div className="flex justify-end">
          <button className="w-full md:w-48 py-3 rounded-xl font-semibold bg-violet-600 hover:bg-violet-700 transition">
            Update
          </button>
        </div>

      </div>
    </div>
  );
};


export default Kmupdate