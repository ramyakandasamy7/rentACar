import React, { Component, Fragment, useState } from "react";
import { Form, Button, Nav } from "react-bootstrap";
import axios from "axios";

export default class SearchByCar extends Component {
  constructor() {
    super();
    this.state = { Cars: [], filtered: [] };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      currentList = this.state.Cars;
      newList = currentList.filter((item) => {
        // change current item to lowercase
        const byMake = item.make.toLowerCase();
        const byType = item.type.toLowerCase();
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return byMake.includes(filter) || byType.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.state.Cars;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList,
    });
  }
  componentDidMount() {
    axios
      .get("http://localhost:9000/")
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data[0]);
          this.setState({
            Cars: result.data,
            filtered: result.data,
          });
          console.log(this.state.Cars[0].model);
        } else {
          console.log("I AM HERE");
        }
      })
      .catch((e) => {
        console.log("error" + e);
      });
  }

  render() {
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
              <th>Make</th>
              <th>Model</th>
              <th>Type</th>
              <th>Condition</th>
              <th>Mileage</th>
              <th>Cost</th>
            </tr>
          </thead>
          {this.state.filtered.map((Car, index) => (
            <tr key={Car.ID}>
              <td>{Car.ID}</td>
              <td>{Car.make} </td>
              <td>{Car.model}</td>
              <td>{Car.type}</td>
              <td>{Car.condition}</td>
              <td>{Car.mileage}</td>
              <td>{Car.cost}</td>
              <td>
                <Button>Select </Button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
