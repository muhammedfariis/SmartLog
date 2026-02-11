import { useState ,useEffect } from "react";
import API from "../../Api/api";

const Mytrips = () => {
  const [trip, setTrip] = useState([]);

  const loadTrips = async()=>{
    try{
    const api = await API.get("/assigndrivers/mytrips")
    setTrip(api.data.trips)
    console.log(api);
    }catch(err){
      console.error(err);
    }
    
  }

  useEffect(()=>{
    loadTrips()
  },[])

  const updateStatus = async(id , status)=>{
    try{
      const api = await API.patch(
        `/assigndrivers/driverStatus`,{
          id,
          status
        }
      )
      loadTrips()

    }catch(err){
      console.error(err);
      
    }
  }

  const badgeStyle = (status)=>{
    switch(status){
       case "assigned":
        return "bg-yellow-600/20 text-yellow-400";
      case "in_progress":
        return "bg-green-600/20 text-green-400";
      case "completed":
        return "bg-gray-600/20 text-gray-400";
      default:
        return "";
    }
  }

  const actionButton = (trip)=>{
    if(trip.status === "assigned"){
      return(
        <button
        className="bg-green-950 rounded-2xl h-10 active:scale-95 hover:bg-green-900 w-30 text-lg text-green-300"
        onClick={() => updateStatus(trip._id, "in_progress")}
        >
          start trip

        </button>
      )
    }

    if(trip.status === "in_progress"){
      return(
        <button 
         className="bg-red-950 rounded-2xl h-10 active:scale-95 hover:bg-red-900 w-30 text-lg text-red-300"
         onClick={()=>updateStatus(trip._id , "completed")}
        >
          complete Trip
        </button>
      )
    }

    return null

  }



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

        {trip.map((t)=>(
            <div key={t._id} className="bg-black border border-violet-500 rounded-2xl p-5 shadow space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <h2 className="text-lg font-semibold text-white">
              Trip ID: {t._id.slice(-6)}
            </h2>

            <span className={`px-3 py-1 rounded-full text-sm bg-yellow-600/20 text-yellow-400 w-fit ${badgeStyle(t.status)}`}>
              {t.status}
            </span>
          </div>

            <div className="grid sm:grid-cols-2 gap-2 text-gray-300">
            <p>Route: {t.fromLocation} → {t.toLocation}</p>
            <p>Vehicle: {t.vehicle?.NumberPlate}</p>
            <p>Load: {t.load}</p>
            <p>Date: {new Date(t.scheduledDate).toDateString()}</p>
          </div>

         {actionButton(t)}
        </div>
        ))}
       
      </div>
    </div>
  );
};

export default Mytrips;
