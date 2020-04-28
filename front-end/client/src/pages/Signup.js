import React, { useState } from "react";
//import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function Signup({ history }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [driverslicense, setLicense] = useState();
  const [address, setAddress] = useState();
  const [paymentinformation, setCard] = useState();
  const onFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://34.239.128.242:4000/signup", {
        email,
        password,
        driverslicense,
        address,
        paymentinformation,
      })
      .then((result) => {
        if (result.status === 200) {
          console.log(result);
          alert("User has been signed up!");
          history.replace("/");
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
        style={{ height: "75vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div style={{ width: 300 }}>
          <h1 className="text-center">Sign Up</h1>
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
                type="text"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Drivers License</Form.Label>
              <Form.Control
                type="text"
                placeholder="Drivers License"
                onChange={(e) => {
                  setLicense(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Credit Card Information</Form.Label>
              <Form.Control
                type="text"
                placeholder="CreditCard"
                onChange={(e) => {
                  setCard(e.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
