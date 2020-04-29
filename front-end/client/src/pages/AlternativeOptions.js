import React, { Component, useContext } from "react";
import { authContext } from "../context/auth";
import { Container, Col, MDBDataTable } from "mdbreact"
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

export default class AlternativeOptions extends Component {
    static contextType = authContext
    constructor(props) {
        super(props);

        // const { auth } = useContext(authContext);
        this.state = {
            Cars: [], rowCars: [], validCars: [], isLoading: true, car: this.props.location.state.type, enddate: this.props.location.state.enddate, startdate: this.props.location.state.startdate
        };
        console.log("HOWDY HEY " + this.state.car.type);
        console.log("I AM HERE in ALTERNATIVE OPTIONS Constructor");

    }
    componentDidMount() {
        const auth = this.context
        axios.post("http://localhost:9000/getbytype", { type: this.state.car.type }).then((result) => {
            console.log(result.data)
            const Cars = result.data.Items

            Cars.map((car) => {
                console.log("HERE! " + car.make + this.state.startdate + this.state.enddate);
                axios.post("http://localhost:7000/inrange", {
                    startdate: this.state.startdate,
                    enddate: this.state.enddate,
                    carID: car.ID
                }).then((result) => {
                    console.log("RESULT!" + result.data.result);
                    if (result.data.result == false) {
                        console.log("This is valid " + car.make)
                        this.setState({
                            validCars: [
                                ...this.state.validCars,
                                car
                            ]
                        })

                    }
                    let cars = this.state.validCars.map((car) => {
                        console.log("CAR" + car.make);
                        return (
                            {
                                Make: car.make,
                                Model: car.model,
                                Type: car.type,
                                Condition: car.condition,
                                Mileage: car.mileage,
                                position: <Link onClick={this.handleShow} to={{ pathname: "/checkout", state: { car: car, isValid: false } }
                                }> CheckOut </Link >

                            }
                        )
                    })
                    this.setState({ rowCars: cars })
                })
            })

        }).catch((e) => {
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
        if (this.auth.data === null) {
            return (
                <Redirect to={{ pathname: "/" }}
                />
            )
        }
        return (

            <div >
                <p style={{ fontSize: 20, color: "#4a54f1", textAlign: "left", paddingTop: "0px" }}> Search by Car </p>
                <p style={{ fontSize: 20, color: "#4a54f1", textAlign: "left", paddingTop: "0px" }}> Your {this.state.car.model} was not available in this time slot but here are similar types of cars that are available </p>
                <Container>
                    <Col md="10">
                        <MDBDataTable scrollY maxHeight="400px" hover small data={cardata} />

                    </Col>
                </Container>
            </div >
        )
    }
}

