import React from "react";
import ReactDOM from "react-dom";
import NavBar from "../components/NavBar";
import Box from "@material-ui/core/Box";
import { CardMedia, Card } from "@material-ui/core";
import { Container, ProTip, Copyright, Typography } from "@material-ui/core";

const styles = {
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  card: {
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "black",
  },
};
function Home(props) {
  return (
    <div class="bg">
      <NavBar></NavBar>
      <div class="container">Getting started is so simple! Simply Login</div>
    </div>
  );
}

export default Home;
