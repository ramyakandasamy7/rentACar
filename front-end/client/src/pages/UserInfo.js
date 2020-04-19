import React, { useContext } from "react";
import { authContext } from "../context/auth";
import { Button } from "react-bootstrap";
import NavBarLoggedIn from "../components/NavBarLoggedIn";

function UserInfo({ history }) {
  const { setAuthData, auth } = useContext(authContext);
  console.log(auth.data);
  if (auth.data == null) {
    return (
      <div>You aren't logged in. Please log in before accessing user info</div>
    );
  } else {
    return (
      <div>
        {" "}
        <NavBarLoggedIn></NavBarLoggedIn>
        <table className="table">
          <thead>
            <th>Account Number</th>
            <th> Name </th>
            <th> Password </th>
            <th>Drivers License</th>
            <th>Location</th>
            <th>paymentInformation</th>
          </thead>
          <tbody>
            <td> {auth.data.Items[0].ID}</td>
            <td>
              <a href>{auth.data.Items[0].username}</a>
            </td>
            <td>{auth.data.Items[0].password}</td>
            <td>{auth.data.Items[0].driverslicense}</td>
            <td>{auth.data.Items[0].address}</td>
            <td>{auth.data.Items[0].paymentinformation}</td>
            <td>
              <Button onClick={() => history.replace("/changeuser")}>
                Change Data
              </Button>
            </td>
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserInfo;
