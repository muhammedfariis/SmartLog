import { Link } from "react-router-dom";
import { Mail, Github, Globe, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Decorative Glow */}
      <div className={styles.glowBeam} />

      <div className={styles.container}>
        
        {/* Logo & About */}
        <div className={styles.brandCol}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ width: 'fit-content' }}
          >
            <img
              className={styles.logo}
              src="/images/logosmartlog-removebg-preview.png"
              alt="SmartLog Logo"
            />
          </motion.div>

          <p style={{ fontSize: '0.875rem', lineHeight: '1.6', maxWidth: '20rem' }}>
            Next-gen logistics management system. 
            Optimizing fleet efficiency with zero-latency dispatching.
          </p>

          <div className={styles.copyright}>
            © {new Date().getFullYear()} SmartLog Fleet Management System
          </div>
        </div>

        {/* Links Grid */}
        <div className={styles.linksGrid}>
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Platform</h4>
            {[
              { name: "Services", path: "/services" },
              { name: "GetReady", path: "/register" },
              { name: "FaQ", path: "/faq" }
            ].map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`${styles.navLink} group`}
              >
                {link.name}
                <ArrowUpRight 
                  size={14} 
                  style={{ marginLeft: '4px', opacity: 0, transition: 'opacity 0.2s' }} 
                  className="group-hover-opacity-100" // Note: You might need a small global CSS for this or inline style
                />
              </Link>
            ))}
          </div>
          
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Support</h4>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/contact" className={styles.navLink}>Contact Center</Link>
            <Link to="/terms" className={styles.navLink}>Terms of Service</Link>
            <Link to="/about" className={styles.navLink}>About Services</Link>
          </div>
        </div>

        {/* Contact & Socials */}
        <div className={styles.contactCol}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
              <Mail size={18} color="#8b5cf6" />
              <span>muhammedfariis101@gmail.com</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#71717a', fontStyle: 'italic', fontFamily: 'monospace' }}>
              Available for system integrations & consultations.
            </p>
          </div>

          <div className={styles.devCredit}>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Developed by <span style={{ color: '#a78bfa', fontWeight: 600 }}>Muhammed Faris</span>
            </p>

            <div className={styles.socials}>
              <a href="https://github.com/muhammedfariis" target="_blank" rel="noreferrer" className={styles.icon}>
                <Github size={20} />
              </a>
              <a href="https://muhammedfarisportfolio.netlify.app" target="_blank" rel="noreferrer" className={styles.icon}>
                <Globe size={20} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;