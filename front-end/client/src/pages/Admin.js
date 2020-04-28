import React, { useContext, useState } from "react";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import SearchByCity from "../components/SearchByCity";
import SearchbyCar from "../components/SearchByCar";
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
        <a onClick={searchbyCar} style={{ fontSize: 13, color: "#4a54f1", textAlign: "left", paddingTop: "100px" }}> Prefer to Search by Car Type? </a>
        <SearchByCity></SearchByCity>
      </div>
    );
  } else if (searchCar == true && auth.data != null) {
    return (
      <div>
        <NavBarLoggedIn></NavBarLoggedIn>
        <h3></h3>
        <a onClick={searchCity} style={{ fontSize: 13, color: "#4a54f1", textAlign: "left", paddingTop: "100px" }}> Prefer to Search by Location? </a>
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
