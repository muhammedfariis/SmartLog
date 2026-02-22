import { Link, useNavigate } from "react-router-dom";
import { User2Icon, LogOut, Menu, X } from "lucide-react";
import Switch from "../../common/toggle";
import { useState, useEffect } from "react";
import styles from "./driverNavbar.module.css";

const DriverNavbar = () => {
  const go = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) go("/login");
    else setUser(storedUser);
  }, [go]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    go("/login");
  };

  if (!user) return null;

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        
        <div className={styles.brand}>
          <img
            src="/images/logosmartlog-removebg-preview.png"
            alt="Logo"
            className={styles.logo}
          />
          <span className={styles.title}>
            Driver Dashboard
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.desktop}>
          <Link
            to="/drivers/trips"
            className={styles.link}
          >
            My Trips
          </Link>
          
          <div className={styles.desktopRight}>
            <Switch />
            <div className={styles.userPanel}>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.userName}</span>
                <span className={styles.userRole}>DRIVER</span>
              </div>
              <button 
                onClick={handleLogout}
                className={styles.logoutBtn}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className={styles.mobile}>
          <Switch />
          <button
            className={styles.mobileToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="driver-mobile-menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        id="driver-mobile-menu"
        className={`${styles.dropdown} ${menuOpen ? styles.dropdownOpen : styles.dropdownClosed}`}
      >
        <div className={styles.dropdownInner}>
          <Link
            to="/drivers/trips"
            className={styles.dropdownLink}
            onClick={() => setMenuOpen(false)}
          >
            My Trips
          </Link>

          <div className={styles.dropdownCard}>
            <div className={styles.dropdownCardLeft}>
              <div className={styles.avatar}>
                <User2Icon size={20} className={styles.avatarIcon} />
              </div>
              <div>
                <p className={styles.dropdownUserName}>{user.userName}</p>
                <p className={styles.dropdownUserRole}>{user.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className={styles.dropdownLogout}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DriverNavbar;