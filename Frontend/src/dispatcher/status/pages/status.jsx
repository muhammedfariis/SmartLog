import { useEffect, useState } from "react";
import API from "../../../Api/api";
import PageMotion from "../../../common/pagemotion";
import { motion } from "framer-motion";
import styles from "./status.module.css"; 

const Status = () => {
const [driver, setdriver] = useState(true);
const [Dispatcher, setDispatcher] = useState(false);
const [driverlist, setDriverlist] = useState([]);
const [displist, setDisplist] = useState([]);

const drivers = async () => {
try {
const api = await API.get("/addteamMembers/alldrivers");
console.log(api);
setDriverlist(api.data.readDriver);
} catch (err) {
console.error(err);
}
};

const dispatch = async () => {
try {
const api = await API.get("/addteamMembers/alldispatchers");
console.log(api);
setDisplist(api.data.readdisp);
} catch (err) {
console.error(err);
}
};

useEffect(() => {
drivers();
}, []);

useEffect(() => {
dispatch();
}, []);

return (
<PageMotion>
<div className={styles.container}>
<div className={styles.header}>
<div>
<h1 className={styles.title}>Drivers And Dispatchers</h1>
<p className={styles.subtitle}>Driver's and Dispatcher's Status</p>
</div>
</div>

<div className={styles.buttonContainer}>
<div>
<button
className={styles.button}
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
className={styles.button}
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
<div className={styles.tableContainer}>
<div className={styles.tableHeader}>
<div>DRIVER</div>
<div>USERNAME</div>
<div>LICENCE-INFO</div>
</div>
{driverlist.map((d, i) => (
<motion.div
key={d._id}
initial={{ opacity: 0, y: 15 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: i * 0.05 }}
className={styles.tableRow}
>
<div>{d.Name.toUpperCase()}</div>
<div>{d.userName.toUpperCase()}</div>
<div>{d.LicenceInfo.toUpperCase()}</div>
</motion.div>
))}
</div>
)}

{Dispatcher && (
<div className={styles.tableContainer}>
<div className={styles.tableHeader2Cols}>
<div>DISPATCHER</div>
<div>USERNAME</div>
</div>
{displist.map((dis, i) => (
<motion.div
key={dis._id}
initial={{ opacity: 0, y: 15 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: i * 0.05 }}
className={styles.tableRow2Cols}
>
<div>{dis.Name.toUpperCase()}</div>
<div>{dis.userName.toUpperCase()}</div>
</motion.div>
))}
</div>
)}
</div>
</PageMotion>
);
};

export default Status;
