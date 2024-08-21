import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import Settlement from "./components/Settlement";
import User from "./components/User";
import Result from "./components/Result";
import PrivateRoute from "./routes/PrivateRoute";
import AuthService from "./services/AuthService";
import DangerResult from "./components/DangerResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            AuthService.getCurrentUser() ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={["ADMIN"]}>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/settlement"
          element={
            <PrivateRoute roles={["ADMIN", "MANAGER"]}>
              <Settlement />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/result"
          element={
            <PrivateRoute>
              <Result />
            </PrivateRoute>
          }
        />
        <Route
          path="/dangerresult"
          element={
            <PrivateRoute>
              <DangerResult />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
