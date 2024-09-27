// import 'boostrap/dist/css/bootstrap.min.css';
import { loadCss } from 'esri-loader';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarComp from "./Components/NavbarComp";
import Home from "./Components/pages/Home";
import Dashboard from "./Components/dashboard/dashboard.component"
import MapForecast from "./MapForecast"
import MapForecast_CA from "./MapForecast_CA"
import MapForecast_NO from "./MapForecast_NO"
import DigitalTwinHC from './DigitalTwinHC';
import DigitalTwinNO from './DigitalTwinNO2';
import DigitalTwinTraffic from './DigitalTwinTraffic';
import DigitalTwinPM from './DigitalTwinPM'
import DigitalTwinCO from './DigitalTwinCO2.js';
import Footer from "./Components/Footer";
import './App.css'
import AirQualityMap from './airqualitymap';
import AirMobilityMap3D from './AirMobility3D';
import FireTwin3D from './FireTwin3D';
import AirMobilityMap from './AirMobilityMap';
import Charts from './Charts';
import Publications from './publications'
import Hourly from './forecastpage';
import { Container, Row, Col } from 'react-bootstrap';

function App() {


  loadCss();
  return (

    <Container className="Color" fluid>
      <Row>
        <Col>
          <NavbarComp />

          <Switch>
            <Route exact path="/MapForecast" component={MapForecast} />
            <Route exact path="/MapForecastNO" component={MapForecast_NO} />
            <Route exact path="/MapForecastCA" component={MapForecast_CA} />
            <Route exact path="/DigitalTwinPM" component={DigitalTwinPM} />
            <Route exact path="/DigitalTwinNO" component={DigitalTwinNO} />
            <Route exact path="/DigitalTwinHC" component={DigitalTwinHC} />
            <Route exact path="/DigitalTwinCO" component={DigitalTwinCO} />
            <Route exact path="/DigitalTwinTraffic" component={DigitalTwinTraffic} />
            <Route exact path="/airqualitymap" component={AirQualityMap} />
            <Route exact path="/airmobilitymap" component={AirMobilityMap} />
            <Route exact path="/airmobilitymap3D" component={AirMobilityMap3D} />
            <Route exact path="/firetwinmap3D" component={FireTwin3D} />
            <Route exact path="/charts" component={Charts} />
            <Route name="publications" exact path="/publications" component={Publications} />
            <Route name="home" path="/:zip" render={(props) => <Hourly key={props.location.state} {...props} />} />
            <Route name="home" exact path="/" render={(props) => <Hourly key={props.location.state} {...props} />} />

          </Switch>
          <Footer />
        </Col>
      </Row>

    </Container>


  );
}

export default App;
