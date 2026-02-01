import { BrowserRouter } from "react-router-dom";
import AdminLandingPage from "../admin/routers/adminRouters";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AdminLandingPage />
      </BrowserRouter>
    </>
  );
};

export default App;
