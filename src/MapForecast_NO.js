import * as React from "react";

import ForecastMap_NO from './ForecastMap_NO.js'
import './map.style.css'

class MapForecast_NO extends React.Component {

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
        <ForecastMap_NO id={1} />

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

export default MapForecast_NO;
