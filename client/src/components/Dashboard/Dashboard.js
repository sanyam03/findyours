import React, { useState ,useContext, useEffect} from "react";
import { useHistory } from "react-router-dom";
import LinkList from "../LinkList";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "103vh",
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
  const [modalOpen, setModalOpen] = useState(false);
  const [rmodalOpen,setrModalOpen] = useState(false);
  const [result,setResult] = useState("");




   //fetching markers
  //only FRIENDS' markers (and own markers)

  //when user clicks on an existing marker
  const [currentMarker, setCurrentMarker] = useState({}) 

  //when user clicks on map to add a new marker
  const [addLat, setAddLat] = useState(null)
  const [addLng, setAddLng] = useState(null)

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
            <ToastContainer  position = "top-center" autoClose = {3000} hideProgressBar newestOnTop={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
    <article className="flex-grow md:flex">
         {/* <Sidebar refreshMarkers = {refreshMarkers} setRefreshMarkers = {setRefreshMarkers}/> */}
    </article>
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
              <Paper >
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
    
      </div>
    </Container>
  );
};

export default Dashboard;
