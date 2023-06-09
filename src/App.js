import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Partners from "./pages/Partners";
import Forgot from "./pages/Forgot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import ProtectedRoutes from "./ProtectedRoute";
import Auth from "./Auth";
import Withnav from "./components/Withnav";
import Dashboard from "./pages/Dashboard";
import Withoutnav from "./components/withoutnav";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const path = useLocation().pathname;
  const location = path.split("/")[1];
 
  return (
    <div className={location}>
      <Routes>
        {/* <Route path="*" element={<Notfound />} /> */}
        <Route element={<Withoutnav />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/forgot" element={<Forgot />} />

          <Route
            path="/auth"
            element={
              <ProtectedRoutes>
                <Auth />
              </ProtectedRoutes>
            }
          />
        </Route>
        <Route element={<Withnav />}>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
