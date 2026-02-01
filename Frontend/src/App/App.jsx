import { BrowserRouter } from "react-router-dom";
import LandingPage from "../landing/landing";
const App = () => {
  return (
    <>
      <BrowserRouter>
       <LandingPage/>
      </BrowserRouter>
    </>
  );
};

export default App;
