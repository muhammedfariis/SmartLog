import Buttons from "../button/button";
import { SquareArrowOutUpRight } from "lucide-react";
import styles from "./ModuleCard.module.css";

const ModuleCard = ({ title, icon, desc, features, badge }) => (
  <div className={styles.card}>
    <div className={styles.header}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <span className={styles.badge}>
        {badge}
      </span>
    </div>

    <h3 className={styles.title}>
      {title}
    </h3>

    <p className={styles.description}>
      {desc}
    </p>

    <ul className={styles.featureList}>
      {features.map((f, i) => (
        <li 
          key={i} 
          className={styles.featureItem}
        >
          <div className={styles.dot} /> 
          {f}
        </li>
      ))}
    </ul>

    <div style={{ marginTop: 'auto' }}>
      <Buttons 
        name="GetReady" 
        Icon={SquareArrowOutUpRight} 
        style={{ 
          width: '100%', 
          justifyContent: 'center', 
          backgroundColor: '#7c3aed', 
          color: 'white',
          transition: 'all 0.3s' 
        }} 
      />
    </div>
  </div>
);

export default ModuleCard;