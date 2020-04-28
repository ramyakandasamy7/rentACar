import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { authContext } from "../context/auth";
import axios from "axios";
import useErrorBoundary from "use-error-boundary"

function ChangeUserData({ history }) {
  const { auth, setAuthData } = useContext(authContext);
  const {
    ErrorBoundary, // class - The react component to wrap your children in. This WILL NOT CHANGE 
    didCatch, // boolean - Whether the ErrorBoundary catched something
    error, // null or the error
    errorInfo // null or the error info as described in the react docs
  } = useErrorBoundary()
  if (auth.data == null) {
    throw error;
  }
  const [username, setEmail] = useState(auth.data.Items[0].username);
  const [password, setPassword] = useState(auth.data.Items[0].password);
  const [driverslicense, setLicense] = useState(
    auth.data.Items[0].driverslicense
  );
  const [address, setAddress] = useState(auth.data.Items[0].address);
  const [paymentinformation, setCard] = useState(
    auth.data.Items[0].paymentinformation
  );
  const ID = auth.data.Items[0].ID;

  const onFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://34.239.128.242:4000/modifyuser", {
        ID,
        username,
        password,
        driverslicense,
        address,
        paymentinformation,
      })
      .then((result) => {
        if (result.status === 200) {
          console.log(result);
          console.log(ID);
          alert("User has updated!");
          axios
            .post("http://34.239.128.242:4000/user", {
              ID,
            })
            .then((result) => {
              console.log("mama mia" + JSON.stringify(result));
              setAuthData(result.data);
              console.log("HOWDY HEY " + auth.data.Items[0]);
              history.replace("/userinfo");
            });
        } else {
          console.log("not successful");
          console.log(result.data.Items.length);
        }
      })
      .catch((e) => {
        console.log("error" + e);
      });
  };
  const Error = () => {
    return (<h2> Please select car first</h2>)
  }
  const Valid = () => {
    return (
      <div>
        <div className="bg">
          <div
            style={{ height: "75vh" }}
            className="d-flex justify-content-center align-items-center"
          >
            <div style={{ width: 300 }}>
              <h1 className="text-center">Change Your Data</h1>
              <Form onSubmit={onFormSubmit}>
                <Form.Group>
                  <Form.Label value={auth.data.Items[0].username}>
                    Email address
                </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={auth.data.Items[0].username}
                    onChange={(e) => {
                      if (e.target.value != undefined) {
                        setEmail(e.target.value);
                      }
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={auth.data.Items[0].password}
                    onChange={(e) => {
                      if (e.target.value != undefined) {
                        setPassword(e.target.value);
                      }
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Drivers License</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={auth.data.Items[0].driverslicense}
                    onChange={(e) => {
                      if (e.target.value != undefined) {
                        setLicense(e.target.value);
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={auth.data.Items[0].address}
                    onChange={(e) => {
                      if (e.target.value != null) {
                        setAddress(e.target.value);
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Credit Card Information</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={auth.data.Items[0].paymentinformation}
                    onChange={(e) => {
                      if (e.target.value != null) {
                        setCard(e.target.value);
                      }
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Change Your Data
              </Button>

              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <ErrorBoundary
      renderError={({ error }) => <Error></Error>}
      render={() => <Valid></Valid>}
    />
  );

}

export default ChangeUserData;
