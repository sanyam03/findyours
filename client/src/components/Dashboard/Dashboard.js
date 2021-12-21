import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LinkList from "../LinkList";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { CardActionArea } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import DashImage from "../../images/header-cover.jpg";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    marginTop: "10px",
    backgroundColor: "#ccc",
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
  const [modalOpen, setModalOpen] = useState(false);
  const [rmodalOpen,setrModalOpen] = useState(false);
  const [result,setResult] = useState("");
  if (!user) {
    history.push("/login");
  }
  const toggleModalOpen = () => {
    setModalOpen(!modalOpen);

  };
  const togglerModalOpen = () =>{
    setrModalOpen(!rmodalOpen)
  }

  return (
    <Container maxWidth="xl" className={classes.container}>
      <div>
        <Grid container spacing={3} className={classes.grid}>
          <Hidden mdDown>
            <Grid item md={3}>
              <Paper className={classes.paper}>
                <LinkList user={user} result = {result} setResult = {setResult} toggleModalOpen= {toggleModalOpen} togglerModalOpen = {togglerModalOpen} rmodalOpen={rmodalOpen} setrModalOpen = {setrModalOpen} modalOpen = {modalOpen} setModalOpen = {setModalOpen} />
              </Paper>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              {/* <NewPostForm user={user} handlePostSubmit={handlePostSubmit} /> */}
            </Paper>
            {/* <PostContainer
              user={user}
              posts={posts}
              handleCommentSubmit={handleCommentSubmit}
              handleLikePost={handleLikePost}
              handleLikeComment={handleLikeComment}
              handleScroll={handleScroll}
              loadingPosts={loadingPosts}
            /> */}
          </Grid>
          <Hidden mdDown>
            <Grid item md={3}>
              <Paper className={classes.paper}>
                {result}
                {/* <FriendsList
                  friends={userFriends}
                  friendRequests={friendRequests}
                  handleAcceptRequest={handleAcceptRequest}
                  handleDeclineRequest={handleDeclineRequest}
                /> */}
              </Paper>
            </Grid>
          </Hidden>
        </Grid>

        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              image={DashImage}
              alt="page-image"
              // style={{ opacity: .6 }}
            />
          </CardActionArea>
        </Card>
      </div>
    </Container>
  );
};

export default Dashboard;
