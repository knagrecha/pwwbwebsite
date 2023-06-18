import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Icon, Box, Typography, Stack } from '@mui/material';

function LeafletMap({ imageUrl }) {
    const getRoundedTime = () => {
        const date = new Date();
        var min = 0;
        if (date.getMinutes() < 15) {
            min = 0;
        } else if (date.getMinutes() < 30) {
            min = 15;
        } else if (date.getMinutes() < 45) {
            min = 30;
        } else if (date.getMinutes() < 59) {
            min = 45;
        } else {
            min = 0;
        }

        date.setMinutes(min, 0, 0);  // Resets minutes, seconds and milliseconds
        return date.toLocaleTimeString('en-us', { weekday: 'long' });
    };

    var scaleUrl;
    if (imageUrl === 'https://live-traffic-count.s3.us-east-2.amazonaws.com/traffic_counts.png') {
        scaleUrl = "https://live-traffic-count.s3.us-east-2.amazonaws.com/Traffic_scale.png"
    } else if (imageUrl == 'https://live-traffic-count.s3.us-east-2.amazonaws.com/pm25_counts.png') {
        scaleUrl = "https://live-traffic-count.s3.us-east-2.amazonaws.com/PM25_scale.png"
    } else if (imageUrl == 'https://live-traffic-count.s3.us-east-2.amazonaws.com/no2_counts.png') {
        scaleUrl = "https://live-traffic-count.s3.us-east-2.amazonaws.com/NO2_scale.png"
    } else if (imageUrl == 'https://live-traffic-count.s3.us-east-2.amazonaws.com/hc_counts.png') {
        scaleUrl = "https://live-traffic-count.s3.us-east-2.amazonaws.com/HC_scale.png"
    } else if (imageUrl == 'https://live-traffic-count.s3.us-east-2.amazonaws.com/co2_counts.png') {
        scaleUrl = "https://live-traffic-count.s3.us-east-2.amazonaws.com/CO2_scale.png"
    }






    useEffect(() => {
        // Create a map instance and specify its center and zoom level
        const map = L.map('map').setView([33.9, -118], 11);

        // Create a tile layer with OpenStreetMap tiles
        const osm = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
            maxZoom: 13,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        // Define the error overlay URL, alt text, and LatLng bounds
        const errorOverlayUrl =
            'https://live-traffic-count.s3.us-east-2.amazonaws.com/pm25_counts.png';
        const altText =
            'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
        const latLngBounds = L.latLngBounds([[33.4314158179166, -118.82830063932784], [34.59706785792427, -117.42153890439667]]);

        // Create an image overlay with the provided properties
        const imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
            opacity: 0.5,
            errorOverlayUrl: errorOverlayUrl,
            alt: altText,
            interactive: true,
            zIndex: 500
        }).addTo(map);

        map.createPane('labels');
        map.getPane('labels').style.zIndex = 650;
        map.getPane('labels').style.pointerEvents = 'none';

        const osm2 = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png", {
            maxZoom: 13,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            pane: "labels"
        }).addTo(map);

        // Fit the map to the LatLng bounds
        map.fitBounds(latLngBounds);


        // Cleanup the map instance on component unmount
        return () => {
            map.remove();
        }
    }, [imageUrl]);

    return <div>
        <div id="map" style={{ height: '600px' }} />
        <Stack display="flex" justifyContent="flex" alignItems="center" sx={{ textAlign: "center", position: "absolute", top: "20vh", backgroundColor: "white", left: "10vw", minWidth: "600", height: "15vh", zIndex: "400", border: "2px solid black" }}>
            <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ backgroundColor: "white", fontSize: "large" }}>
                <Typography variant="subtitle1">Last Updated: {getRoundedTime()}</Typography>
            </Box>
            <Box
                component="img"
                sx={{
                    height: 80,
                    width: 460,
                    maxHeight: { xs: 80, md: 160 },
                    maxWidth: { xs: 460, md: 920 },
                }}
                alt="Scale"
                src={scaleUrl}
            />
        </Stack>


    </div>;
}

export default LeafletMap;