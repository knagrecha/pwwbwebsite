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
            src="https://pwwb-digital-twin-5b49ae1d361e.herokuapp.com/"
            width="1400"
            height="800"
            frameBorder="0"
            style={{ border: 0, margin: 0 }}
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
