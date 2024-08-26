import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/common.css";

const API_URL = "/api/v1";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_URL}/multipart/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      setUploadedFileInfo(response.data.data);
      setError("");
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading file. Please try again.");
      setUploadedFileInfo(null);
    }
  };

  return (
    <div className="container">
      <h2>File Upload</h2>
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

export default Upload;
