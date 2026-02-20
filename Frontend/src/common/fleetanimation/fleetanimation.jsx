import { motion } from "framer-motion";
import styles from "./FleetAnimation.module.css";

const FleetAnimation = () => {
  const vehicles = [
    { src: "/images/container.png", delay: 0 },
    { src: "/images/truck.png", delay: 3 },
    { src: "/images/mintruck.png", delay: 6 },
    { src: "/images/van.png", delay: 9 }
  ];

  return (
    <div className={styles.animationContainer}>
      
      <div className={styles.roadLine} />

      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {vehicles.map((v, i) => (
          <motion.div
            key={i}
            initial={{ x: "-150%" }} 
            animate={{ x: "120vw" }} 
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: v.delay,
              ease: "linear"
            }}
            className={styles.vehicleWrapper}
          >
            <div className={styles.imageContainer}>
              <div className={styles.shadow} />
              
              <img 
                src={v.src} 
                alt="Fleet" 
                className={styles.vehicleImage} 
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />
    </div>
  );
};

export default FleetAnimation;