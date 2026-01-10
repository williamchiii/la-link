import "./App.css";
import {Route, Routes} from "react-router"
import HomeAuthPage from "./pages/HomeAuthPage";
import Dashboard from "./pages/Dashboard";

function App(){
  return <div className="min-h-screen bg-base-100">
    <Routes>
        <Route path = "/" element = {<HomeAuthPage />} /> 
        <Route path = "/dashboard" element = {<Dashboard />} /> 
    </Routes>
  </div>
}

export default App
