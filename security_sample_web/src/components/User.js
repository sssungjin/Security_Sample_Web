import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/common.css";

const User = () => {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const handleSafeSubmit = (e) => {
    e.preventDefault();
    navigate("/result", { state: { inputText, source: "User" } });
  };

  const handleDangerSubmit = (e) => {
    e.preventDefault();
    navigate("/dangerresult", { state: { inputText, source: "User" } });
  };

  return (
    <div className="container">
      <h2>User Page</h2>
      <p>This is the user page. All authenticated users should see this.</p>
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

export default User;
