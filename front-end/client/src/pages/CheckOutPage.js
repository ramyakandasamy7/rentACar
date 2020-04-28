import React, { useContext, useState, useEffect, Component } from 'react';
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap"
import axios from "axios"
import "react-datepicker/dist/react-datepicker.css";
import { authContext } from "../context/auth";
import NavBarLoggedIn from "../components/NavBarLoggedIn"
import { MDBTable, MDBTableBody, MDBTableHead, Container } from 'mdbreact';
import Alternatives from "../components/Alternatives"
import useErrorBoundary from "use-error-boundary"
import Admin from "../pages/Admin"


const CheckOutPage = (props) => {
    const {
        ErrorBoundary, // class - The react component to wrap your children in. This WILL NOT CHANGE 
        didCatch,
        Error, // boolean - Whether the ErrorBoundary catched something
        error, // null or the error
        errorInfo // null or the error info as described in the react docs
    } = useErrorBoundary()
    if (props.location.state == undefined) {
        props.location.state = 0;
        throw error
    }
    const { setAuthData, auth } = useContext(authContext);
    const [startdate, setStartDate] = useState(new Date());
    const [enddate, setEndDate] = useState(new Date());
    const [selectedHours, setselectedHours] = useState(0);
    const [price, setPrice] = useState();
    const [ppH, setppH] = useState(null);
    const [valid, setValid] = useState(false);
    const [alternateView, setalternateView] = useState(false);
    const { car } = props.location.state

    const myCallback = (dataFromChild) => {
        setalternateView(dataFromChild);
        setValid(true);
        reserveCar();
    }



    const Valid = () => {
        useEffect(() => {
            if (props.location.state === 0) {
                console.log("uhoh!");
            }
            else {
                setalternateView(false);
                axios.post("http://34.239.128.242:5000/postlocationID", {
                    ID: car.locationID
                }).then((result) => {
                    console.log(result.data);
                    if (car.type === "Truck" && result.data.Item !== undefined) {
                        console.log("I AM HERE!!!" + result.data.Item.truckPPH);
                        setppH(result.data.Item.truckPPH)
                    }
                    if (car.type === "Sedan" && result.data.Item !== undefined) {
                        setppH(result.data.Item.sedanPPH)
                    }
                    if (car.type === "Compact" && result.data.Item !== undefined) {
                        setppH(result.data.Item.compactPPH)
                    }
                    if (car.type === "Luxury" && result.data.Item !== undefined) {
                        setppH(result.data.Item.luxuryPPH)
                    }
                    if (car.type === "Suv" && result.data.Item !== undefined) {
                        setppH(result.data.Item.suvPPH)
                    }
                    else if (result.data.Item === undefined) {
                        setppH("N/A");
                        alert("This car has not been assigned a location")
                    }
                })
            }
        }, []);
        if (auth.data === null) {
            return (
                <h2> Please log in first </h2>
            )
        }
        if (auth.data != null && alternateView == false) {
            return (
                <div>
                    <NavBarLoggedIn></NavBarLoggedIn>
                    <style>
                        {`.react-datepicker {
 display: flex  !important;
 }`}
                    </style>
                    <DatePicker
                        selected={startdate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        timeIntervals={60}
                        minDate={new Date()}

                    />
                    <DatePicker
                        selected={enddate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        timeIntervals={60}
                        minDate={new Date()}
                    />


                    <Button onClick={(e) => reserveCar(e)}> Search For Availability </Button>
                    <Container class="d-flex justify-content-center align-items-center">
                        <MDBTable>
                            <MDBTableHead>
                                <tr>

                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Type</th>
                                    <th>State</th>
                                    <th>Mileage</th>
                                    <th>Hours Selected</th>
                                    <th>Price </th>
                                    <th>Price per Hour</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody >
                                <td>{car.make} </td>
                                <td>{car.model}</td>
                                <td>{car.type}</td>
                                <td>{car.condition}</td>
                                <td>{car.mileage}</td>
                                <td>{selectedHours}</td>
                                <td>{price}</td>
                                <td>{ppH}</td>
                                <th> </th>

                            </MDBTableBody>
                        </MDBTable>
                    </Container>
                    <Button disabled={!valid} onClick={(e) => sendTransaction(e)}>
                        Create Transaction </Button>
                </div>
            );

        }
        else {
            const carID = car.ID
            const hello = car.type
            return (
                <div>
                    <Alternatives callbackFromParent={myCallback} hello={hello} carID={carID} startdate={startdate} enddate={enddate} />
                    <NavBarLoggedIn></NavBarLoggedIn>
                    <style>
                        {`.react-datepicker {
 display: flex  !important;
 }`}
                    </style>
                    <DatePicker
                        selected={startdate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        timeIntervals={60}
                        minDate={new Date()}

                    />
                    <DatePicker
                        selected={enddate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        timeIntervals={60}
                        minDate={new Date()}
                    />


                    <Button onClick={(e) => reserveCar(e)}> Search For Availability </Button>
                    <Container class="d-flex justify-content-center align-items-center">
                        <MDBTable>
                            <MDBTableHead>
                                <tr>

                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Type</th>
                                    <th>State</th>
                                    <th>Mileage</th>
                                    <th>Hours Selected</th>
                                    <th>Price </th>
                                    <th>Price per Hour</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody >
                                <td>{car.make} </td>
                                <td>{car.model}</td>
                                <td>{car.type}</td>
                                <td>{car.condition}</td>
                                <td>{car.mileage}</td>
                                <td>{selectedHours}</td>
                                <td>{price}</td>
                                <td>{ppH}</td>
                                <th> </th>

                            </MDBTableBody>
                        </MDBTable>
                    </Container>
                    <Button disabled={!valid} onClick={(e) => sendTransaction(e)}>
                        Create Transaction </Button>
                </div>
            );
        }
    }
    const reserveCar = e => {
        console.log("car is" + car.ID);
        const milliseconds = enddate - startdate;
        const hours = parseInt(milliseconds / 36e5);
        if (hours < 1 || hours > 72) {
            alert(`You must select between 0 and 72 hours. You have selected ${hours} hours`);
        }
        else {
            axios.post("http://34.239.128.242:7000/inrange", {
                startdate: startdate,
                enddate: enddate,
                carID: car.ID
            }).then((result) => {
                if (result.data.result == true) {
                    setalternateView(true);
                }
                if (result.data.result == false) {
                    setalternateView(false);
                    setselectedHours(hours);
                    if (hours <= 24 && ppH != "N/A") {
                        var temp = parseFloat(ppH) * hours
                        console.log(temp)
                        setPrice(temp);
                    }
                    else if (hours > 24 && hours <= 48 && ppH != "N/A") {
                        var temp = parseFloat(ppH) * hours * .9
                        setPrice(temp)
                    }
                    else if (hours > 48 && ppH != "N/A") {
                        var temp = parseFloat(ppH * hours * .8)
                        setPrice(temp)
                    }
                    console.log("MEMBERSHIP STATUS" + auth.data.Items[0].membershipstatus);
                    if (auth.data.Items[0].membershipstatus == "valid") {
                        setValid(true)
                    }
                    else {
                        alert("Your membership status is not valid so you will not be able to create a transaction. Please enable your membership in your account page");
                    }
                }
            })
        }
    }


    const sendTransaction = e => {
        console.log("in send Transaction");
        console.log("selected Hours " + selectedHours);
        console.log("carID" + car.ID);
        console.log("locationid" + car.locationID);
        axios.post("http://localhost:7000/createrental", {
            startdate: startdate,
            enddate: enddate,
            car: car.ID,
            location: car.locationID,
            user: auth.data.Items[0].ID,
            price: price,
            hours: selectedHours,
            status: "RESERVED"
        }).then((result) => {
            console.log("SUCCESS" + result.data)
            setValid(false)
        }).catch((e) => { console.log(e) })
    }

    return (
        <ErrorBoundary
            renderError={({ error }) => <Error></Error>}
            render={() => <Valid></Valid>}
        />
    )


}

export default CheckOutPage; 