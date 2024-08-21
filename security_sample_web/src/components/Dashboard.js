import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import "../styles/common.css";

const Dashboard = () => {
  const currentUser = AuthService.getCurrentUser();
  const role = currentUser?.role || "USER";
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <div className="container dashboard-container">
      <h2>Dashboard</h2>
      <p>Welcome, {currentUser?.name || "User"}!</p>
      <p>Your role is: {role}</p>
      <nav>
        <ul className="page-links">
          <li>
            <Link to="/admin">Admin Page</Link>
          </li>
          <li>
            <Link to="/settlement">Settlement Page</Link>
          </li>
          <li>
            <Link to="/user">User Page</Link>
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
