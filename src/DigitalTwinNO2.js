import * as React from "react";
import LeafletMap from "./LeafletMap.js";

import ForecastMap from './ForecastMap.js'
import './map.style.css'

class DigitalTwinNO extends React.Component {

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.state = {
      id: 1,
    };
  }


  render() {
    return (
      <div className="map-row col-sm-12" >



        <div className="center5 col-sm-12">
          <LeafletMap imageUrl={'https://live-traffic-count.s3.us-east-2.amazonaws.com/no2_counts.png'} />

          {/*
          <div
            className="content-layerlist size2 "
            id="layerlist1"
            ref={this.listRef}

          ></div>
          */}

        </div>

      </div>


    );
  }
}

export default DigitalTwinNO;
