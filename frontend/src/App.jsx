import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import RestaurantDashboard from "./pages/restaurant/RestaurantDashboard";
import DriverDashboard from "./pages/driver/DriverDashboard";
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />

        {/* Content area */}
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/farmer"
              element={
                <ProtectedRoute>
                  <RoleRoute role="farmer">
                    <FarmerDashboard />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/restaurant"
              element={
                <ProtectedRoute>
                  <RoleRoute role="restaurant">
                    <RestaurantDashboard />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/driver"
              element={
                <ProtectedRoute>
                  <RoleRoute role="driver">
                    <DriverDashboard />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
