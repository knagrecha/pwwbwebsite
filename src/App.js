// import 'boostrap/dist/css/bootstrap.min.css';
import { loadCss } from 'esri-loader';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarComp from "./Components/NavbarComp";
import Home from "./Components/pages/Home";
import Dashboard from "./Components/dashboard/dashboard.component"
import MapForecast from "./MapForecast"
import MapForecast_CA from "./MapForecast_CA"
import MapForecast_NO from "./MapForecast_NO"
import Footer from "./Components/Footer";
import './App.css'
import AirQualityMap from './airqualitymap';
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
                <Route exact path="/airqualitymap" component={AirQualityMap} />
                <Route exact path="/charts" component={Charts} />
                <Route name="publications" exact path="/publications" component={Publications}/>
                <Route name="home" path="/:zip" render={(props) => <Hourly key={props.location.state} {...props}/>}/>
                <Route name="home" exact path="/" render={(props) => <Hourly key={props.location.state} {...props}/>}/>

              </Switch>
              <Footer/>
            </Col>
          </Row>

      </Container>


  );
}

export default App;
