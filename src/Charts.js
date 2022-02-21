import React, {useState, useEffect} from "react";

import "./airquality.style.css";
import NavbarComp from "./Components/NavbarComp";
import {Row, Col, Spinner, Container, Card } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

import AWS from 'aws-sdk';

function Charts() {

  const [values, setValues] = useState([]);
  const [maxVal, setMaxVal] = useState(-1);

  const dates = [];
  dates[0] = new Date()
  for (let i = 1; i < 24; i++) {
    const newDate = new Date(dates[i-1]);
    newDate.setHours(newDate.getHours() + 1);
    dates.push(newDate);
  }

  const s3 = new AWS.S3();

  const downloadImages = () => {

    var fileName;

    const params = {
     Bucket: "sagemaker-us-east-2-958520404663",
     Prefix: `sagemaker/predictions/`,
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
        var localMaxVal = -1;
        selected_items = new_data_keys.slice(0, imageCount);

        for (let i = 0; i < selected_items.length; i++) {
            var arr =selected_items[i].Key.split('-');
            arr = parseInt(arr[arr.length-1].split(".")[0]);
            if (arr > localMaxVal) {
              localMaxVal = arr;
            }
            if (arr < 15) {
              links.push([dates[i].getHours() + ":00", arr, '#48cf13']);
            }
            else if (15 <= arr && arr < 17) {
              links.push([dates[i].getHours() + ":00", arr, '#b9cf13']);
            }
            else if (17 <= arr && arr < 19) {
              links.push([dates[i].getHours() + ":00", arr, '#cfbf13']);
            }
            else if (19 <= arr && arr < 20) {
              links.push([dates[i].getHours() + ":00", arr, '#cf8013']);
            }
            else {
              links.push([dates[i].getHours() + ":00", arr, '#cf2f13']);
            }

          }
        setMaxVal(localMaxVal);
        links.reverse();

        links.unshift(["Date", "PM2.5", { role: 'style' }]);
        console.log(links);
        setValues(links);

      }
    });



  }
  useEffect(() => {
    downloadImages();
  }, []);

  const options = {

      title: "Average Hourly Los Angeles PM2.5 Levels (micrograms per cubic meter)",
      legend: 'none',

      vAxis: {
        maxValue: maxVal + 10
      },
      hAxis: {
        slantedText:true, slantedTextAngle:45
      }
  };

  return (

      <Container className="dashboard" fluid>

          <Row className="cards">
          <Col xs={12} md={12} lg={12} xl={12} align="center">
            <Card className="shadow card">
            <Card.Body className="cardBodyRSS d-flex">
                <Card.Title className="cardTitle">PM2.5</Card.Title>
                  <hr/>
                  <Container fluid>
                  <Chart
                    chartType="ColumnChart"
                    options={options}
                    data={values}
                    width="100%"
                    height="400px"
                    legendToggle
                  />
                  </Container>
              </Card.Body>
            </Card>


          </Col>
          </Row>



      </Container>
  );
}


export default Charts;
