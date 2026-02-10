import { useEffect, useState } from "react";
import { Plus  , Trash } from "lucide-react";
import API from "../../Api/api";

const TeamAdd = () => {
  const [driver, setdriver] = useState(true);
  const [Dispatcher, setDispatcher] = useState(false);
  const [dispAcc, setDispAcc] = useState(false);
  const [driverAcc, setDriverAcc] = useState(false);
  const [driverlist, setDriverlist] = useState([]);
  const [displist , setDisplist] = useState([])
  const [formDriver, setFormDriver] = useState({
    Name: "",
    userName: "",
    password: "",
    LicenceInfo: "",

  });

  const [formDisp, setFormDisp] = useState({
    Name: "",
    userName: "",
    password: "",

  });

  const handleChangeDriver = (e) => {
    setFormDriver({
      ...formDriver,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitDriver = async (e) => {
    console.log(formDriver);
    e.preventDefault();
    try {
      const api = await API.post("/addteamMembers/createDrivers", {
        ...formDriver,
        role : "driver"
      });

      alert("driver created");

      setFormDriver({
        Name: "",
        userName: "",
        password: "",
        LicenceInfo: "",
      });

      setDriverAcc(false);
      fetchDrivers()

      console.log("form driver : ", api.data.driver);
    } catch (err) {
      console.error(err);
      alert("driver not created");
    }
  };

  const handleChangeDisp = (e) => {
    setFormDisp({
      ...formDisp,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitDisp = async (e) => {
    console.log(formDisp);
    e.preventDefault();
    try {
      const api = await API.post("/addteamMembers/createDispatchers", 

        {
          ...formDisp,
          role : "dispatcher"
        }
      );

      alert("dispatcher created");

      setFormDisp({
        Name: "",
        userName: "",
        password: "",

      });

      setDispAcc(false);

     fetchDisp()
      console.log("form driver : ", api.data.dispatcher);
    } catch (err) {
      console.error(err);
      alert("dispatcher not created");
    }
  };

  const fetchDrivers = async () => {
    try {
      const api = await API.get("/addteamMembers/alldrivers");

      console.log(api);

      setDriverlist(api.data.readDriver);
    } catch (err) {
      console.error(err);
    }
  }

  const deleteDriver = async (id) =>{
    try{

      const api = await API.delete(`/addteamMembers/deleteDrivers/${id}`)

      console.log(api);
      fetchDrivers()
      
    }catch(err){
      console.log(err);
      
    }

  }


   const deleteDispatcher = async (id) =>{
    try{

      const api = await API.delete(`/addteamMembers/deleteDispatchers/${id}`)

      console.log(api);
      fetchDisp()
      
    }catch(err){
      console.log(err);
      
    }

  }

  const fetchDisp = async () =>{
    try{

      const api = await API.get("/addteamMembers/alldispatchers")
      console.log(api);

      setDisplist(api.data.readdisp)
      
    }catch(err){
      console.log(err);
      
    }
  }

  useEffect(()=>{
    fetchDrivers()
  } , [])
  
  useEffect(()=>{
    fetchDisp()
  },[])

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

            <form
              onSubmit={handleSubmitDriver}
              className="space-y-3 flex flex-col items-center"
            >
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Name"
                name="Name"
                onChange={handleChangeDriver}
                required
              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="UserName"
                name="userName"
                required
                onChange={handleChangeDriver}
              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleChangeDriver}
                required
              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="LicenceInfo"
                name="LicenceInfo"
                onChange={handleChangeDriver}
                required
              />
              

              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setDriverAcc(false)}
                  className="px-4 py-2 rounded-lg border border-gray-500"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700"
                >
                  Save
                </button>
              </div>
            </form>
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
                      setDispAcc(true);
                      setDriverAcc(false);
                    }}
                  >
                    Create Dispatcher
                  </button>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmitDisp}
              className="space-y-3 flex flex-col items-center"
            >
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Dispatcher Name"
                name="Name"
                required
                value={formDisp.Name}
                onChange={handleChangeDisp}
              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="UserName"
                name="userName"
                required
                value={formDisp.userName}
                onChange={handleChangeDisp}
              />
              <input
                className="w-80 p-2 rounded-lg bg-black border border-violet-500 outline-none"
                placeholder="Password"
                name="password"
                type="password"
                required
                value={formDisp.password}
                onChange={handleChangeDisp}
              />

              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setDispAcc(false)}
                  className="px-4 py-2 rounded-lg border border-gray-500"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700"
                >
                  Save
                </button>
              </div>
            </form>
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
        <div className="bg-black text-white w-full rounded-2xl shadow border border-violet-500">
          <div className="grid grid-cols-4 py-2 px-3 text-center gap-5 border-b border-violet-500 text-gray-500 font-medium">
            <div>Driver</div>
            <div>UserName</div>
            <div>Licence Info</div>
            <div>Action</div>
          </div>

         {driverlist.map((d)=>(
            <div key={d._id} className="grid grid-cols-4 py-2 px-3 text-center gap-5   border-violet-500 items-center">
            <div>{d.Name}</div>
            <div>{d.userName}</div>
            <div>{d.LicenceInfo}</div>
                  <div className="flex items-center justify-center gap-1">
              <div>
                <button
                  className="group flex items-center  rounded-full h-10 w-10 
               bg-red-900 text-red-600 hover:w-25 transition-all duration-300 
             overflow-hidden px-2"
               onClick={()=>deleteDriver(d._id)}
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

            
            </div>
          </div>
         ))}
       
        </div>
      )}

      {Dispatcher && (
        <div  className="bg-black text-white rounded-2xl w-full shadow border border-violet-500">
          <div className="grid grid-cols-3 py-2 px-3 text-center gap-5 border-b border-violet-500 text-gray-500 font-medium">
            <div>Dispatcher</div>
            <div>UserName</div>
            <div>Action</div>
          </div>
         {displist.map((dis)=>(

          <div key={dis._id} className="grid grid-cols-3 py-2 px-3 text-center gap-5  border-violet-500 items-center">
            <div>{dis.Name}</div>
            <div>{dis.userName}</div>
                              <div className="flex items-center justify-center gap-1">
              <div>
                <button
                  className="group flex items-center  rounded-full h-10 w-10 
               bg-red-900 text-red-600 hover:w-25 transition-all duration-300 
             overflow-hidden px-2"
                  onClick={()=>deleteDispatcher(dis._id)}
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

           
            </div>
          </div>

         ))}
          

        </div>
      )}
    </div>
  );
};

export default TeamAdd;
