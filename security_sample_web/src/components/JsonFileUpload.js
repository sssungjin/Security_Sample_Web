import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/common.css";

const API_URL = "/api/v1";

const JsonFileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64String = event.target.result.split(",")[1]; // Remove data URL prefix

      const data = {
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        file_data: base64String,
        
      };

      const json = JSON.stringify(data);
      console.log("Uploading file json:", json);

      console.log("Uploading file:", data);

      try {
        const response = await axios.post(`${API_URL}/jsonfile/upload`, json, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("File uploaded successfully:", response.data);
        setUploadedFileInfo(response.data.data);
        setError("");
      } catch (error) {
        console.error(
          "Error uploading file:",
          error.response ? error.response.data : error.message
        );
        setError("Error uploading file. Please try again.");
        setUploadedFileInfo(null);
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      setError("Error reading file. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="container">
      <h2>JSON File Upload</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {error && <p className="error">{error}</p>}
      {uploadedFileInfo && (
        <div className="uploaded-file-info">
          <h3>Uploaded File Information:</h3>
          <p>Content Type: {uploadedFileInfo.contentType}</p>
          <p>File ID: {uploadedFileInfo.id}</p>
          <p>Original Name: {uploadedFileInfo.originalName}</p>
          <p>Renamed Name: {uploadedFileInfo.renamedName}</p>
          <p>Size: {uploadedFileInfo.size} bytes</p>
        </div>
      )}
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default JsonFileUpload;
