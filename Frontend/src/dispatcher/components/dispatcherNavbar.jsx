import { Link, useNavigate } from "react-router-dom";
import { User2Icon, LogOut, SunMoonIcon } from "lucide-react";
import Switch from "../../common/toggle";
import { useEffect, useState } from "react";
import styles from "./adminNavbar.module.css"
const AdminNavbar = () => {
  const go = useNavigate();
    
   const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      go("/login");
    } else {
      setUser(storedUser); 
    }
  }, [go]);

  if (!user) return null;

  return (
    <div className={styles.sidebar}>
      <div className={styles.container}>
        <div className={styles.logobox}>
          <img src="/images/logosmartlog-removebg-preview.png" alt="" />
          <h1 className={styles.title}>ADMIN PANEL</h1>
        </div>

        <div className={styles.menu}>
          
          <Link
            to="/dispatcher/assignment"
            className={styles.menuLink}
          >
            Assignments
          </Link>

          <Link
            to="/dispatcher/details"
            className={styles.menuLink}
          >
            Details
          </Link>

          
        </div>

        <div className={styles.switchBox}>
          <Switch />
        </div>
           <div className={styles.userCard}>
  <div className={styles.userHeader}>
    <div className={styles.avatar}>
      <User2Icon size={24}  />
    </div>

    <div className={styles.userInfo}>
      <h1 className={styles.adminText}>Dispatcher</h1>
      <p className={styles.username}>{user.userName}</p>
         
      
    </div>
  </div>

  
  <button
    onClick={() => go("/login")}
    className={styles.logoutBtn}
  >
    <LogOut
      size={20}
      className={styles.logoutLogo}
    />
    <span className={styles.logoutText}>
      Logout
    </span>
  </button>
    </div>
  
      </div>
    </div>
  );
};

export default AdminNavbar;
