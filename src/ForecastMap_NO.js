import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';
import { MapContainer, TileLayer, ImageOverlay, useMap } from 'react-leaflet';
import { Button, Icon, Box, Typography, Stack } from '@mui/material';
import Scale from './no2_scale.png';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AWS from 'aws-sdk';
import "leaflet/dist/leaflet.css";

const ForecastMap_NO = (props) => {

  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef();


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
    s3.makeUnauthenticatedRequest('listObjectsV2', params, function (err, data) {
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
        console.log(JSON.stringify(links));



        console.log("DOWNLOAD COMPLETE")
        //setLoading(false);
        setImageUrls(links);

      }
    });



  }


  const bounds = [
    [33.2, -119.64],
    [34.48, -117.55]
  ];

  const getRoundedTime = () => {
    const date = new Date();
    var hour = date.getHours();
    var new_hour = (hour + selectedImageIndex % 24)
    date.setMinutes(0, 0, 0);  // Resets minutes, seconds and milliseconds
    date.setHours(new_hour)
    return date.toLocaleTimeString('en-us', { weekday: 'long' });
  };

  useEffect(() => {
    downloadImages();
  }, [])

  useEffect(() => {
    const loadImages = async () => {
      try {
        const loadedImages = await Promise.all(
          imageUrls.map((url) => {
            return new Promise((resolve, reject) => {
              const image = new Image();
              image.src = url;
              image.onload = () => {
                resolve(url);
              };
              image.onerror = reject;
            });
          })
        );

        setImages(loadedImages);
        setLoading(false);
      } catch (error) {
        console.log('Failed to load images:', error);
      }
    };
    if (imageUrls.length > 0) {
      loadImages();
    }

  }, [imageUrls]);

  const handlePlay = () => {
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setSelectedImageIndex((prevIndex) => {
        return (prevIndex + 1) % images.length;
      });
    }, 500);
  };

  const handlePause = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  const handleForward = () => {
    setSelectedImageIndex((prevIndex) => {
      return (prevIndex + 1) % images.length;
    });
  };

  const handleBackward = () => {
    setSelectedImageIndex((prevIndex) => {
      return (prevIndex - 1 + images.length) % images.length;
    });
  };

  const LabelsLayer = () => {
    const map = useMap();
    map.createPane('labels');
    map.getPane('labels').style.zIndex = 650;
    map.getPane('labels').style.pointerEvents = 'none';
    return null;
  };


  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <MapContainer center={[34, -118.2]} zoom={9} minZoom={5} maxZoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <ImageOverlay
              url={images[selectedImageIndex]}
              bounds={bounds}
              opacity={0.5}
              zIndex={500}
            />
            <LabelsLayer />
            <TileLayer
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              pane="labels"
            />
          </MapContainer>
          <Stack display="flex" justifyContent="flex" alignItems="center" sx={{ textAlign: "center", position: "absolute", top: "20vh", width: "30%", backgroundColor: "white", left: "10vw", minWidth: "300", height: "15vh", zIndex: "400", border: "2px solid black" }}>
            <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ backgroundColor: "white", fontSize: "large" }}>
              <Typography variant="subtitle1">Time: {getRoundedTime()}</Typography>
            </Box>
            <Box
              component="img"
              sx={{

                width: "75%",
              }}
              alt="Scale"
              src={Scale}
            />
            <Box display="flex" justifyContent="center" margin={2}>
              <Button variant="outlined" style={{ marginRight: '5px', background: 'white' }} onClick={handleBackward}>
                <ArrowBackIosIcon />
              </Button>
              <Button variant="outlined" style={{ margin: '0 5px', background: 'white' }} onClick={isPlaying ? handlePause : handlePlay}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </Button>
              <Button variant="outlined" style={{ marginLeft: '5px', background: 'white' }} onClick={handleForward}>
                <ArrowForwardIosIcon />
              </Button>
            </Box>
          </Stack>


        </div>
      )}
    </div>
  );
};



/*

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

*/
/*

function ForecastMap(props) {
  /*
   const [imageUrls, setImageUrls] = useState([]);
   const [loading, setLoading] = useState(true);
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
       Prefix: `sagemaker/predictions/`,
     };
 
     const imageCount = 24;
     var selected_items;
     var links = [];
     s3.makeUnauthenticatedRequest('listObjectsV2', params, function (err, data) {
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
         console.log(JSON.stringify(links));
 
         setImageUrls(links);
 
         console.log("DOWNLOAD COMPLETE")
         setLoading(false);
 
       }
     });
 
 
 
   }
 
 
 
   useEffect(() => {
     downloadImages();
   }, []);
 
 
 
 
   return (
     <div>
       {
         loading ? (
           <p> Loading & waiting...</p >
         ) : (
           MyMap({ imageUrls: imageUrls })
         )
       }
     </div>
   )
  */

/*
  const urls = [
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-11-18.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-11-19.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-11-20.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-11-21.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-11-22.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-11-23.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-00.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-01.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-02.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-03.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-04.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-05.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-06.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-07.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-08.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-09.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-10.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-11.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-12.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-13.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-14.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-14-avg-15.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-15-avg-15.png",
    "https://sagemaker-us-east-2-958520404663.s3.us-east-2.amazonaws.com/sagemaker/predictions/pred-2022-02-12-16-avg-15.png"]
  return (
 
    MyMap({ imageUrls: urls })
 
  )
 
}
*/

export default ForecastMap_NO;
