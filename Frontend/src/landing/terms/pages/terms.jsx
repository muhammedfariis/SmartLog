import React from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  FileText,
  Scale,
  Lock,
  Globe,
  AlertCircle,
} from "lucide-react";
import PageMotion from "../../../common/pagemotion";
import LandingNav from "../../components/landingNav";
import Footer from "../../components/footer";
import styles from "./terms.module.css";

const protocols = [
  {
    icon: <Globe size={24} />,
    title: "01. Service Access",
    content:
      "SmartLog provides a cloud-based fleet management interface. Users are responsible for maintaining the security of their operator credentials.",
  },
  {
    icon: <Scale size={24} />,
    title: "02. Operational Usage",
    content:
      "The platform must be used solely for legitimate logistics. Any attempt to reverse-engineer dispatch logic will result in termination.",
  },
  {
    icon: <Lock size={24} />,
    title: "03. Data Integrity",
    content:
      "Operators are responsible for the accuracy of trip logs. We ensure 99.9% uptime for mission-critical operations.",
  },
  {
    icon: <ShieldAlert size={24} />,
    title: "04. Liability Limits",
    content:
      "SmartLog is a coordination tool. We are not liable for physical road incidents or hardware failures of vehicles.",
  },
];

const Terms = () => {
  return (
    <PageMotion>
      <div className={styles.pageWrapper}>
        <LandingNav />

        <main className={styles.termsContainer}>
          {/* ── Header ── */}
          <div className={styles.headerSection}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.legalBadge}
            >
              <FileText size={14} />
              LEGAL PROTOCOL v2.0.26
            </motion.div>

            <h1 className={styles.mainTitle}>
              Terms of <span className={styles.textHighlight}>Service.</span>
            </h1>

            <p className={styles.updateDate}>Last Updated: February 2026</p>
          </div>

          {/* ── Protocol cards ── */}
          <div className={styles.protocolList}>
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
                  <div className={styles.iconBox}>{item.icon}</div>
                  <div>
                    <h2 className={styles.protocolTitle}>{item.title}</h2>
                    <p className={styles.protocolContent}>{item.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* ── Critical note ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.noteBox}
            >
              <AlertCircle size={40} className={styles.orangeIcon} />
              <div className={styles.noteText}>
                <span className={styles.noteHighlight}>Critical Note:</span>
                By initializing the SmartLog command center, you acknowledge
                that you have accepted these protocols.
              </div>
            </motion.div>

            {/* ── Download ── */}
            <div className={styles.downloadSection}>
              <button className={styles.downloadButton}>
                Download Full Documentation
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageMotion>
  );
};

export default Terms;