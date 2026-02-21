import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send 
} from "lucide-react";
import PageMotion from "../../../common/pagemotion";
import SpaceBackground from "../../../common/spacebackground/stardust";
import Footer from "../../components/footer";
import LandingNav from "../../components/landingNav";
import styles from "./contact.module.css";

const Contact = () => {
  const [focused, setFocused] = useState(null);

  const contactMethods = [
    {
      icon: <Phone className="text-violet-400" size={24} />,
      title: "Direct Line",
      value: "+91 9561166207",
      desc: "Mon-Fri, 9am - 6pm",
    },
    {
      icon: <Mail className="text-violet-400" size={24} />,
      title: "Email Support",
      value: "muhammedfariis101@gmail.com",
      desc: "24/7 Ticketing System",
    },
    {
      icon: <MapPin className="text-violet-400" size={24} />,
      title: "Headquarters",
      value: "Cyber Gateway, Tech City",
      desc: "Fleet Operations Hub",
    },
  ];

  return (
    <PageMotion>
      <LandingNav />
      <div className={styles.contactContainer}>
        <SpaceBackground />

        <div className={styles.headerSection}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.statusBadge}
          >
            <span className={styles.pingWrapper}>
              <span className={styles.pingEffect}></span>
              <span className={styles.statusDot}></span>
            </span>
            SYSTEMS ONLINE SUPPORT READY
          </motion.div>
          <h1 className={styles.mainTitle}>
            Get in <span className={styles.textHighlight}>Touch.</span>
          </h1>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.sidebar}>
            {contactMethods.map((method, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 10 }}
                className={styles.methodCard}
              >
                <div className={styles.iconContainer}>
                  {method.icon}
                </div>
                <h3 className={styles.methodLabel}>{method.title}</h3>
                <p className={styles.methodValue}>{method.value}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{method.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className={styles.formContainer}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} onSubmit={(e) => e.preventDefault()}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} style={{ color: focused === 'name' ? 'var(--violet-primary)' : 'var(--text-muted)' }}>
                    Name
                  </label>
                  <input 
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    type="text" 
                    placeholder="Enter full name"
                    className={styles.inputBase}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label} style={{ color: focused === 'email' ? 'var(--violet-primary)' : 'var(--text-muted)' }}>
                    Contact Email
                  </label>
                  <input 
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    type="email" 
                    placeholder="name@company.com"
                    className={styles.inputBase}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label} style={{ color: focused === 'message' ? 'var(--violet-primary)' : 'var(--text-muted)' }}>
                  Message
                </label>
                <textarea 
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  rows="4" 
                  placeholder="Describe your request..."
                  className={styles.textarea}
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.submitBtn}
              >
                CONNECT
                <Send size={18} />
              </motion.button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </PageMotion>
  );
};

export default Contact;