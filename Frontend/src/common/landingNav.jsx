const LandingNav = () => {
  return (
    <>
      <nav className="w-full flex items-center justify-between  p-4 border-b-2 border-gray-800 shadow-md">
        <div className="flex items-center h-12 w-30">
          <img src="/images/logosmartlog-removebg-preview.png" alt="Logo" />
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
            Sign Up
          </button>
        </div>
      </nav>
    </>
  );
};

export default LandingNav;
