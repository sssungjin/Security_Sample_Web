import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/common.css";

const TotalResult = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return <div>No result data available</div>;
  }

  return (
    <div className="container">
      <h2>Total Submit Result</h2>
      <div>
        <h3>Post Information</h3>
        <p>
          <strong>Title:</strong> {result.title}
        </p>
        <p>
          <strong>Text:</strong> {result.text}
        </p>
      </div>
      <div>
        <h3>Date and Time</h3>
        <p>
          <strong>Date:</strong> {result.date.join("-")}
        </p>
        <p>
          <strong>Time:</strong> {result.time.join(":")}
        </p>
      </div>
      <div>
        <h3>Uploaded Files</h3>
        {result.uploadedFiles.map((file, index) => (
          <div key={index}>
            <p>
              <strong>File {index + 1}:</strong>
            </p>
            <ul>
              <li>Original Name: {file.originalName}</li>
              <li>Renamed Name: {file.renamedName}</li>
              <li>Path: {file.path}</li>
              <li>Size: {file.size} bytes</li>
              <li>Content Type: {file.contentType}</li>
            </ul>
          </div>
        ))}
      </div>
      <p>
        <strong>Processing Result:</strong> {result.processingResult}
      </p>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default TotalResult;
