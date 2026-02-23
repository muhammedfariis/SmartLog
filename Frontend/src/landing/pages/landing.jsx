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

      {/* Hero Section */}
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

          <div className={styles.ctaContainer}>
            <Buttons name="Get Ready" Icon={ArrowBigRight} />
            <div className={styles.liveBadge}>
              <Zap size={18} className={styles.highlightOrange} /> 
              <span>Live Tracking Ready</span>
            </div>
          </div>

          <div style={{ width: '100%', marginTop: '5rem' }}>
            <FleetAnimation />
          </div>
        </section>
      </FadeSection>

      {/* Analytics Video Section */}
      <FadeSection>
        <section className={styles.videoSectionContainer}>
          <div className={styles.videoCard}>
            <video className={styles.videoElement} loop autoPlay muted playsInline>
              <source src="/videos/analytics.mp4" type="video/mp4" />
            </video>
            <div className={styles.videoOverlay} />
            <div className={styles.videoContentBox}>
              <h2 className={styles.videoTitle}>
                <Zap className={styles.highlightOrange} /> Real-Time Analytics
              </h2>
              <p className={styles.videoText}>
                Monitor driver activity and fuel efficiency from a single unified dashboard. 
                Turn raw data into actionable logistics intelligence.
              </p>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* Modules Section */}
      <section className={styles.modulesSection}>
        <div className={styles.moduleHeader}>
          <h2 className={styles.moduleTitle}>Core Modules</h2>
          <div style={{ height: '4px', width: '80px', backgroundColor: '#7c3aed', margin: '1rem auto', borderRadius: '2px' }} />
        </div>

        <div className={styles.gridContainer}>
          <ModuleCard 
            title="Driver Portal" 
            badge="Worker Node" 
            icon={<TruckIcon color="currentColor" />} 
            desc="Optimized for trip execution. Drivers update status, log mileage, and report issues in real-time."
            features={["Assigned Trips", "Mileage Logs", "Issue Reporting"]}
          />
          <ModuleCard 
            title="Dispatch Panel" 
            badge="Command Center" 
            icon={<PackageCheck color="currentColor" />} 
            desc="Bridge the gap between orders and delivery. High-speed trip scheduling and route adjustment."
            features={["Driver Assignment", "Live Monitoring", "Route Control"]}
          />
          <ModuleCard 
            title="Admin Console" 
            badge="Root Access" 
            icon={<UserCircle2 color="currentColor" />} 
            desc="Total system control. Manage users, roles, and global fleet master data with advanced audit logs."
            features={["User RBAC", "Fleet Master Data", "Global Analytics"]}
          />
        </div>
      </section>

      {/* Security Section */}
      <FadeSection>
        <section className={styles.videoSectionContainer}>
          <div className={styles.securityCard}>
            <div className={styles.securityInfo}>
              <div className={styles.securityIconBox}>
                <ShieldCheck size={40} color="#16a34a" />
              </div>
              <h2 className={styles.securityTitle}>Enterprise Security</h2>
              <p className={styles.securityDescription}>
                Secure driver records and vehicle details with industry-standard encryption. 
                Role-based permissions (RBAC) ensure that only authorized personnel can touch critical infrastructure.
              </p>
            </div>
            <div className={styles.securityVideoBox}>
              <video style={{ width: '100%', display: 'block' }} loop autoPlay muted playsInline>
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