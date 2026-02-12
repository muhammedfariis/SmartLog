import { motion } from "framer-motion";

const FleetAnimation = () => {
  const vehicles = [
    { src: "/images/container.png", delay: 0 },
    { src: "/images/truck.png", delay: 3 },
    { src: "/images/mintruck.png", delay: 6 },
    { src: "/images/van.png", delay: 9 }
  ];

  return (
    <div className="relative w-full h-40 overflow-hidden mt-10 pointer-events-none">
      
      <div className="absolute bottom-10 w-full h-0.5 bg-violet-500/40 z-30" />

      <div className="relative w-full h-full">
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
            className="absolute bottom-10 flex items-end"
          >
            <div className="relative flex flex-col items-center">
              <div className="absolute bottom-0 w-[80%] h-2 bg-black/60 blur-md rounded-full" />
              
              <img 
                src={v.src} 
                alt="Fleet" 
                className="w-48 md:w-64 h-auto object-contain translate-y-1" 
                style={{ 
                   filter: "brightness(0.9) contrast(1.1)",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black to-transparent z-40" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black to-transparent z-40" />
    </div>
  );
};

export default FleetAnimation;