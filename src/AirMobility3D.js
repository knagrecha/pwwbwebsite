// import React, { Component } from 'react';
// import { loadModules } from 'esri-loader';

// // https://arcg.is/uuKT9

import React from 'react';

class AirMobilityMap3D extends React.Component {
  render() {
    return (
      <div>
        <center>
          <iframe
            src="https://usctrojan.maps.arcgis.com/apps/instant/3dviewer/index.html?appid=fb333feb65bf4a9d955e067fbaf1c183"
            width="1400"
            height="800"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
          >
            iFrames are not supported on this page.
          </iframe>
        </center>
      </div>
    );
  }
}


export default AirMobilityMap3D;
