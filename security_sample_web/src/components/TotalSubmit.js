import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/common.css";
import axios from "axios";

const API_URL = "/api/v1";

const TotalSubmit = () => {
  const navigate = useNavigate();

  // 현재 날짜와 시간을 기본값으로 설정
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  const formattedTime = currentDate.toTimeString().split(" ")[0].slice(0, 8);

  const [formData, setFormData] = useState({
    post: { title: "", text: "" },
    date: formattedDate, // 기본값 설정
    hour: formattedTime, // 기본값 설정
    file: [],
  });

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const newFiles = [...formData.file];
      newFiles[index] = { ...newFiles[index], [name]: value };
      setFormData({ ...formData, file: newFiles });
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addFile = () => {
    setFormData({
      ...formData,
      file: [
        ...formData.file,
        {
          file_name: "",
          file_size: 0,
          file_type: "",
          file_data: "",
          path_type: "",
        },
      ],
    });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target.result.split(",")[1];
        const newFiles = [...formData.file];
        newFiles[index] = {
          ...newFiles[index],
          file_name: file.name,
          file_size: file.size,
          file_type: file.type,
          file_data: base64Data,
        };
        setFormData({ ...formData, file: newFiles });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dateTime = `${formData.date}T${formData.hour}`;
      const submitData = {
        ...formData,
        date: dateTime.split("T")[0],
        hour: dateTime.split("T")[1],
      };

      const response = await axios.post(`${API_URL}/submit/total`, submitData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        navigate("/total-result", { state: { result: response.data.data } });
      } else {
        console.error("Submission failed:", response.data.error);
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Total Submit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title">Title:</label>
          <input
            type="text"
            name="post.title"
            id="post-title"
            value={formData.post.title}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Post Title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="post-text">Content:</label>
          <textarea
            name="post.text"
            id="post-text"
            value={formData.post.text}
            onChange={handleInputChange}
            className="textarea-field"
            placeholder="Post Content"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleInputChange}
            className="input-field"
            placeholder="YYYY-MM-DD"
          />
        </div>
        <div className="form-group">
          <label htmlFor="hour">Hour:</label>
          <input
            type="text"
            name="hour"
            id="hour"
            value={formData.hour}
            onChange={handleInputChange}
            className="input-field"
            placeholder="HH:MM:SS"
          />
        </div>
        <div className="file-section">
          <h3>Files</h3>
          {formData.file.map((file, index) => (
            <div className="file-group" key={index}>
              <input type="file" onChange={(e) => handleFileChange(e, index)} />
              <input
                type="text"
                name="path_type"
                value={file.path_type}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="Path Type"
                className="input-field"
              />
            </div>
          ))}
          <button type="button" className="add-file-button" onClick={addFile}>
            Add Another File
          </button>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TotalSubmit;
