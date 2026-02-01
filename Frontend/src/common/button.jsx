const Buttons = ({name , Icon}) => {
  return (
    <button
      className="group flex items-center rounded-full h-10 w-10 
               bg-black text-white hover:w-35 transition-all duration-300 
             overflow-hidden px-3"
    >
      <Icon
        size={20}
        className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
      />

      <span
        className="ml-4 opacity-0  
                  transition-opacity duration-200 group-hover:opacity-100"
      >
        {name}
      </span>
    </button>
  );
};

export default Buttons
