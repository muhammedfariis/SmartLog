import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldAlert, 
  FileText, 
  Scale, 
  Lock, 
  Globe, 
  AlertCircle 
} from "lucide-react";
import PageMotion from "../../../common/pagemotion";
import SpaceBackground from "../../../common/spacebackground/stardust";
import LandingNav from "../../components/landingNav";
import Footer from "../../components/footer";
import styles from "./terms.module.css";

const Terms = () => {
  const protocols = [
    {
      icon: <Globe className="text-violet-400" size={24} />,
      title: "01. Service Access",
      content: "SmartLog provides a cloud-based fleet management interface. Users are responsible for maintaining the security of their operator credentials and all activities performed under their command center."
    },
    {
      icon: <Scale className="text-violet-400" size={24} />,
      title: "02. Operational Usage",
      content: "The platform must be used solely for legitimate logistics and fleet coordination. Any attempt to reverse-engineer the dispatch logic or bypass system security protocols will result in immediate termination."
    },
    {
      icon: <Lock className="text-violet-400" size={24} />,
      title: "03. Data Integrity",
      content: "While SmartLog encrypts fleet data, operators are responsible for the accuracy of trip logs and driver records submitted to the system. We ensure 99.9% uptime for mission-critical operations."
    },
    {
      icon: <ShieldAlert className="text-violet-400" size={24} />,
      title: "04. Liability Limits",
      content: "SmartLog is a coordination tool. We are not liable for physical road incidents, hardware failures of vehicles, or delays caused by external environmental factors."
    }
  ];

  return (
    <PageMotion>
      <LandingNav />
      <div className={styles.termsContainer}>
        <SpaceBackground />

        <div className={styles.headerSection}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.legalBadge}
          >
            <FileText size={14} />
            LEGAL PROTOCOL v2.0.26
          </motion.div>
          <h1 className={styles.mainTitle}>
            Terms of <span className={styles.textHighlight}>Service.</span>
          </h1>
          <p className={styles.updateDate}>
            Last Updated: February 2026 
          </p>
        </div>

        <div className={styles.protocolList}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {protocols.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={styles.protocolCard}
              >
                <div className={styles.flexLayout}>
                  <div className={styles.iconBox}>
                    {item.icon}
                  </div>
                  <div>
                    <h2 className={styles.protocolTitle}>{item.title}</h2>
                    <p className={styles.protocolContent}>
                      {item.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={styles.noteBox}
          >
            <AlertCircle size={48} className="text-orange-500" style={{ flexShrink: 0 }} />
            <div className={styles.noteText}>
              <span className={styles.noteHighlight}>Critical Note:</span> 
              By initializing the SmartLog command center, you acknowledge that you have read and accepted these protocols. 
              Unauthorized distribution of fleet analytics is strictly prohibited under the Logistics Privacy Act.
            </div>
          </motion.div>

          <div className={styles.downloadSection}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Need a formal PDF for your legal department?
            </p>
            <button className={styles.downloadButton}>
              Download Full Documentation
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </PageMotion>
  );
};

export default Terms;