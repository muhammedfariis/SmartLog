import DriverNavbar from "../../drivers/components/driverNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./driverlayout.module.css";

const DriverLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      
    }
  }, [navigate]);

  return (
    <div className={styles.root}>

      <DriverNavbar />
      <main className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DriverLayout;