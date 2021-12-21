import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";

import LoginPageImg from "../../images/you-matter.png";
import axios from "../../utils/axios";

import LogInForm from "./LogInForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "10% 10%",
    height: "100%",
  },
  logInContainer: {
    height: "100vh",
    backgroundColor: "rgb(240,242,245)",
    paddingTop: "8%",
  },
}));

const Login = ({ user, setUser }) => {
  const history = useHistory();
  const classes = useStyles();

  const [errors, setErrors] = useState([]);
  const [signupErrors, setSignupErrors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogIn = (email, password) => {
    axios
      .post("/api/user/login", { email, password })
      .then((result) => {
        console.log(result)
        const user = {
          email: result.data.data.email,
          name: result.data.data.name,
          token: result.data.data.token,

        };

        axios.defaults.headers.common["Authorization"] =
          result.data.data.token;
        setUser(user);
        history.push("/");
      })
      .catch((err) => {
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

  const handleSignUp = (name, email, password,city) => {
    axios
      .post("/api/user/signup", { name, email, password,city })
      .then((result) => {
        const user = {
          email: result.data.data.email,
          name:result.data.data.name,
          token: result.data.data.token,

        };
        axios.defaults.headers.common["Authorization"] =
          result.data.data.token;
        setUser(user);
        setModalOpen(false);
        history.push("/");
      })
      .catch((err) => {
        if (err.response.data.errors) {
          setSignupErrors(err.response.data.errors);
          setTimeout(() => {
            setSignupErrors([]);
          }, 3000);
        } else if (err.response.data.message) {
          setSignupErrors([
            ...signupErrors,
            { msg: err.response.data.message },
          ]);
          setTimeout(() => {
            setSignupErrors([]);
          }, 3000);
        }
      });
  };

  const handleFBLogin = (accessToken) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    axios.post("/auth/facebook/token").then((result) => {
      const user = {
        email: result.data.user.email,
        first_name: result.data.user.first_name,
        last_name: result.data.user.last_name,
        token: `Bearer ${accessToken}`,
        id: result.data.user.id,
        profilePicUrl: result.data.user.profilePicUrl,
        facebookId: result.data.user.facebookId,
      };
      setUser(user);
      history.push("/");
    });
  };

  const handleTestDriveLogin = () => {
    axios.post("/auth/testdrive").then((result) => {
      const user = {
        email: result.data.user.email,
        first_name: result.data.user.first_name,
        last_name: result.data.user.last_name,
        token: result.data.token.token,
        id: result.data.user.id,
        profilePicUrl: result.data.user.profilePicUrl,
        facebookId: result.data.user.facebookId,
      };
      axios.defaults.headers.common["Authorization"] = result.data.token.token;
      setUser(user);
      history.push("/");
    });
  };

  if (user) {
    history.push("/");
  }

  return (
    <Container maxWidth="xl" className={classes.logInContainer}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              style={{ textAlign: "left", fontWeight: "bold" }}
            >
              Hi, Welcome back!
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start"
                // marginTop: "10%",
              }}
            >
              <img alt="" src={process.env.PUBLIC_URL + LoginPageImg}
                min-height="50px"
                width="90%"
              />
            </div>
            <Typography
              variant="h6"
              style={{ textAlign: "left", margin: "0 30px 0 15px" }}
            >
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <LogInForm
              handleLogIn={handleLogIn}
              handleSignUp={handleSignUp}
              handleFBLogin={handleFBLogin}
              handleTestDriveLogin={handleTestDriveLogin}
              errors={errors}
              signupErrors={signupErrors}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
