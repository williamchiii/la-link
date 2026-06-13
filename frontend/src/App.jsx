import {Route, Routes} from "react-router"
import HomeAuthPage from "./pages/HomeAuthPage";
import Dashboard from "./pages/Dashboard";
import LinkNotFound from "./pages/LinkNotFound";

function App(){
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeAuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<LinkNotFound />} />
      </Routes>
    </div>
  );
}

export default App
