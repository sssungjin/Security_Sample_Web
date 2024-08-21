import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/common.css";

const Result = () => {
  const location = useLocation();
  const { inputText, source } = location.state || {
    inputText: "",
    source: "Unknown",
  };

  return (
    <div className="container">
      <h2>Safe Result Page</h2>
      <div className="result-box">
        <p>From the {source} page:</p>
        <p>{inputText}</p>
      </div>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default Result;
