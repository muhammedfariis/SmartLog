import {useNavigate} from 'react-router-dom'

const Buttons = ({name , Icon}) => {
  const go = useNavigate()
  return (
    <button
      className="group flex items-center rounded-full h-10 w-10 
               bg-violet-300 text-violet-900 animate-pulse hover:w-35 transition-all duration-300 
             overflow-hidden px-3"
             onClick={()=> go("/register")}
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
