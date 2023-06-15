import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Icon, Box, Typography } from '@mui/material';

function LeafletMap({ imageUrl }) {
    const getRoundedTime = () => {
        const date = new Date();
        date.setMinutes(0, 0, 0);  // Resets minutes, seconds and milliseconds
        return date.toLocaleTimeString();
    };



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
        };
    }, [imageUrl]);

    return <div>
        <div id="map" style={{ height: '600px' }} />
        <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ backgroundColor: "white", fontSize: "large" }}>
            <Typography variant="subtitle1">Last Updated: {getRoundedTime()}</Typography>
        </Box>

    </div>;
}

export default LeafletMap;