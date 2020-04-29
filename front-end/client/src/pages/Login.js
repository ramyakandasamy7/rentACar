import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { authContext } from "../context/auth";
import { Link } from "react-router-dom";
import axios from "axios";

const SignIn = ({ history }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setAuthData } = useContext(authContext);
  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    axios
      .post("http://34.239.128.242:4000/login", {
        email,
        password,
      })
      .then((result) => {
        if (result.status === 200 && result.data.Items.length > 0) {
          setAuthData(result.data);
          history.replace("/admin");
        } else {
          console.log("not successful");
          console.log(result.data.Items.length);
        }
      })
      .catch((e) => {
        console.log("error" + e);
      });
  };
  return (
    <div className="bg">
      <div
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >


        <div style={{ width: 500 }}>
          <h1 className="text-center"> Customer Sign In</h1>
          <Form onSubmit={onFormSubmit}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <div style={{ textAlign: "center" }}>
              <Button variant="primary" type="submit" style={{ width: 250, height: 40 }}>
                Sign In
            </Button>
              <Link to="/signup" class="btn btn-success" style={{ width: 250, height: 40 }} >Don't have an account?</Link>
            </div>
            <a href="https://rentacar.ramyasmsseproject.com/login/" className="text-center" style={{ fontSize: 20, color: "white" }}  > Click for Management Login</a>

          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
