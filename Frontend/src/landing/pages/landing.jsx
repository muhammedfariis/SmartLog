import Buttons from "../../common/button/button";
import LandingNav from "../components/landingNav";
import FadeSection from "../../common/framer";
import Footer from "../components/footer";
import { UserCircle2, TruckIcon, PackageCheck, ArrowBigRight, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import FleetAnimation from "../../common/fleetanimation/fleetanimation";
import ModuleCard from "../../common/modulecards/modulcards";
import styles from "./landing.module.css"

const LandingPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <LandingNav />

      <FadeSection>
        <section className={styles.heroSection}>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={styles.versionBadge}
          >
            SmartLog Fleet Platform v1.0
          </motion.div>

          <h1 className={styles.mainTitle}>
            Control Your <span className={styles.highlightViolet}>Fleet.</span> <br />
            Scale Your <span className={styles.highlightOrange}>Impact.</span>
          </h1>

          <p className={styles.heroDescription}>
            Manage vehicles, drivers, and trip logs from a single high-performance dashboard. 
            The bridge between logistics complexity and operational simplicity.
          </p>

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Buttons name="GetReady" Icon={ArrowBigRight} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
              <Zap size={16} className={styles.highlightOrange} /> 
              <span style={{ fontFamily: 'monospace' }}>Live Tracking Ready</span>
            </div>
          </div>

          <div style={{ width: '100%', marginTop: '5rem' }}>
            <FleetAnimation />
          </div>
        </section>
      </FadeSection>

      <FadeSection>
        <section className={styles.videoSectionContainer}>
          <div className={styles.videoCard}>
            <video className={styles.videoElement} loop autoPlay muted>
              <source src="/videos/analytics.mp4" type="video/mp4" />
            </video>
            <div className={styles.videoOverlay} />
            <div className={styles.videoContentBox}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Zap className={styles.highlightOrange} /> Real-Time Analytics
              </h2>
              <p style={{ marginTop: '1rem', color: '#475569' }}>
                Monitor driver activity and fuel efficiency from a single unified dashboard. 
              </p>
            </div>
          </div>
        </section>
      </FadeSection>

      <section className={styles.modulesSection}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase' }}>Core Modules</h2>
          <div style={{ height: '4px', width: '80px', backgroundColor: '#7c3aed', margin: '1rem auto' }} />
        </div>

        <div className={styles.gridContainer}>
          <ModuleCard 
            title="Driver Portal" 
            badge="Worker Node" 
            icon={<TruckIcon color="black" />} 
            desc="Optimized for trip execution. Drivers update status, log mileage, and report issues in real-time."
            features={["Assigned Trips", "Mileage Logs", "Issue Reporting"]}
          />
          <ModuleCard 
            title="Dispatch Panel" 
            badge="Command Center" 
            icon={<PackageCheck color="black" />} 
            desc="Bridge the gap between orders and delivery. High-speed trip scheduling and route adjustment."
            features={["Driver Assignment", "Live Monitoring", "Route Control"]}
          />
          <ModuleCard 
            title="Admin Console" 
            badge="Root Access" 
            icon={<UserCircle2 color="black" />} 
            desc="Total system control. Manage users, roles, and global fleet master data with advanced audit logs."
            features={["User RBAC", "Fleet Master Data", "Global Analytics"]}
          />
        </div>
      </section>

      <FadeSection>
        <section className={styles.videoSectionContainer}>
          <div className={styles.securityCard}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(34,197,94,0.1)', width: 'fit-content', borderRadius: '1rem' }}>
                <ShieldCheck size={40} color="#16a34a" />
              </div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>Enterprise Security</h2>
              <p style={{ color: '#475569', lineHeight: '1.6' }}>
                Secure driver records and vehicle details with industry-standard encryption. 
                Role-based permissions ensure that only authorized personnel can touch critical infrastructure.
              </p>
            </div>
            <div style={{ borderRadius: '1.5rem', overflow: 'hidden', }}>
              <video style={{ width: '100%'  , border : '0px'}} loop autoPlay muted>
                <source src="/videos/security.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
      </FadeSection>

      <Footer />
    </div>
  );
};

export default LandingPage;