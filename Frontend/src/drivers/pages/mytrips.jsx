import { useState } from "react";

const Mytrips = ()=>{
 const [start , setStart] = useState(true)
 const [stop , setStop] = useState(false)
 const [returning , setReturn] = useState(false)
 const [completed , setCompleted] = useState(false)


  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-violet-500">My Assigned Trips</h1>
        <p className="text-gray-400">Only your trips are visible here</p>
      </div>

      <div className="space-y-5">

        <div className="bg-black border border-violet-500 rounded-2xl p-5 shadow space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <h2 className="text-lg font-semibold text-white">
              Trip ID: TR-45821
            </h2>

            <span className="px-3 py-1 rounded-full text-sm bg-yellow-600/20 text-yellow-400 w-fit">
              Assigned
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-gray-300">
            <p><span className="text-gray-500">Route:</span> Kochi → Trivandrum</p>
            <p><span className="text-gray-500">Vehicle:</span> KL-07-AB-1234</p>
            <p><span className="text-gray-500">Load:</span> Electronics</p>
          </div>

          <button className="w-full md:w-48 py-2 rounded-xl font-medium bg-violet-600 hover:bg-violet-700"
          onClick={()=>setStop(true)}
          >
            Start Trip
          </button>
        </div>

    {stop && 
    
    <div className="bg-black border border-violet-500 rounded-2xl p-5 shadow space-y-4 opacity-90">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <h2 className="text-lg font-semibold text-white">
              Trip ID: TR-45821
            </h2>

            <span className="px-3 py-1 rounded-full text-sm bg-green-600/20 text-green-400 w-fit">
              Running
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-gray-300">
            <p><span className="text-gray-500">Route:</span> Kochi → Trivandrum</p>
            <p><span className="text-gray-500">Vehicle:</span> KL-07-AB-1234</p>
          </div>

          <button className="w-full md:w-48 py-2 rounded-xl font-medium bg-red-600 hover:bg-red-700"
          onClick={()=>setReturn(true)}
          >
            Stop Trip
          </button>
        </div>
    
    }
        {returning && 
            <div className="bg-black border border-violet-500 rounded-2xl p-5 shadow space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <h2 className="text-lg font-semibold text-white">
              Return Trip
            </h2>

            <span className="px-3 py-1 rounded-full text-sm bg-blue-600/20 text-blue-400 w-fit">
              Ready for Return
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-gray-300">
            <p><span className="text-gray-500">Route:</span> Trivandrum → Kochi</p>
            <p><span className="text-gray-500">Vehicle:</span> KL-07-AB-1234</p>
          </div>

          <button className="w-full md:w-48 py-2 rounded-xl font-medium bg-violet-600 hover:bg-violet-700"
          onClick={()=>setCompleted(true)}
          >
            Start Return
          </button>
        </div>
        
        }

        {completed && 
        
        <div className="bg-black border border-violet-500 rounded-2xl p-5 shadow space-y-4 opacity-70">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <h2 className="text-lg font-semibold text-white">
              Return Completed
            </h2>

            <span className="px-3 py-1 rounded-full text-sm bg-gray-600/20 text-gray-400 w-fit">
              Finished
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-gray-300">
                        <p><span className="text-gray-500">Route:</span> Trivandrum → Kochi</p>
            <p><span className="text-gray-500">Vehicle:</span> KL-07-AB-1234</p>

          </div>

          <button className="w-full md:w-48 py-2 rounded-xl font-medium bg-red-600 hover:bg-red-700 ">
            Trip Completed
          </button>
        </div>
        
        }

    



      </div>
    </div>
  );
};



export default Mytrips