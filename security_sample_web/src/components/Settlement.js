import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/common.css";

const Settlement = () => {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const handleSafeSubmit = (e) => {
    e.preventDefault();
    navigate("/result", { state: { inputText, source: "Settlement" } });
  };

  const handleDangerSubmit = (e) => {
    e.preventDefault();
    navigate("/dangerresult", { state: { inputText, source: "Settlement" } });
  };

  return (
    <div className="container">
      <h2>Settlement Page</h2>
      <p>This is the settlement page. Admins and managers should see this.</p>
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

export default Settlement;
