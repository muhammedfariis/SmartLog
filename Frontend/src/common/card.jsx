import { motion } from "framer-motion";


export const Card = ({ title, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    className={`rounded-2xl p-6 shadow-lg border ${color}`}
  >
    <p className="text-sm text-gray-400">{title}</p>
    <h2 className="text-3xl font-bold text-white mt-2">{value}</h2>
  </motion.div>
);
