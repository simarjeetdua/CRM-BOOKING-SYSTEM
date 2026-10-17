
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import Bookings from "../pages/Bookings";
import Offers from "../pages/Offers";
import Payments from "../pages/Payments";
import Invoices from "../pages/Invoices";
import Support from "../pages/Support";

import Layout from "../components/Layout";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public SEO Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Public Authentication Routes */}
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Signup />
            )
          }
        />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* Protected CRM Routes */}
        <Route
          element={
            user ? (
              <Layout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/clients"
            element={<Clients />}
          />

          <Route
            path="/bookings"
            element={<Bookings />}
          />

          <Route
            path="/offers"
            element={<Offers />}
          />

          <Route
            path="/payments"
            element={<Payments />}
          />

          <Route
            path="/invoices"
            element={<Invoices />}
          />

          <Route
            path="/support"
            element={<Support />}
          />
        </Route>

        {/* Handle Unknown Routes */}
        <Route
          path="*"
          element={
            <Navigate
              to={user ? "/dashboard" : "/"}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
