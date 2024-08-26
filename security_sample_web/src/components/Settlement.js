import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/common.css";

const API_URL = "/api/v1";

const Settlement = () => {
  const [inputText, setInputText] = useState("");
  const [formDataText, setFormDataText] = useState("");
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

        const response = await axios.get(`${API_URL}/settlement`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsAuthorized(true);
        console.log("Settlement authorization successful");
      } catch (error) {
        console.error("Settlement authorization check failed:", error);
        if (error.response && error.response.status === 403) {
          alert(
            "You are not authorized to view this page. (Need Admin or Manager role)"
          );
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

  if (isLoading) {
    return <div>Checking authorization...</div>;
  }

  if (!isAuthorized) {
    return null;
  }

  const handleSafeSubmit = (e) => {
    e.preventDefault();
    navigate("/result", { state: { inputText, source: "Settlement" } });
  };

  const handleDangerSubmit = (e) => {
    e.preventDefault();
    navigate("/dangerresult", { state: { inputText, source: "Settlement" } });
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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const user = localStorage.getItem("user");
      const token = JSON.parse(user).token;
      console.log("user:", user);
      const response = await axios.get(`${API_URL}/submit/create`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response from create settlement API:", response.data);
    } catch (error) {
      console.error("Error creating settlement:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const user = localStorage.getItem("user"); // Assuming token is stored in localStorage
      const token = JSON.parse(user).token;
      console.log("user:", user);
      console.log("token:", token);
      const response = await axios.delete(
        `${API_URL}/submit/delete`,
        {
          name: inputText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from delete settlement API:", response.data);
    } catch (error) {
      console.error("Error deleting settlement:", error);
    }
  };

  const handleSafeFormDataSubmit = (e) => {
    e.preventDefault();
    navigate("/result", {
      state: { inputText: formDataText, source: "Settlement Form-Data" },
    });
  };

  const handleDangerFormDataSubmit = (e) => {
    e.preventDefault();
    navigate("/dangerresult", {
      state: { inputText: formDataText, source: "Settlement Form-Data" },
    });
  };

  const handleDangerApiFormDataSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("text", formDataText);

      const user = localStorage.getItem("user");
      const token = JSON.parse(user).token;

      const response = await axios.post(
        `${API_URL}/submit/formdata`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from form data submit:", response.data);
      navigate("/dangerapiresult", {
        state: {
          inputText: response.data.data.result,
          source: "Settlement Form-Data API",
        },
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
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
        <input
          type="text"
          value={formDataText}
          onChange={(e) => setFormDataText(e.target.value)}
          placeholder="Enter text for form-data submit"
        />
        <div className="button-group json">
          <h3>JSON Submission</h3>
          <div className="button-group client">
            <button onClick={handleSafeSubmit} className="submit-button">
              Safe Submit (Client)
            </button>
            <button onClick={handleDangerSubmit} className="danger-button">
              Danger Submit (Client)
            </button>
          </div>
          <button onClick={handleDangerApiSubmit} className="danger-api-button">
            Danger API Submit
          </button>
        </div>
        <div className="button-group permission">
          <h3>Permission-based Actions</h3>
          <button onClick={handleCreate} className="create-button">
            Create Settlement
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete Settlement
          </button>
        </div>
        <div className="button-group form-data">
          <h3>Form-Data Submission</h3>
          <div className="button-group client">
            <button
              onClick={handleSafeFormDataSubmit}
              className="submit-button"
            >
              Safe Form-Data Submit (Client)
            </button>
            <button
              onClick={handleDangerFormDataSubmit}
              className="danger-button"
            >
              Danger Form-Data Submit (Client)
            </button>
          </div>
          <button
            onClick={handleDangerApiFormDataSubmit}
            className="danger-api-button"
          >
            Danger API Form-Data Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settlement;
