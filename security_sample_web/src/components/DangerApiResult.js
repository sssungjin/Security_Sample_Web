import React, { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/common.css";

const DangerApiResult = () => {
  const location = useLocation();
  const { inputText, source } = location.state || {
    inputText: "",
    source: "Unknown",
  };
  const containerRef = useRef(null);
  const executedRef = useRef(false);

  useEffect(() => {
    if (containerRef.current && !executedRef.current) {
      containerRef.current.innerHTML = inputText;
      const scripts = containerRef.current.getElementsByTagName("script");
      for (let script of scripts) {
        // eslint-disable-next-line
        eval(script.innerHTML);
      }
      executedRef.current = true;
    }
  }, [inputText]);

  return (
    <div className="container">
      <h2>Danger API Result Page</h2>
      <div className="result-box">
        <p>From the {source} page:</p>
        <div ref={containerRef} />
      </div>
      <p>This content was processed through the server API with XSS filter.</p>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default DangerApiResult;
