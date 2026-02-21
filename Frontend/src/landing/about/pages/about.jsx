import React from "react";
import { 
  Truck, 
  ShieldCheck, 
  Users, 
  Activity, 
  Clock, 
  Zap,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import PageMotion from "../../../common/pagemotion";
import LandingNav from "../../components/landingNav";
import Footer from "../../components/footer";
import styles from "./about.module.css";

const About = () => {
  const coreFeatures = [
    {
      icon: <Truck className="text-violet-400" size={28} />,
      title: "Intelligent Fleet",
      desc: "Real-time management of vehicle health, ranging from heavy containers to nimble vans."
    },
    {
      icon: <Zap className="text-violet-400" size={28} />,
      title: "Live Dispatch",
      desc: "Seamless bridge between dispatchers and drivers with instant trip assignments."
    },
    {
      icon: <ShieldCheck className="text-violet-400" size={28} />,
      title: "Document Vigil",
      desc: "Automated tracking of Pollution and Insurance expiries to ensure 100% compliance."
    },
    {
      icon: <Activity className="text-violet-400" size={28} />,
      title: "Precision Metrics",
      desc: "Rigid KM tracking and starting/ending odometer validation for accurate fleet records."
    }
  ];

  return (
    <PageMotion>
      <LandingNav />
      <div className={styles.aboutContainer}>
        
        <section className={styles.heroSection}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.badge}
          >
            Logistics Reimagined
          </motion.div>
          
          <h1 className={styles.heroTitle}>
            The Pulse of Your <br />
            <span className={styles.textGradient}>Supply Chain.</span>
          </h1>
          
          <p className={styles.heroDesc}>
            <strong style={{ color: 'var(--text-main)' }}>SmartLog</strong> is a high-performance logistics ecosystem 
            designed to synchronize dispatchers, drivers, and vehicles in a single, seamless flow.
          </p>
        </section>

        <section className={styles.stepSection}>
          <div className={styles.stepGrid}>
            {["Schedule", "Assign", "Execute", "Analyze"].map((step, idx) => (
              <div key={step} className={styles.stepCard}>
                <div className={styles.stepNumber}>{idx + 1}</div>
                <span style={{ fontWeight: 600 }}>{step}</span>
                {idx !== 3 && <ChevronRight style={{ opacity: 0.2 }} />}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.featuresSection}>
          <div className={styles.featuresGrid}>
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className={styles.featureCard}
              >
                <div className={styles.iconWrapper}>{feature.icon}</div>
                <h3 style={{ marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className={styles.roleSection}>
          <div className={styles.roleContainer}>
            <div className={styles.roleGrid}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--violet-primary)', fontWeight: 'bold', fontSize: '0.75rem', marginBottom: '1rem' }}>
                  <Users size={16} /> ROLES
                </div>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Built for the Entire Team</h2>
                <div className={styles.roleItem}>
                  <div className={styles.dot} />
                  <p><strong style={{ color: 'var(--text-main)' }}>Dispatchers:</strong> Strategic planning and monitoring.</p>
                </div>
                <div className={styles.roleItem}>
                  <div className={styles.dot} />
                  <p><strong style={{ color: 'var(--text-main)' }}>Drivers:</strong> Real-time trip execution and KM verification.</p>
                </div>
                <div className={styles.roleItem}>
                  <div className={styles.dot} />
                  <p><strong style={{ color: 'var(--text-main)' }}>Admins:</strong> Fleet lifecycle and safety compliance.</p>
                </div>
              </div>
              
              <div className={styles.statusCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--violet-primary)', fontSize: '0.875rem' }}>System Status: Optimal</span>
                  <Clock size={18} style={{ opacity: 0.4 }} />
                </div>
                <div className={styles.progressBg}>
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "94%" }} 
                    transition={{ duration: 2 }}
                    className={styles.progressFill} 
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.6 }}>
                  <span>Fleet Uptime</span>
                  <span>94%</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </PageMotion>
  );
};

export default About;