import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/common.css";

const API_URL = "/api/v1";

const Admin = () => {
  const [inputText, setInputText] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const checkAuthorization = async () => {
      try {
        const user = localStorage.getItem("user");
        const token = user ? JSON.parse(user).token : null;
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(`${API_URL}/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsAuthorized(true);
        console.log("Authorization successful");
      } catch (error) {
        console.error("Authorization check failed:", error);
        if (error.response && error.response.status === 403) {
          alert("You are not authorized to view this page. (Need Admin role)");
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthorization();
  }, [navigate]);

  const handleSafeSubmit = (e) => {
    e.preventDefault();
    navigate("/result", { state: { inputText, source: "Admin" } });
  };

  const handleDangerSubmit = (e) => {
    e.preventDefault();
    navigate("/dangerresult", { state: { inputText, source: "Admin" } });
  };

  const handleDangerApiSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/submit/danger`, {
        input_text: inputText,
      });
      console.log("Response from danger API:", response.data);
      navigate("/dangerapiresult", {
        state: { inputText: response.data.data.result, source: "Admin API" },
      });
    } catch (error) {
      console.error("Error submitting to danger API:", error);
    }
  };

  if (isLoading) {
    return <div>Checking authorization...</div>;
  }

  if (!isAuthorized) {
    return null;
  }
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
        <button onClick={handleDangerApiSubmit} className="danger-api-button">
          Danger API Submit
        </button>
      </form>
    </div>
  );
};

export default Admin;
