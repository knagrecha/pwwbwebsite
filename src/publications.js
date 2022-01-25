import React from "react";

// import { connect } from "react-redux";
import { setAirQuality } from "./redux/actions/spinner.actions";
import axios, { Axios } from 'axios';
import "./airquality.style.css";
import NavbarComp from "./Components/NavbarComp";
import {Row, Col, Spinner, Container, Card } from 'react-bootstrap';

class Publications extends React.Component {


  render() {

    return (

      <Container className="dashboard" fluid>

        <Row className="cards">


          <Col align="center">

            <Card className="shadow card">
            <Card.Body className="cardBody d-flex">
                <Card.Title className="cardTitle">Publications</Card.Title>
                  <hr/>
                  <Container fluid>
                      <Row>
                          <Col style={{textAlign: "left", fontSize: "16px"}}>
                            <ul>
                              <li style={{marginBottom: "20px"}}>
                                <a style={{color: "black", textDecoration: "none"}} href="https://agu.confex.com/agu/fm21/meetingapp.cgi/Paper/869004" target="_blank"><strong>Predicting PM2.5 Air Pollution using Deep Learning with Multisource Satellite and Ground-based Observations and Meteorological and Wildfire Big Data</strong> (AGU Fall Meeting '21) </a>
                              </li>
                              <li style={{marginBottom: "20px"}}>
                                <a style={{color: "black", textDecoration: "none"}} href="https://link.springer.com/article/10.1007/s11869-021-01126-3" target="_blank"><strong>Predicting PM2. 5 atmospheric air pollution using deep learning with meteorological data and ground-based observations and remote-sensing satellite big data</strong> (Air Quality, Atmosphere & Health '21) </a>
                              </li>
                              <li style={{marginBottom: "20px"}}>
                                <a style={{color: "black", textDecoration: "none"}} href="https://link.springer.com/chapter/10.1007/978-3-030-71704-9_20" target="_blank"><strong>Real-Time Spatiotemporal Air Pollution Prediction with Deep Convolutional LSTM Through Satellite Image Analysis</strong> (Advances in Data Science and Information Engineering '21') </a>
                              </li>
                              <li style={{marginBottom: "20px"}}>
                                <a style={{color: "black", textDecoration: "none"}} href="https://ieeexplore.ieee.org/abstract/document/9457991/" target="_blank"><strong>Sensor-Based Air Pollution Prediction Using Deep CNN-LSTM</strong> (CSCI '20) </a>
                              </li>
                              <li style={{marginBottom: "20px"}}>
                                <a style={{color: "black", textDecoration: "none"}} href="https://ieeexplore.ieee.org/abstract/document/9457906/" target="_blank"><strong>Satellite Image Atmospheric Air Pollution Prediction through Meteorological Graph Convolutional Network with Deep Convolutional LSTM</strong> (CSCI '20) </a>
                              </li>
                              <li style={{marginBottom: "20px"}}>
                                <a style={{color: "black", textDecoration: "none"}} href="https://ui.adsabs.harvard.edu/abs/2020AGUFMA061.0004C/abstract" target="_blank"><strong>Particulate Matter Forecasting in Los Angeles County with Sparse Ground-Based Sensor Data Analytics</strong> (AGU Fall Meeting '20) </a>
                              </li>
                              <li style={{marginBottom: "20px"}}>
                                <a style={{color: "black", textDecoration: "none"}} href="https://ui.adsabs.harvard.edu/abs/2020AGUFMA043.0013M/abstract" target="_blank"><strong>Real-Time Spatiotemporal Air Pollution Prediction with Deep Convolutional LSTM through Satellite Image Analysis</strong> (ICDATA '20) </a>
                              </li>
                            </ul>
                          </Col>
                      </Row>
                  </Container>
              </Card.Body>
            </Card>


          </Col>


      </Row>



      </Container>
    );
  }
}

export default Publications;
