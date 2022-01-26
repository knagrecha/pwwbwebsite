import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';
import Map from './los_angeles_background_map.png';
import { Container } from 'react-bootstrap';
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
  top: 0%;
  left: 20%;
  width: 75%;
  opacity: 0.5;
}

`;



function ForecastMap(props) {

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  const s3 = new AWS.S3();

  const downloadImages = () => {

    console.log("DOWNLOADING!");

    const curr_time = new Date();

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
        selected_items = new_data_keys.slice(0, imageCount);
        for (let i = 0; i < selected_items.length; i++) {
          links.push([`https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/${selected_items[i].Key}`]);
          }
        //links.reverse();
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

  useInterval(() => {
    document.getElementById("overlayImage").src = images[index];
    if (index == images.length-1) {
      setIndex(0);
    } else {
      setIndex(index+1);
    }

  }, 500)
  useEffect(() => {
    downloadImages();
  }, []);




  return(
    <Styles>
      <Container fluid className="mapContainer">
          <img className="mapImage" src={Map}/ >
          <img className="overlay" id="overlayImage" src={images[images.length-1]}/>
          <div className="overlay" style={{backgroundImage: images[images.length-1]}}/>
      </Container>


  </Styles>
  )
}

export default ForecastMap;
