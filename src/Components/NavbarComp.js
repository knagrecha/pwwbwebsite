import * as React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { setAirQuality } from "../redux/actions/spinner.actions.js";
import { withRouter} from 'react-router-dom';
import ".././airquality.style.css";
import axios, { Axios } from 'axios';
import Hourly from "../forecastpage.js";




class NavbarComp extends React.Component {
  didAirQualityLoad = false;

  constructor(props) {
    super(props);

    this.key = "5023eb593a7c49f5b6a6a9e5184b38df";
    this.state = {
      value: ""
    };
  }


  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props);
    this.props.history.push({
      pathname: '/',
      state: { data: this.state.value }
    });
    console.log(this.props);
  };




  componentDidMount1() {
    axios({
      method: 'GET',
      url:"https://widget.airnow.gov/aq-dial-widget-primary-pollutant/?city="+this.state.cityName+"&state="+this.state.stateCode+"&country=USA&transparent=true"

    }).then((resp) => {
      this.setState({
        aqi: resp.data.data,
      });
    })
  }

  render() {
    return (
      <div>
         <Navbar variant="dark" expand="lg" className="backgroundNav">
            <img src="/air.png" alt="air" width="50" height="50"/>
            <Navbar.Brand className="center3 textSize">Predict What We Breathe</Navbar.Brand>
            <Nav>
                <Container fluid>
                    <form onSubmit={this.handleSubmit}>
                          <input
                            className="center2 textboxSearch"
                            type="text"
                            placeholder="Enter zipcode or city name here..."
                            value={this.state.value}
                            onChange={(e) => { this.setState( { value: e.target.value })}}
                            id="aq-lookup"
                            style={{padding: "2%", textAlign: "center"}}
                          />
                  </form>

                </Container>
                {/*<Nav.Link href="/forecastVideo">FORECAST VIDEO</NavDropdown.Item>*/}

                {/* <Nav.Link href="/insight">Insight</Nav.Link> */}
            </Nav>
        </Navbar>
        <Navbar variant="dark" expand="lg" className="backgroundNav2">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="m-auto">

                  {/*<Nav.Link href="/graphs">Graphs</Nav.Link> */}
                  {/* <Nav.Link href="/hourly">Hourly</Nav.Link> */}

                  <Nav.Link className="link" href="/airqualitymap">Live Air Quality Map</Nav.Link>
                  <Nav.Link className="link" href="/">Home</Nav.Link>
                  <Nav.Link className="link" href="/MapForecast">Air Quality Forecast</Nav.Link>
              </Nav>

            </Navbar.Collapse>
          </Container>

        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavbarComp);
