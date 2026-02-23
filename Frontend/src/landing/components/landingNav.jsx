import React from "react";
import { Link } from "react-router-dom";
import Buttons from "../../common/button/button";
import { LogIn } from "lucide-react";
import Switch from "../../common/toggle";
import styles from "./LandingNav.module.css";

const LandingNav = () => {
  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
    { name: "Terms", to: "/terms" },
  ];

  return (
    <nav className={styles.navContainer}>
      <div className={styles.brandWrapper}>
        <img
          src="/images/logosmartlog-removebg-preview.png"
          alt="Logo"
          className={styles.logoImage}
        />
        <span className={styles.brandText}>SMARTLOG</span>
      </div>

      <div className={styles.linksWrapper}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className={styles.navLink}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className={styles.actionsWrapper}>
        <Switch />
        <Buttons name="GetReady" Icon={LogIn} />
      </div>
    </nav>
  );
};

export default LandingNav;