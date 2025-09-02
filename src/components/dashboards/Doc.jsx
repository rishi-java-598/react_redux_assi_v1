import React, { useState } from "react";
import styles from "../../styles/UploadDocuments.module.css";

const UploadDocuments = () => {
  const [files, setFiles] = useState([
    {
      name: "Medical_Certificate.pdf",
      type: "Policy Document",
      date: "2024-08-15",
    },
    {
      name: "Claim_Receipt.jpg",
      type: "Claim Document",
      date: "2024-08-10",
    },
  ]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files).map((file) => ({
      name: file.name,
      type: "Uploaded Document",
      date: new Date().toISOString().split("T")[0],
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemove = (name) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2>Upload Documents</h2>
        <p>Upload policy documents, claim receipts, or other related files</p>
        <div className={styles.uploadBox}>
          <div className={styles.uploadIcon}>⬆️</div>
          <p>Drag and drop files here, or click to select</p>
          <label className={styles.uploadBtn}>
            Select Files
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>

      {files.length > 0 && (
        <div className={styles.section}>
          <h2>Uploaded Documents</h2>
          <div className={styles.fileList}>
            {files.map((file, index) => (
              <div key={index} className={styles.fileItem}>
                <span className={styles.fileIcon}>📄</span>
                <div className={styles.fileDetails}>
                  <p className={styles.fileName}>{file.name}</p>
                  <p className={styles.fileMeta}>
                    {file.type} • {file.date}
                  </p>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(file.name)}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;
