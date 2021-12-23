import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import UploadService from "./FileUploadService";
import axios from "../../utils/axios";
import Modal from "@material-ui/core/Modal";
import './Cases.css';
import UploadFile  from "./UploadFile";
const ReportCases = (props) => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [imageurl,setImageUrl] = useState("");
  const handleSubmit = (event) => {

    axios
      .post("/user/api/reportcase",{name,address,phone,imageurl})
      .then((result) => {
        console.log(result)
        

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
   
    <div >
       <Modal open={props.rmodalOpen} onClose={props.togglerModalOpen} >
      <form
        action="#"
        noValidate
        className="form missing-cases"
      >
        <div className="form__container">
          <h3 className="form__title">Report Person</h3>

          <fieldset className="form__field">
            <div className="form__field_content">
              <label className="form__label">Your Name</label>
              <input
                id="username"
                value={name}
                type="text"
                name="username"
                placeholder="Enter your Name"
                className="form__input form__input_type_username"
                required   onChange={(e) => setName(e.target.value)}
              />
              <span id="username-error" className="form__error form__error_active"></span>
            </div>
           
            <div className="form__field_content">
              <label className="form__label">Your Address</label>
              <input
                id="address"
                type="text"
                name="address"
                placeholder="Your Address"
                value = {address}
                className="form__input form__input_type_age" onChange={(e) => setAddress(e.target.value)}
              />
              <span id="age-error" className="form__error form__error_active"></span>
            </div>
            <div className="form__field_content">
              <label className="form__label">Phone</label>
              <input
                id="phone"
                type="number"
                name="phone"
                value = {phone}
                placeholder="Enter Phone number"
                className="form__input form__input_type_phone" onChange={(e) => setPhone(e.target.value)}
                required
              />
              <span id="phone-error" className="form__error form__error_active"></span>
            </div>
           
          </fieldset>

          <UploadFile imageurl ={imageurl} known={1} user = {props.user} setImageUrl = {setImageUrl}/>
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
     </div>
  );
};

export default ReportCases;
