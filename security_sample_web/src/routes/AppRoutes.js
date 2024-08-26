import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Admin from "../components/Admin";
import Settlement from "../components/Settlement";
import User from "../components/User";
import Result from "../components/Result";
import DangerResult from "../components/DangerResult";
import DangerApiResult from "../components/DangerApiResult";
import FormDataUpload from "../components/FormDataUpload";
import JsonFileUpload from "../components/JsonFileUpload";
import TotalSubmit from "../components/TotalSubmit";
import TotalResult from "../components/TotalResult";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/settlement" element={<Settlement />} />
      <Route path="/user" element={<User />} />
      <Route path="/result" element={<Result />} />
      <Route path="/dangerresult" element={<DangerResult />} />
      <Route path="/dangerapiresult" element={<DangerApiResult />} />
      <Route path="/upload" element={<FormDataUpload />} />
      <Route path="/jsonfileupload" element={<JsonFileUpload />} />
      <Route path="/total" element={<TotalSubmit />} />
      <Route path="/total-result" element={<TotalResult />} />
    </Routes>
  );
};

export default AppRoutes;
