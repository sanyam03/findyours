
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Hidden from "@material-ui/core/Hidden";

import NavDrawer from "./NavDrawer";
import UploadFiles from "../Dashboard/UploadFiles";
// import UserSearch from "../UserSearch/UserSearch";

import Logo from "../../images/header.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    cursor: "pointer",
  },
}));

const NavBar = ({ user, setUser }) => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // this is not working because UserAvatar needs refactoring
  // I left comments there, please refer to that
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogOut = () => {
    setUser("");
    handleClose();
    setDrawerOpen(false);
    history.push("/login");
  };

  const handleLogoClick = () => {
    if (user) {
      setOpen(true);
      // history.push("/");
    } else {
      history.push("/login");
    }
  };

  const handleProfileClick = () => {
    history.push(`/users/${user.id}`);
    handleClose();
  };

  const handleAccountClick = () => {
    history.push("/account");
    handleClose();
  };

  // Popups
  React.useEffect(() => { // closes modal with ESC key
    document.addEventListener('keydown', handleEscKey);

    return () => document.removeEventListener('keydown', handleEscKey);
  });
  function handleEscKey(evt) {
    console.log("closing modal with ESc key, getting event: ", evt.which)
    if(evt.which === 27) setOpen(false);
  }
  function handlePopupClose(evt) { // closes popup
    console.log("click to close modal, getting event: ", evt.target)
    if(evt.target !== evt.currentTarget) return;

    setOpen(false);
  }


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          {user ? (
            <Hidden lgUp>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          ) : null}
          <NavDrawer
            user={user}
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
            handleLogOut={handleLogOut}
          />
          <div className={classes.title}>
            <img
              src={Logo} alt="header-logo"
              width="160px"
              height="50px"
              onClick={handleLogoClick}
            />
          </div>

          {user && (
            <div>
              {/* <UserSearch /> */}
              <Hidden mdDown>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                  <MenuItem onClick={handleAccountClick}>Account</MenuItem>
                  <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                </Menu>
              </Hidden>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <UploadFiles isOpen={isOpen} onClose={handlePopupClose}/>
    </div>
  );
};

export default NavBar;
