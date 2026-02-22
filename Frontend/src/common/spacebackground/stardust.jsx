import { useMemo } from "react";
import styles from "./startdust.module.css";

const SpaceBackground = () => {
  const stars = useMemo(() => {
    return [...Array(200)].map((_, i) => {
      const size = Math.random() * 1 + 1;
      const angle = Math.random() * 360;
      const distance = Math.random() * 800 + 50; 
      
      return (
        <div
          key={i}
          className={styles.star}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `rotate(${angle}deg) translate(${distance}px)`,
          }}
        />
      );
    });
  }, []);

  return (
    <div className={styles.spaceContainer}>
      <div className={styles.starFieldWrapper}>
        <div className={styles.starContainer}>
          {stars}
        </div>
      </div>
    </div>
  );
};

export default SpaceBackground;