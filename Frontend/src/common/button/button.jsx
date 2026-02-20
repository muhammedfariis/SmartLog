import { useNavigate } from 'react-router-dom';
import styles from './button.module.css';

const Buttons = ({ name, Icon }) => {
  const go = useNavigate();

  return (
    <button
      className={styles.button}
      onClick={() => go("/register")}
    >
      <Icon
        size={20}
        className={styles.icon}
      />

      <span className={styles.text}>
        {name}
      </span>
    </button>
  );
};

export default Buttons;