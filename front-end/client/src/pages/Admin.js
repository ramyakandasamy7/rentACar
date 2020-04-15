import React, { useContext, useState } from "react";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import SearchByCity from "../components/SearchByCity";
import SearchbyCar from "../components/SearchByCar";
import { Button } from "react-bootstrap";
import { auth } from "../context/auth.js";
import { authContext } from "../context/auth";

function Admin({ history }) {
  const [searchCar, setSearchbyCar] = useState(false);
  const { auth } = useContext(authContext);
  const searchbyCar = () => {
    setSearchbyCar(true);
  };

  const searchCity = () => {
    setSearchbyCar(false);
  };

  if (searchCar == false && auth.data != null) {
    return (
      <div>
        <NavBarLoggedIn></NavBarLoggedIn>
        <a onClick={searchbyCar}> Prefer to Search by Car Type? Click Here</a>
        <SearchByCity></SearchByCity>
      </div>
    );
  } else if (searchCar == true && auth.data != null) {
    return (
      <div>
        <NavBarLoggedIn></NavBarLoggedIn>
        <h3></h3>
        <a onClick={searchCity}> Prefer to Search by Location? Click Here</a>
        <SearchbyCar></SearchbyCar>
      </div>
    );
  } else {
    return (
      <div>
        <h1> You must log in first</h1>
        <a href="/"> Login Page </a>
      </div>
    );
  }
}

export default Admin;
