import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UploadService from "./FileUploadService";
import "./Cases.css";

const UploadFile = (props) => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
  }, []);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  const upload = () => {
    let currentFile = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentFile);

    UploadService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        return UploadService.getFiles();
      })
      .then((files) => {
        setFileInfos(files.data);
      })
      .catch((err) => {
        setProgress(0);
        setMessage("Could not upload the file!" + err.response.data.message);
        setCurrentFile(undefined);
      });

    setSelectedFiles(undefined);
  };

  return (
    <>
      {currentFile && (
        <div className="progress">
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}

      <label className="btn btn-default" style={{ padding: "10px" }}>
        <input type="file" onChange={selectFile}
          style={{ margin: "0 auto 5% 15%", color: "black", fontSize: "1em" }}
        />
      </label>

      <button
        className="btn btn-success"
        style={{
          width: "50%",
          margin: "0 auto 5%",
          padding: "10px",
          backgroundColor: "#ed9d0a",
          color: "black",
          fontSize: "1em",
          border: 0,
          borderRadius: "4px"
        }}
        disabled={!selectedFiles}
        onClick={upload}
      >
        Upload
      </button>

      <div className="alert alert-light" role="alert">
        {message}
      </div>


    </>
  );
};

export default UploadFile;
