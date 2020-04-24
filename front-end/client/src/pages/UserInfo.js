import React, { useContext, useState } from "react";
import { authContext } from "../context/auth";
import { Form, Button } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import Popup from "reactjs-popup"
import axios from "axios"
import { Modal } from "react-bootstrap"

function UserInfo({ history }) {

  const { auth, setAuthData } = useContext(authContext);
  console.log(auth.data);
  // const [email, setEmail] = useState(auth.data)

  function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const { auth, setAuthData } = useContext(authContext);
    const handleShow = () => setShow(true);
    const [username, setEmail] = useState(auth.data.Items[0].username);
    const [password, setPassword] = useState(auth.data.Items[0].password);
    const [membership, setMembership] = useState(auth.data.Items[0].membershipstatus)
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
        .post("http://localhost:4000/modifyuser", {
          ID,
          username,
          password,
          driverslicense,
          address,
          paymentinformation,
          membership
        })
        .then((result) => {
          if (result.status === 200) {
            console.log(result);
            console.log(ID);
            alert("User has updated!");
            axios
              .post("http://localhost:4000/user", {
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

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Change Your Data
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                      setEmail(e.target.value)
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
              <label>
                Change your Membership Status
          <select value={membership} onChange={(event) => setMembership(event.target.value)} >
                  <option value="cancelled">Cancelled</option>
                  <option value="valid">Valid</option>
                </select>
              </label>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                Change Your Data
                </Button>

            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  if (auth.data == null) {
    return (
      <div>You aren't logged in. Please log in before accessing user info</div>
    );
  }
  else {
    return (
      <div>
        <NavBarLoggedIn></NavBarLoggedIn>
        <MDBTable>
          <MDBTableHead>
            <th>Attribute</th>
            <th>Value</th>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              <td>
                Name
              </td>
              <td>
                {auth.data.Items[0].username}
              </td>
            </tr>
            <tr>
              <td>
                Password
              </td>
              <td>
                {auth.data.Items[0].password}
              </td>
            </tr>
            <tr>
              <td>
                Drivers License
              </td>
              <td>
                {auth.data.Items[0].driverslicense}
              </td>
            </tr>
            <tr>
              <td>
                Address
              </td>
              <td>
                {auth.data.Items[0].address}
              </td>
            </tr>
            <tr>
              <td>
                Payment Information
              </td>
              <td>
                {auth.data.Items[0].paymentinformation}
              </td>
            </tr>
            <tr>
              <td>
                Membership Status
              </td>
              <td>
                {auth.data.Items[0].membershipstatus}
              </td>
            </tr>
          </MDBTableBody>
          <Example></Example>
        </MDBTable>

      </div>
    );
  }
}

export default UserInfo;
