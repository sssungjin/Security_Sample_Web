import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/common.css";

const Admin = () => {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const handleSafeSubmit = (e) => {
    e.preventDefault();
    navigate("/result", { state: { inputText, source: "Admin" } });
  };

  const handleDangerSubmit = (e) => {
    e.preventDefault();
    navigate("/dangerresult", { state: { inputText, source: "Admin" } });
  };

  return (
    <div className="container">
      <h2>Admin Page</h2>
      <p>This is the admin page. Only administrators should see this.</p>
      <form>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text here"
        />
        <button onClick={handleSafeSubmit} className="submit-button">
          Safe Submit
        </button>
        <button onClick={handleDangerSubmit} className="danger-button">
          Danger Submit
        </button>
      </form>
    </div>
  );
};

export default Admin;
