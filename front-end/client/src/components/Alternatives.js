import React, { useContext, useState, useEffect, Component } from 'react';
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap"
import axios from "axios"
//import authContext from "../context/auth";
import "react-datepicker/dist/react-datepicker.css";
import { authContext } from "../context/auth";
import NavBarLoggedIn from "../components/NavBarLoggedIn"
import { MDBTable, MDBTableBody, MDBTableHead, Container, MDBDataTable, Col } from 'mdbreact';
import { Modal } from "react-bootstrap"
import { Link } from "react-router-dom";
class Alternatives extends Component {
    constructor(props) {
        super(props);
        this.state = { show: true, Cars: [], validCars: [], filtered: [], rowCars: [], isLoading: true };
        this.handleShow = this.handleShow.bind(this)
    }
    handleShow() {
        this.setState({ show: false });
        this.props.callbackFromParent(false);
    }

    componentDidMount() {
        axios.post("http://localhost:9000/getbytype", { type: this.props.hello }).then((result) => {
            console.log(result.data)
            const Cars = result.data.Items

            Cars.map((car) => {
                console.log("HERE! " + car.make);
                axios.post("http://localhost:7000/inrange", {
                    startdate: this.props.startdate,
                    enddate: this.props.enddate,
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
                                position: <Link onClick={() => this.props.callbackFromParent(false)} to={{ pathname: "/checkout", state: { car: car, isValid: false } }
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
                <Modal show={this.state.show}>
                    <Modal.Header>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{ fontSize: 20, color: "#4a54f1", textAlign: "left", paddingTop: "0px" }}> Search by Car </p>
                        <Container>
                            <Col md="10">
                                <MDBDataTable scrollY maxHeight="400px" hover small data={cardata} />

                            </Col>
                        </Container>
                    </Modal.Body>
                    <button onClick={this.handleShow}>Cancel</button>
                </Modal>
            </div >
        )
    }


}
export default Alternatives;