import * as React from "react";

import ForecastMap_CA from './ForecastMap_CA.js'
import './map.style.css'

class MapForecast_CA extends React.Component {

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
        <ForecastMap_CA id={1} />

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

export default MapForecast_CA;
