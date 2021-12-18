import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import UploadFiles from "./UploadFiles"

const useStyles = makeStyles((theme) => ({
  container: {
    
    minHeight: "100vh",
    marginTop: "10px",
  },
  grid: {
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "rgb(32,33,34)",
    color: "white",
    marginBottom: 20,
  },
}));

const Dashboard = ({ user, setUser }) => {

  const classes = useStyles();
  const history = useHistory();
  
  if (!user) {
    history.push("/login");
  }

  return (
    <Container maxWidth="xl" className={classes.container}>
      <div>
      <UploadFiles/>

      
      </div>
    </Container>
  );
};

export default Dashboard;
