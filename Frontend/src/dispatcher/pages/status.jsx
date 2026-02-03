import { useState } from "react";
const Status = () => {
  const [driver, setdriver] = useState(true);
  const [Dispatcher, setDispatcher] = useState(false);
  return (
    <div className="space-y-5 p-10">
      <div className="flex justify-start items-center">
        <div>
          <h1 className="text-3xl font-bold text-violet-500">
            Drivers And Dispatchers
          </h1>
          <p className="text-gray-300 mt-1">Driver's and Dispatcher's Status</p>
        </div>
      </div>

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
          <div className="grid grid-cols-4 py-2 px-3 text-center gap-5 border-b text-gray-500 font-medium">
            <div>Drivers</div>
            <div>UserName</div>
            <div>Licence Info</div>
            <div>Actions</div>
          </div>

          <div className="grid grid-cols-4 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>KL125482285</div>
            <div>DELETE</div>
          </div>

          <div className="grid grid-cols-4 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>KL125482285</div>
            <div>DELETE</div>
          </div>

          <div className="grid grid-cols-4 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>KL125482285</div>
            <div>DELETE</div>
          </div>

          <div className="grid grid-cols-4 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>KL125482285</div>
            <div>DELETE</div>
          </div>
        </div>
      )}

      {Dispatcher && (
        <div className="bg-black text-white rounded-2xl shadow border border-violet-500">
          <div className="grid grid-cols-3 py-2 px-3 text-center gap-5 border-b text-gray-500 font-medium">
            <div>Dispatcher's</div>
            <div>UserName</div>
            <div>Actions</div>
          </div>

          <div className="grid grid-cols-3 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>DELETE</div>
          </div>

          <div className="grid grid-cols-3 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>DELETE</div>
          </div>

          <div className="grid grid-cols-3 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>DELETE</div>
          </div>

          <div className="grid grid-cols-3 py-2 px-3 text-center gap-5  border-b border-violet-500 items-center">
            <div>Kane</div>
            <div>KanePhiliph</div>
            <div>DELETE</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;
