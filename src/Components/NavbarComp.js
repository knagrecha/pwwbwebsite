import * as React from "react";
import { Container, Navbar, Nav, NavDropdown, Form, InputGroup, Button } from "react-bootstrap";
import { setAirQuality } from "../redux/actions/spinner.actions.js";
import { withRouter} from 'react-router-dom';
import axios, { Axios } from 'axios';
import Hourly from "../forecastpage.js";
import { Alarm, Map, House, InfoCircle, BarChart } from "react-bootstrap-icons"



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
      pathname: '/?zip='+this.state.value,
      state: { data: this.state.value }
    });
    this.props.history.go();
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
         <Navbar variant="dark" expand="lg" className="upperNav">

            <Navbar.Brand href="/"><img src="/air_la.png" alt="air" width="192" height="60"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="linkNav m-auto">

                  {/*<Nav.Link href="/graphs">Graphs</Nav.Link> */}
                  {/* <Nav.Link href="/hourly">Hourly</Nav.Link> */}

                  <Nav.Link className="link" href="/airqualitymap"><Map style={{marginBottom: "4px", marginRight: "5px"}}/> Live Map</Nav.Link>
                  <Nav.Link className="link" href="/"><House style={{marginBottom: "4px", marginRight: "5px"}}/> Home</Nav.Link>
                  <Nav.Link className="link" href="/MapForecast"><Alarm style={{marginBottom: "4px", marginRight: "5px"}}/>  Daily Forecast </Nav.Link>
                  <Nav.Link className="link" href="/charts"><BarChart style={{marginBottom: "4px", marginRight: "5px"}}/> Charts </Nav.Link>
                  <NavDropdown menuVariant="dark" className="myDropdown" title =<span><InfoCircle style={{marginBottom: "4px", marginRight: "5px"}}/>About</span> className="link">
                      <NavDropdown.Item className="dropdownitem" href="https://airquality.lacity.org/">Project</NavDropdown.Item>
                      <NavDropdown.Item className="dropdownitem" href="https://www.calstatela.edu/research/data-science">Team</NavDropdown.Item>
                      <NavDropdown.Item  className="dropdownitem"href="/publications">Publications</NavDropdown.Item>

                  </NavDropdown>

              </Nav>



        { /*
                    <Form onSubmit={this.handleSubmit} className="d-flex">


                              <Form.Control
                                className=""
                                aria-label="search"
                                type="search"

                                value={this.state.value}

                                id="aq-lookup"
                                style={{textAlign: "center"}}
                              />




                  </Form>
                    */}
                  </Navbar.Collapse>
        </Navbar>
          <Navbar variant="dark" expand="lg" className="lowerNav">
              <Nav className="m-auto">
                    <Form onSubmit={this.handleSubmit} className="d-flex searchBox">
                        <Form.Control
                          type="search"
                          placeholder="Search by zipcode or city name"
                          className="me-2 searchForm"
                          aria-label="Search"
                          onChange={(e) => { this.setState( { value: e.target.value })}}
                        />
                    </Form>
                </Nav>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavbarComp);
