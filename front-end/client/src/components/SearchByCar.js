import React, { Component } from "react";
import { Container, Col, MDBDataTable } from "mdbreact"
import axios from "axios";
import { Link } from "react-router-dom";

export default class SearchByCar extends Component {
  constructor() {
    super();
    this.state = { Cars: [], filtered: [], rowCars: [], isLoading: true };
  }
  componentDidMount() {
    axios
      .get("http://34.239.128.242:9000/")
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
      }).then(async () => this.setState({ rowCars: this.assembleCars(), isLoading: false }))
      .catch((e) => {
        console.log("error" + e);
      });
  }

  assembleCars(e) {
    let cars = this.state.Cars.map((car) => {
      return (
        {
          Make: car.make,
          Model: car.model,
          Type: car.type,
          Condition: car.condition,
          Mileage: car.mileage,
          position: <Link to={{ pathname: "/checkout", state: { car: car, isValid: false } }}> CheckOut </Link>
        }
      )
    })
    return cars
  }

  render() {
    const cardata = {
      columns: [
        {
          label: "Make",
          field: 'Make', width: 150
        },
        {
          label: "Model",
          field: "Model",
          width: 150
        },
        {
          label: "Type",
          field: "Type",
          width: 150
        },
        {
          label: "Condition",
          field: "Condition",
          width: 150
        },
        {
          label: "Mileage",
          field: "Mileage",
          width: 150
        },
        {
          field: "position",
          width: 150
        }
      ],
      rows: this.state.rowCars,
    }
    return (

      <div >
        <p style={{ fontSize: 20, color: "#4a54f1", textAlign: "left", paddingTop: "0px" }}> Search by Car </p>
        <Container>
          <Col md="10">
            <MDBDataTable scrollY maxHeight="400px" hover small data={cardata} />

          </Col>
        </Container>
      </div >
    )
  }
}

