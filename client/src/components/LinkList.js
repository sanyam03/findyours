import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import GroupIcon from "@material-ui/icons/Group";
import SettingsIcon from "@material-ui/icons/Settings";
import MissingCases from "./Dashboard/MissingCases";
import ReportCases  from "./Dashboard/ReportCases";
import UserAvatar from "./UserAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "rgb(32,33,34)",
  },
}));

const LinkList = (props) => {
  const history = useHistory();
  const classes = useStyles();
  
  const handleClick = (address) => {
    history.push(address);
  };
  console.log(props)
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main nav list">
        <ListItem button onClick={() => handleClick(`/users/${props.user.id}`)}>
          <ListItemIcon>
            <UserAvatar user={props.user} />
          </ListItemIcon>
          <ListItemText primary={`${props.user.name}`} />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText
            primary="Find Someone"
             onClick={()=>props.setModalOpen(!props.modalOpen)}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText
            primary="Report Someone"
             onClick={()=>props.setrModalOpen(!props.rmodalOpen)}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText
            primary="Friends"
            onClick={() => handleClick(`/matched`)}
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Account"
            onClick={() => handleClick(`/account`)}
          />
        </ListItem>
      </List>
      <MissingCases result = {props.result} setResult = {props.setResult} modalOpen={props.modalOpen} setModalOpen={props.setModalOpen} toggleModalOpen = {props.toggleModalOpen}/>
      <ReportCases rmodalOpen={props.rmodalOpen} setrModalOpen={props.setrModalOpen} togglerModalOpen = {props.togglerModalOpen}/>

    </div>
  );
};

export default LinkList;
