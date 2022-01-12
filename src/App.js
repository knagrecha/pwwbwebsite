// import 'boostrap/dist/css/bootstrap.min.css';
import { loadCss } from 'esri-loader';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarComp from "./Components/NavbarComp";
import Home from "./Components/pages/Home";
import Dashboard from "./Components/dashboard/dashboard.component"
import MapForecast from "./MapForecast"
import './App.css'
import AirQualityMap from './airqualitymap';
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
                <Route name="home" exact path="/" render={(props) => <Hourly key={props.location.state} {...props}/>}/>
                <Route exact path="/MapForecast" component={MapForecast} />
                <Route exact path="/airqualitymap" component={AirQualityMap} />

                {/* <Route exact path="/insight" component={Insight} /> */}
              </Switch>
            </Col>
          </Row>
      </Container>


  );
}

export default App;
