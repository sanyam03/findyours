import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import UploadService from "./FileUploadService";
import axios from "../../utils/axios";
import Modal from "@material-ui/core/Modal";
import "./Cases.css";
import UploadFile from "./UploadFile";

const MissingCases = (props) => {
  const [errors, setErrors] = useState([]);

  //const [open,isOpen] = useState(props)

  const handleSubmit = (event) => {
    axios
    .get("/api/user/matchface",)
    .then((data) => {
      console.log(data)
      props.setResult(data.data);
      props.setModalOpen(!props.modalOpen)

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

  return (
    <>
      <Modal open={props.modalOpen} onClose={props.toggleModalOpen} >
        {/* <button
          type="button"
          aria-label="close"
          className="form__close"
          onClick={props.onClose}
        ></button> */}
        <form action="#" noValidate className="form missing-cases">
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
                <span
                  id="username-error"
                  className="form__error form__error_active"
                ></span>
              </div>
              <h2 className="form__subtitle">Missing Person's Identity</h2>
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
                <span
                  id="casename-error"
                  className="form__error form__error_active"
                ></span>
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
                <span
                  id="age-error"
                  className="form__error form__error_active"
                ></span>
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
                <span
                  id="phone-error"
                  className="form__error form__error_active"
                ></span>
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
                <span
                  id="fathername-error"
                  className="form__error form__error_active"
                ></span>
              </div>
            </fieldset>
            <UploadFile  known = {0}/>

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
      </Modal>
    </>
  );
};

export default MissingCases;
