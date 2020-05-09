import React, { useContext } from "react";
import { authContext } from "../context/auth";
import { Nav, Navbar } from "react-bootstrap";

function NavBarLoggedIn({ history }) {
  const { setAuthData, auth } = useContext(authContext);
  const onLogOut = () => {
    setAuthData(null);
  };
  var myLink = "http://34:7000/history/" + auth.data.Items[0].ID
  if (auth.data != null) {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/admin">Rent a Car</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav.Link href="/userinfo">{auth.data.Items[0].username}</Nav.Link>
          <Nav.Link onClick={onLogOut}>Logout</Nav.Link>
          <Nav.Link href={myLink}>View My Transactions</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return <h2>somethings wrong!</h2>;
  }
}

export default NavBarLoggedIn;
