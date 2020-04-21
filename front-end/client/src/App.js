import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { AuthContext } from "./context/auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserInfo from "./pages/UserInfo";
import ChangeUserData from "./pages/ChangeUserData";
import CheckOutPage from "./pages/CheckOutPage"
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  return (
    <Router>
      <div>
        <PrivateRoute path="/admin" component={Admin} />
        <Route exact path="/checkout" component={CheckOutPage} />
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/userinfo" component={UserInfo} />
        <Route exact path="/changeuser" component={ChangeUserData} />
      </div>
    </Router>
  );
}

export default App;
