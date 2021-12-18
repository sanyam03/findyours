import React from "react";

const ReportForm = () => {

    return (
        <div className="popup">
      <form 
        action="#"
        noValidate
        className="form missing-cases"
      >
        <div className="form__container">
          <h3 className="form__title">Enter Informations below to Search for the Missing Person</h3>

          <fieldset className="form__field">
            <label className="form__label">Your Name</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your Name"
              className="form__input form__input_type_username"
              required
            />
            <span
              id="username-error"
              className="form__error form__error_active"
            >
            </span>

            <h2 className='form__subtitle'>Missing Person's Identity</h2>
            
            <label className="form__label">Name</label>
            <input
              id="casename"
              type="text"
              name="casename"
              placeholder="Enter Missing Person's Name"
              className="form__input form__input_type_username"
              required
            />
            <span
              id="casename-error"
              className="form__error form__error_active"
            >
            </span>

            <label className="form__label">Age</label>
            <input
              id="age"
              type="text"
              name="age"
              placeholder="Enter Missing Person's Age"
              className="form__input form__input_type_age"
            />
            <span
              id="age-error"
              className="form__error form__error_active"
            >
            </span>

            <label className="form__label">Phone</label>
            <input
              id="phone"
              type="text"
              name="phone"
              placeholder="Enter Phone number"
              className="form__input form__input_type_phone"
              required
            />
            <span
              id="age-error"
              className="form__error form__error_active"
            >
            </span>

            <label className="form__label">Father's Name</label>
            <input
              id="fathername"
              type="text"
              name="fathername"
              placeholder="Enter their Father's Name"
              className="form__input form__input_type_fathername"
              required
            />
            <span
              id="fathername-error"
              className="form__error form__error_active"
            >
            </span>
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
      </form>
    </div>
    )
}

export default ReportForm;