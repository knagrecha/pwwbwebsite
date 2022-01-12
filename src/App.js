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
import Container from 'react-bootstrap/Container';

function App() {
  loadCss();
  return (
    <Container className="Color" fluid>
      <NavbarComp />
      <Router>
        <Switch>
          <Route exact path="/" component={Hourly} />
          <Route exact path="/MapForecast" component={MapForecast} />
          <Route exact path="/airqualitymap" component={AirQualityMap} />

          {/* <Route exact path="/insight" component={Insight} /> */}
        </Switch>
      </Router>
    </Container>

  );
}

export default App;
