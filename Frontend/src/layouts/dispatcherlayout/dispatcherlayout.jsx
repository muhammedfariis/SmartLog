import { Outlet } from "react-router-dom";
import DispatcherNavbar from "../../dispatcher/components/dispatcherNavbar";
import { useEffect } from "react";
import SpaceBackground from "../../common/spacebackground/stardust";
import styles from "./dispatcherlayout.module.css"; 

const DisptLayout = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
    }
  }, []);

  return (
    <div className={styles.layoutContainer}>
      {/* Background layer */}
      <div className={styles.backgroundWrapper}>
        <SpaceBackground />
      </div>

      {/* UI layer */}
      <div className={styles.mainWrapper}>
        <DispatcherNavbar />
        
        <main className={styles.contentArea}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DisptLayout;