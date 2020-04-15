import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/AccountBox";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { useHistory, Redirect, Link, NavLink } from "react-router-dom";
import { IconButton, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { flexbox } from "@material-ui/system";
import { authContext } from "../context/auth";
import { Nav, Navbar } from "react-bootstrap";
import userinfo from "../pages/UserInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function NavBarLoggedIn({ history }) {
  const { setAuthData, auth } = useContext(authContext);
  console.log("WHY AREN'T YOU WORKING" + auth.data);
  const onLogOut = () => {
    setAuthData(null);
  };
  const classes = useStyles();
  if (auth.data != null) {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/admin">Rent a Car</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav.Link href="/userinfo">{auth.data.Items[0].username}</Nav.Link>
          <Nav.Link onClick={onLogOut}>Logout</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return <h2>somethings wrong!</h2>;
  }
}

export default NavBarLoggedIn;
