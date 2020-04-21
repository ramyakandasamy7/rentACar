import React, { Component, Fragment, useState } from "react";
import { MDBDataTable, Row, Col, Card, CardBody, Button, Container } from 'mdbreact';
import axios from "axios";
import { Collapse } from "@material-ui/core";
import { Link } from "react-router-dom"

export default class SearchByCity extends Component {
  constructor() {
    super();
    this.state = {
      Locations: [],
      rowLocations: [],
      rowCars: [],
      Filtered: [],
      Cars: [],
      carView: false,
      isLoading: true
    };
    this.showCars = this.showCars.bind(this);
  }
  showCars = (e) => {
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
      }).then(async () => this.setState({ rowCars: this.assembleCars(), isLoading: false }))
      .catch((e) => {
        console.log("error" + e);
      });
  };
  assemblePosts(e) {
    let posts = this.state.Locations.map((Location, index) => {
      return (
        {
          Name: <Button class="text-info" id={index} onClick={(e) => this.showCars(e.target.id)} > {Location.name} </Button>,
          Address: Location.address,
          City: Location.city,
          State: Location.state
        }
      )
    });
    console.log("POSTS" + posts[0].Name)
    return posts;
  }
  assembleCars(e) {
    let cars = this.state.Cars.map((car) => {
      var price;
      if (car.type == "Sedan") {
        price = this.state.Locations[this.state.selectedLocation].sedanPPH;
      }
      else if (car.type == "Luxury") {
        price = this.state.Locations[this.state.selectedLocation].luxuryPPH;
      }
      else if (car.type == "Suv") {
        price = this.state.Locations[this.state.selectedLocation].suvPPH;
      }
      else if (car.type == "Compact") {
        price = this.state.Locations[this.state.selectedLocation].compactPPH;
      }
      else if (car.type == "Truck") {
        price = this.state.Locations[this.state.selectedLocation].truckPPH;
      }
      return (
        {
          Make: car.make,
          Model: car.model,
          Type: car.type,
          Condition: car.condition,
          price: price,
          position: <Link to={{ pathname: "/checkout", state: { car: car } }}> CheckOut </Link>
        }
      )
    })
    return cars
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/locations")
      .then((result) => {
        if (result.status === 200) {
          console.log("LALALALALA" + result.data);
          this.setState({
            Locations: result.data,
            carView: false
          });
        } else {
          console.log("I AM HERE");
        }
      }).then(async () => this.setState({ rowLocations: this.assemblePosts(), isLoading: false }))
      .catch((e) => {
        console.log("error" + e);
      });
  }
  render() {
    const cardata = {
      columns: [
        {
          label: "Make",
          field: 'Make',
          width: 250
        },
        {
          label: "Model",
          field: "Model",
          width: 250
        },
        {
          label: "Type",
          field: "Type",
          width: 250
        },
        {
          label: "Condition",
          field: "Condition",
          width: 250
        },
        {
          label: "Price", field: "price",
          width: 250
        },
        {
          label: "Checkout",
          field: "position",
          width: 250
        }
      ],
      rows: this.state.rowCars,
    }
    const data = {
      columns: [
        {
          label: "Name",
          field: 'Name',
          width: 150
        },
        {
          label: "Address",
          field: "Address",
          width: 150
        },
        {
          label: "City",
          field: "City",
          width: 150
        },
        {
          label: "State",
          field: "State",
          width: 150
        },
      ],
      rows: this.state.rowLocations,

    }
    if (this.state.carView == true) {
      return (

        <div >
          <Container>
            <Col md="10">
              <MDBDataTable scrollY maxHeight="200px" hover small data={cardata} />

            </Col>
          </Container>
        </div>
      )
    }
    else {
      return (
        <Container class="d-flex justify-content-center align-items-center">

          <p style={{ fontSize: 20, color: "#4a54f1", textAlign: "left", paddingTop: "0px" }}> Search by Location </p>


          <MDBDataTable scrollY hover small data={data} />

        </Container>)
    }
  }

}
