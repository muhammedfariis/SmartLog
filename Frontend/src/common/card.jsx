import { motion } from "framer-motion";


export const Card = ({ title, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 0.8 }}
    className={`${color}`}
  >
    <p >{title}</p>
    <h2>{value}</h2>
  </motion.div>
);
