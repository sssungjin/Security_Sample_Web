import React, { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/common.css";

const DangerResult = () => {
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
      <h2>Danger Result Page</h2>
      <div className="result-box">
        <p>From the {source} page:</p>
        <div ref={containerRef} />
      </div>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default DangerResult;
