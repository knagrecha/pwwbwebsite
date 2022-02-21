import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';
import Map from './los_angeles_background_map.png';
import Scale from './no2_scale.png';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AiOutlinePause } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
import { BsSkipBackward, BsSkipForward } from "react-icons/bs";


import AWS from 'aws-sdk';

const Styles = styled.div`
  .mapContainer {
    padding: 0px;
    margin: 0px;
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
  }

.mapImage {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
}
.overlay {
  position: absolute;
  top: -7%;
  left: 20%;
  width: 75%;
  opacity: 0.5;
}

.scaleOverlay {
  position: absolute;
  top: 65%;
  left: 5%;
  width: 25%;
  opacity: 1.0;
}

.timeOverlay {
  position: absolute;
  top: 5%;
  left: 5%;
  width: 25%;
  height: 35%;
  max-height: 180px;
  opacity: 1.0;
  background-color: white;
  border: 4px solid grey;
  padding: 5%;
  padding-top: 1%;
  padding-bottom: 1%;
  z-index: 1;
}

.timeText {
  text-align: center;
  font-weight: 300;
  font-size: 150%;
}


.timeTextSub {
  text-align: center;
  font-weight: 300;
  font-size: 120%;
}


.btn {
  background-color: white;
  color: black;
  border: none;
  position: absolute;
  width: 36px;
  height: 36px;
  margin: 0 auto;
  padding: 0;
  display: inline-block;
  line-height: 50px;
  text-align: center;
  top: 60%;
}

.icon {
  background-color: white;
  color: black;
  border: 2px solid black;
  padding: 5px;
  position: absolute;
  pointerEvents: none;
  top: -4%;
  left: -3%;
}

`;



function ForecastMap_NO(props) {

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(new Date().getHours());
  const [day, setDay] = useState(new Date().getDay());
  const [date, setDate] = useState(new Date().toDateString());
  const [paused, setPaused] = useState(false);

  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  }


  const s3 = new AWS.S3();

  const downloadImages = () => {

    console.log("DOWNLOADING!");

    var fileName;

    const params = {
     Bucket: "sagemaker-us-east-2-958520404663",
     Prefix: `sagemaker/no2Predictions/`,
   };

   const imageCount = 24;
   var selected_items;
   var links = [];
    s3.makeUnauthenticatedRequest('listObjectsV2', params, function(err, data) {
      console.log(data);
      if (err) console.log(err, err.stack); // an error occurred
      else {
        var data_keys = data["Contents"];
        data_keys.sort((a, b) => (a.LastModified > b.LastModified) ? -1 : 1);
        var new_data_keys = [];
        for (let i = 0; i < data_keys.length; i++) {
          if (data_keys[i].Key.includes("png")) {
            new_data_keys.push(data_keys[i]);
          }
        }
        selected_items = new_data_keys.slice(0, imageCount);
        for (let i = 0; i < selected_items.length; i++) {
          links.push([`https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/${selected_items[i].Key}`]);
          }
        links.reverse();
        console.log(links);

        setImages(links);

      }
    });



  }

  function useInterval(callback, delay) {
      const savedCallback = useRef();

      useEffect(() => {
        savedCallback.current = callback;
      }, [callback]);

      useEffect(() => {
        function tick() {
          savedCallback.current();
        }

        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
  }

  function previousImage() {
    console.log("GOING BACK!!");
    if (index == 0) {
      document.getElementById("overlayImage").src = images[images.length-1];
      setIndex(images.length-1);
      setTime(new Date().getHours());
      setDay(new Date().getDay()+1);
      var temp = new Date();
      temp.setDate(temp.getDate()+1)
      setDate(temp.toDateString());
    } else {
      document.getElementById("overlayImage").src = images[index-1];
      setIndex(index-1);
      if (time == 0) {
        setTime(23);
        setDay(new Date().getDay());
        setDate(new Date().toDateString());
      } else {
        setTime(time-1);
      }
    }
  }

  function nextImage() {

    if (index >= images.length-1) {
      setIndex(0);
      setTime(new Date().getHours());
      setDay(new Date().getDay());
      setDate(new Date().toDateString());
      document.getElementById("overlayImage").src = images[0];
    } else {
      document.getElementById("overlayImage").src = images[index+1];
      setIndex(index+1);
      if (time == 23) {
        setTime(0);
        setDay(day+1);
        var temp = new Date();
        temp.setDate(temp.getDate()+1)
        setDate(temp.toDateString());
      } else {
        setTime(time+1);
      }
    }
  }

  useInterval(() => {
    if (!paused) {
      nextImage();
    }
  }, 1000)



  useEffect(() => {
    downloadImages();
  }, []);




  return(
    <Styles>
      <Container fluid className="mapContainer">
          <img className="mapImage" src={Map}/ >
          <Container className="timeOverlay d-none d-md-block">
              <Row>
                  <Col>
                    <h1 className="timeText">{date}</h1>
                  </Col>
              </Row>
              <Row>
                  <Col>
                    <h3 className="timeTextSub">{time+":00"}</h3>
                  </Col>
              </Row>

              <Row xs={1} s={1} md={4} lg={4} xl={4} style={{marginTop: "5%"}}>
                  <Col className="d-none d-sm-block">
                    <Button className="btn" onClick={previousImage}><BsSkipBackward size={36} className="icon"/></Button>
                  </Col>
                  <Col className="d-none d-sm-block">
                    <Button className="btn" onClick={() => {setPaused(true)}}><AiOutlinePause size={36} className="icon"/></Button>
                  </Col>
                  <Col className="d-none d-sm-block">
                    <Button className="btn" onClick={() => {setPaused(false)}}><FiPlay size={36} className="icon"/></Button>
                  </Col>
                  <Col className="d-none d-sm-block">
                    <Button className="btn" onClick={nextImage}><BsSkipForward size={36} className="icon"/></Button>
                  </Col>
            </Row>

          </Container>

          <img className="scaleOverlay" src={Scale}/ >
          <img className="overlay" id="overlayImage" src={images[0]}/>
      </Container>


  </Styles>
  )
}

export default ForecastMap_NO;
