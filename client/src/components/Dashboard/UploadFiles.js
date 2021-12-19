import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import UploadService from "./FileUploadService";
import axios from "../../utils/axios";
import './UploadFiles.css';

const UploadFiles = (props) => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);
  const [folder, setFolder] = useState(0);
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
  const handleSubmit = (event) => {

    axios
      .get("/user/api/matchface")
      .then((result) => {
        console.log(result)
        debugger

      })
      .catch((err) => {
        console.log(err.response)
        console.log(err.response.data)
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
          setTimeout(() => {
            setErrors([]);
          }, 3000);
        } else if (err.response.data.message) {
          setErrors([...errors, { msg: err.response.data.message }]);
          setTimeout(() => {
            setErrors([]);
          }, 3000);
        }
      });

  };

  const upload = () => {
    let currentFile = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentFile);

    UploadService.upload(currentFile, folder, (event) => {
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
    <div className={`popup ${props.isOpen ? "popup_open" : ""}`}>
      <form
        action="#"
        noValidate
        className="form missing-cases"
      >
        <div className="form__container">
          <h3 className="form__title">Search for the Missing Person</h3>

          <fieldset className="form__field">
            <div className="form__field_content">
              <label className="form__label">Your Name</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your Name"
                className="form__input form__input_type_username"
                required
              />
              <span id="username-error" className="form__error form__error_active"></span>
            </div>
            <h2 className='form__subtitle'>Missing Person's Identity</h2>
            <div className="form__field_content">
              <label className="form__label">Name</label>
              <input
                id="casename"
                type="text"
                name="casename"
                placeholder="Enter Missing Person's Name"
                className="form__input form__input_type_username"
                required
              />
              <span id="casename-error" className="form__error form__error_active"></span>
            </div>
            <div className="form__field_content">
              <label className="form__label">Age</label>
              <input
                id="age"
                type="number"
                name="age"
                placeholder="Enter Missing Person's Age"
                className="form__input form__input_type_age"
              />
              <span id="age-error" className="form__error form__error_active"></span>
            </div>
            <div className="form__field_content">
              <label className="form__label">Phone</label>
              <input
                id="phone"
                type="number"
                name="phone"
                placeholder="Enter Phone number"
                className="form__input form__input_type_phone"
                required
              />
              <span id="phone-error" className="form__error form__error_active"></span>
            </div>
            <div className="form__field_content">
              <label className="form__label">Father's Name</label>
              <input
                id="fathername"
                type="text"
                name="fathername"
                placeholder="Enter their Father's Name"
                className="form__input form__input_type_fathername"
                required
              />
              <span id="fathername-error" className="form__error form__error_active"></span>
            </div>
          </fieldset>

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

          <label className="btn btn-default">
            <input type="file" onChange={selectFile} />
          </label>

          <button
            className="btn btn-success"
            disabled={!selectedFiles}
            onClick={upload}
          >
            Upload
          </button>

          <div className="alert alert-light" role="alert">
            {message}
          </div>

          <div className="card">
            <div className="card-header">List of Files</div>
            <ul className="list-group list-group-flush">
              {fileInfos &&
                fileInfos.map((file, index) => (
                  <li className="list-group-item" key={index}>
                    <a href={file.url}>{file.name}</a>
                  </li>
                ))}
            </ul>
          </div>
          <Button
            variant="contained"
            style={{
              backgroundColor: "rgb(72,182,54)",
              width: "50%",
              color: "white",
              margin: "0 auto",
            }}
          onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>

        <button type="button" aria-label="close" className="form__close" onClick={props.onClose}></button>
      </form>
    </div>
  );
};

export default UploadFiles;
