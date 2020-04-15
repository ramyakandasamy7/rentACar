import React, { Component, Fragment, useState } from "react";
import { Form, Button, Nav } from "react-bootstrap";
import axios from "axios";

export default class SearchByCity extends Component {
  constructor() {
    super();
    this.state = {
      Locations: [],
      Filtered: [],
      Cars: [],
      carView: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.showCity = this.showCity.bind(this);
  }
  showCity = (e) => {
    alert(`button index selected is ${this.state.Locations[e].ID}`);
    axios
      .post("http://localhost:9000/getlocationID", {
        ID: this.state.Locations[e].ID,
      })
      .then((result) => {
        if (result.status === 200 && result.data.Items.length > 0) {
          console.log(result);
          this.setState({
            Cars: result.data.Items,
            carView: true,
            selectedLocation: e,
          });
          console.log("Car is" + this.state.Cars[0].model);
        }
      })
      .catch((e) => {
        console.log("error" + e);
      });
  };
  handleChange(e) {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      currentList = this.state.Locations;
      newList = currentList.filter((item) => {
        // change current item to lowercase
        const byName = item.name.toLowerCase();
        const byCity = item.city.toLowerCase();
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return byName.includes(filter) || byCity.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.state.Locations;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      Filtered: newList,
    });
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/locations")
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data[0]);
          this.setState({
            Locations: result.data,
            Filtered: result.data,
          });
        } else {
          console.log("I AM HERE");
        }
      })
      .catch((e) => {
        console.log("error" + e);
      });
  }
  render() {
    if (!this.state.carView) {
      return (
        <div>
          <input
            type="text"
            className="input"
            onChange={this.handleChange}
            placeholder="Search..."
          />
          <table className="table">
            {" "}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
              </tr>
            </thead>
            {this.state.Filtered.map((Location, index) => (
              <tr key={Location.ID}>
                <td>{Location.ID}</td>
                <td>{Location.name} </td>
                <td>{Location.address}</td>
                <td>{Location.city}</td>
                <td>{Location.state}</td>
                <td>
                  <Button
                    id={index}
                    onClick={(e) => this.showCity(e.target.id)}
                  >
                    Select{" "}
                  </Button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <Button onClick={() => this.setState({ carView: false })}>
            Back
          </Button>
          <h3> {this.state.Locations[this.state.selectedLocation].name} </h3>
          <h3>
            {this.state.Locations[this.state.selectedLocation].street}{" "}
            {this.state.Locations[this.state.selectedLocation].city}{" "}
            {this.state.Locations[this.state.selectedLocation].state}
          </h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Make</th>
                <th>Model</th>
                <th>Type</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody className="table">
              {this.state.Cars.map((Car, index) => (
                <tr key={Car.ID}>
                  <td>{Car.make} </td>
                  <td>{Car.model}</td>
                  <td>{Car.type}</td>
                  <td>{Car.condition}</td>
                  <td>{Car.mileage}</td>
                  <td>{Car.cost}</td>
                  <td>
                    <Button id={index} onClick={(e) => this.checkout()}>
                      Select Here
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
