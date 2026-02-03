import { useState } from "react";
import { Plus } from "lucide-react";

const TeamAdd = () => {
  const [driver, setdriver] = useState(true);
  const [Dispatcher, setDispatcher] = useState(false);
  const [dispAcc, setDispAcc] = useState(false);
  const [driverAcc, setDriverAcc] = useState(false);
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-violet-500">
            Team Management
          </h1>
          <p className="text-gray-300 mt-1">Manage Driver's And Dispatcher's</p>
        </div>

        <button
          className="bg-violet-500 flex items-center justify-center gap-1 hover:bg-violet-700 text-white px-5 py-2 rounded-xl shadow"
          onClick={() => {
            setDriverAcc(true);
            setDispAcc(false);
          }}
        >
          <Plus size={25} /> <span> Add Team Member</span>
        </button>
      </div>

      {driverAcc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800/40 backdrop-blur-md min-h-screen" />
          <div className="relative space-y-4 bg-zinc-900 text-white p-6 rounded-2xl shadow-xl border border-violet-500">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold  text-violet-400">
                Add New Team Member
              </h2>
              <p className="text-md text-gray-300">
                Create Driver's and Dispatcher's Account
              </p>
              <div className="h-12 w-fit p-5 gap-4 flex items-center justify-center bg-zinc-200/10 rounded-3xl">
                <div>
                  <button
                    className="h-10 w-40 p-2 rounded-4xl text-white bg-violet-600 active:bg-red-400"
                    onClick={() => {
                      setDriverAcc(true);
                      setDispAcc(false);
                    }}
                  >
                    Create Driver
                  </button>
                </div>
                <div>
                  <button
                    className="h-10 w-40 p-2 rounded-4xl text-white bg-violet-600 active:bg-red-400"
                    onClick={() => {
                      setDispAcc(true);
                      setDriverAcc(false);
                    }}
                  >
                    Create Dispatcher
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 flex flex-col items-center">
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Driver Name"
              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="UserName"
              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Password"
              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Licence Info"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setDriverAcc(false)}
                className="px-4 py-2 rounded-lg border border-gray-500"
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700"
                onClick={() => setDriverAcc(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {dispAcc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800/40 backdrop-blur-md min-h-screen" />
          <div className="relative space-y-4 bg-zinc-900 text-white p-6 rounded-2xl shadow-xl border border-violet-500">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold  text-violet-400">
                Add New Team Member
              </h2>
              <p className="text-md text-gray-300">
                Create Driver's and Dispatcher's Account
              </p>
              <div className="h-12 w-fit p-5 gap-4 flex items-center justify-center bg-zinc-200/10 rounded-3xl">
                <div>
                  <button
                    className="h-10 w-40 p-2 rounded-4xl text-white bg-violet-600 active:bg-red-400"
                    onClick={() => {
                      setDispAcc(false);
                      setDriverAcc(true);
                    }}
                  >
                    Create Driver
                  </button>
                </div>
                <div>
                  <button
                    className="h-10 w-40 p-2 rounded-4xl text-white bg-violet-600 active:bg-red-400"
                    onClick={() => {
                      setDispAcc(false);
                      setDriverAcc(true);
                    }}
                  >
                    Create Dispatcher
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 flex flex-col items-center">
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Dispatcher Name"
              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="UserName"
              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Password"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setDispAcc(false)}
                className="px-4 py-2 rounded-lg border border-gray-500"
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700"
                onClick={() => setDispAcc(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="h-12 w-fit p-5 gap-4 flex items-center justify-center bg-zinc-200/10 rounded-3xl">
        <div>
          <button
            className="h-10 w-40 p-2 rounded-4xl text-white bg-violet-600 active:bg-red-400"
            onClick={() => {
              setdriver(true);
              setDispatcher(false);
            }}
          >
            Driver's
          </button>
        </div>
        <div>
          <button
            className="h-10 w-40 p-2 rounded-4xl text-white bg-violet-600 active:bg-red-400"
            onClick={() => {
              setdriver(false);
              setDispatcher(true);
            }}
          >
            Dispatcher's
          </button>
        </div>
      </div>

      {driver && (
        <div className="bg-black text-white rounded-2xl shadow border border-violet-500">
          <div className="grid grid-cols-5 py-2 px-3 text-center gap-5 border-b text-gray-500 font-medium">
            <div>Drivers</div>
            <div>UserName</div>
            <div>Password</div>
            <div>Licence Info</div>
            <div>Actions</div>
          </div>

          <div className="grid grid-cols-5 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>kane123</div>
            <div>KL125482285</div>
            <div>DELETE</div>
          </div>

          <div className="grid grid-cols-5 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>kane123</div>
            <div>KL125482285</div>
            <div>DELETE</div>
          </div>

          <div className="grid grid-cols-5 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>kane123</div>
            <div>KL125482285</div>
            <div>DELETE</div>
          </div>

          <div className="grid grid-cols-5 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>kane123</div>
            <div>KL125482285</div>
            <div>DELETE</div>
          </div>
        </div>
      )}

      {Dispatcher && (
        <div className="bg-black text-white rounded-2xl shadow border border-violet-500">
          <div className="grid grid-cols-4 py-2 px-3 text-center gap-5 border-b text-gray-500 font-medium">
            <div>Dispatcher's</div>
            <div>UserName</div>
            <div>Password</div>
            <div>Actions</div>
          </div>

          <div className="grid grid-cols-4 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>kane123</div>
            <div>DELETE</div>
          </div>

          <div className="grid grid-cols-4 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>kane123</div>
            <div>DELETE</div>
          </div>

          <div className="grid grid-cols-4 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>kane123</div>
            <div>DELETE</div>
          </div>

          <div className="grid grid-cols-4 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>kane123</div>
            <div>DELETE</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamAdd;
