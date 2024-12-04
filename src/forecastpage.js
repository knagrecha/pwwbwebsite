import React from "react";

// import { connect } from "react-redux";
import { setAirQuality } from "./redux/actions/spinner.actions";
import axios, { Axios } from 'axios';
import "./airquality.style.css";
import NavbarComp from "./Components/NavbarComp";
import {Row, Col, Spinner, Container, Card } from 'react-bootstrap';

class Hourly extends React.Component {

  didAirQualityLoad = false;
  constructor(props) {
    super(props);
    this.PostcodeForecastUrl =
      "https://api.weatherbit.io/v2.0/forecast/daily?postal_code=";
    this.CityForecastUrl =
      "https://api.weatherbit.io/v2.0/forecast/daily?city="
    //this.AqiUrl = "https://api.weatherbit.io/v2.0/current/airquality?postal_code=";
    this.PostcodeAqiUrl = "https://api.weatherbit.io/v2.0/current?postal_code=";
    this.CityAqiUrl = "https://api.weatherbit.io/v2.0/current/?city=";
    // this.widget = "https://widget.airnow.gov/aq-flag-widget/?a=today&z=90012&n=losAngeles"
    // this.key = process.env.REACT_APP_WEATHERBIT_KEY;
    //this.key = "b321ba8bb6914d52a15477807e833dfd"
    this.key = "f8761170b5374ac68edcc3c1eb6ff157";
    //this.key = "ffa0c2526f944cfc83a919bfe72bc39a";
    //this.key = "ae1eace77edc4aca9228e9b7b165ddb4";
    // this.key = "db5d97de2f5e423bb3dd7e130101a7dd";
    this.loading = true;

    this.state = {
      postalCode: "",
      check: null,
      cityName: null,
      stateCode: null,
      aqiCode: null,
      weatherCode: null,
      weatherIcon: [null, null, null, null, null],
      weatherTemp: [null, null, null, null, null],
      weatherMinTemp: [null, null, null, null, null],
      weatherMaxTemp: [null, null, null, null, null],
      date: [null, null, null, null, null],
    };
  }

  retrieveDataFromPostal() {
    const { setAirQuality } = this.props;
    fetch(
      this.PostcodeForecastUrl +
        this.state.postalCode +
        "&days=5&units=I&key=" +
        this.key
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          postalCode: this.state.postalCode,
          //cityName: data.city_name,
          //stateCode: data.state_code,

          weatherTemp: [
            data.data[0].temp,
            data.data[1].temp,
            data.data[2].temp,
            data.data[3].temp,
            data.data[4].temp,
          ],
          weatherMinTemp: [
            data.data[0].min_temp,
            data.data[1].min_temp,
            data.data[2].min_temp,
            data.data[3].min_temp,
            data.data[4].min_temp,
          ],
          weatherMaxTemp: [
            data.data[0].max_temp,
            data.data[1].max_temp,
            data.data[2].max_temp,
            data.data[3].max_temp,
            data.data[4].max_temp,
          ],
          weatherIcon: [
            data.data[0].weather.icon,
            data.data[1].weather.icon,
            data.data[2].weather.icon,
            data.data[3].weather.icon,
            data.data[4].weather.icon,
          ],
          date: [
            data.data[0].datetime,
            data.data[1].datetime,
            data.data[2].datetime,
            data.data[3].datetime,
            data.data[4].datetime,
          ],
        });
      });

    console.log("working");
    fetch(this.PostcodeAqiUrl + this.state.postalCode + "&key=" + this.key)
      .then((response) => response.json())
      .then((data) => {
        this.didAirQualityLoad = true;
        this.setState({
          cityName: data.data[0].city_name,
          stateCode: data.data[0].state_code,
          aqiCode: data.data[0].aqi,
        });
      }).then(() => {

        console.log("nearly done");
        this.loading = false;
         this.setState({ state: this.state });
      });


  }

  retrieveDataFromCity(){
    const { setAirQuality } = this.props;
    fetch(
      this.CityForecastUrl +
        this.state.postalCode +
        "&country=US"+
        "&days=5&units=I&key=" +
        this.key
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          postalCode: this.state.postalCode,
          //cityName: data.city_name,
          //stateCode: data.state_code,

          weatherTemp: [
            data.data[0].temp,
            data.data[1].temp,
            data.data[2].temp,
            data.data[3].temp,
            data.data[4].temp,
          ],
          weatherMinTemp: [
            data.data[0].min_temp,
            data.data[1].min_temp,
            data.data[2].min_temp,
            data.data[3].min_temp,
            data.data[4].min_temp,
          ],
          weatherMaxTemp: [
            data.data[0].max_temp,
            data.data[1].max_temp,
            data.data[2].max_temp,
            data.data[3].max_temp,
            data.data[4].max_temp,
          ],
          weatherIcon: [
            data.data[0].weather.icon,
            data.data[1].weather.icon,
            data.data[2].weather.icon,
            data.data[3].weather.icon,
            data.data[4].weather.icon,
          ],
          date: [
            data.data[0].datetime,
            data.data[1].datetime,
            data.data[2].datetime,
            data.data[3].datetime,
            data.data[4].datetime,
          ],
        });
      });

    fetch(this.CityAqiUrl + this.state.postalCode + "&country=US" + "&key=" + this.key)
      .then((response) => response.json())
      .then((data) => {
        this.didAirQualityLoad = true;
        this.setState({
          cityName: data.data[0].city_name,
          stateCode: data.data[0].state_code,
          aqiCode: data.data[0].aqi,
        });
      }).then(() => {

        console.log("nearly done");
        this.loading = false;
         this.setState({ state: this.state });
      });


  }

  componentDidMount() {
    if (this.props.location.state != null) {

      let data = this.props.location.state.data;
      this.handleRedirect(data);

    } else {

      let currentComponent = this;
      const d = sessionStorage.getItem("zip");
      if (d != "undefined" && d!= null) {
        console.log("cache");
        console.log(d);
        currentComponent.setState({
          postalCode: d,
          check: null,
          cityName: null,
          stateCode: null,
          aqiCode: null,
          weatherCode: null,
          weatherIcon: [null, null, null, null, null],
          weatherTemp: [null, null, null, null, null],
          weatherMinTemp: [null, null, null, null, null],
          weatherMaxTemp: [null, null, null, null, null],
          date: [null, null, null, null, null],
        }, () => {
          currentComponent.retrieveDataFromPostal()
        });


        return;

      }
      console.log("Loading");
      if ("geolocation" in navigator) {
        console.log("OK");
        console.log(navigator["geolocation"])
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log(position);
          var url = "https://nominatim.openstreetmap.org/reverse?format=json&lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&zoom=18&addressdetails=1";
          fetch(url).then((response) => response.json()).then((data) => {
              console.log(data.address);
              let newPostalCode = data.address.postcode;
              if (parseInt(newPostalCode) == 90045) {
                newPostalCode = (parseInt(newPostalCode) + 12).toString();
              }
              if (parseInt(newPostalCode) == 90095) {
                newPostalCode = (parseInt(newPostalCode) - 70).toString();
              }
              currentComponent.setState({
                postalCode: newPostalCode,
                check: null,
                cityName: null,
                stateCode: null,
                aqiCode: null,
                weatherCode: null,
                weatherIcon: [null, null, null, null, null],
                weatherTemp: [null, null, null, null, null],
                weatherMinTemp: [null, null, null, null, null],
                weatherMaxTemp: [null, null, null, null, null],
                date: [null, null, null, null, null],
              }, () => {
                currentComponent.retrieveDataFromPostal()
              });
          }).then(() => {
            sessionStorage.setItem("zip", currentComponent.state.postalCode);

          });

        }, function(error) {
          currentComponent.setState({
            postalCode: "90006",
            check: null,
            cityName: null,
            stateCode: null,
            aqiCode: null,
            weatherCode: null,
            weatherIcon: [null, null, null, null, null],
            weatherTemp: [null, null, null, null, null],
            weatherMinTemp: [null, null, null, null, null],
            weatherMaxTemp: [null, null, null, null, null],
            date: [null, null, null, null, null],
          }, () => {
            currentComponent.retrieveDataFromPostal()
          });

        });

      } else {
        console.log("deafult");
        currentComponent.setState({
          postalCode: "90006",
          check: null,
          cityName: null,
          stateCode: null,
          aqiCode: null,
          weatherCode: null,
          weatherIcon: [null, null, null, null, null],
          weatherTemp: [null, null, null, null, null],
          weatherMinTemp: [null, null, null, null, null],
          weatherMaxTemp: [null, null, null, null, null],
          date: [null, null, null, null, null],
        }, () => {
          currentComponent.retrieveDataFromPostal()
        });
      }
    }


  }

  handleRedirect(data) {
    console.log(data);
    let parsedData = parseInt(data);
    if (parsedData == 90045) {
      parsedData = parsedData + 12;
    }
    console.log(parsedData);
    this.setState({
      postalCode: parsedData.toString()
    }, () => {
      let parsed = parseInt(this.state.postalCode);

      if (isNaN(parsed)){

        this.retrieveDataFromCity(this.state.postalCode);
      }else{
        try {
          this.retrieveDataFromPostal(this.state.postalCode);
        } catch (e) {
          alert("Not a valid zipcode");

        }
      }
      this.setState({ postalCode: "" });
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let parsed = parseInt(this.state.postalCode);

    if (isNaN(parsed)){
      this.retrieveDataFromCity(this.state.postalCode);
    }else{
      try {
        this.retrieveDataFromPostal(this.state.postalCode);
      } catch (e) {
        alert("Not a valid zipcode");

      }
    }

    this.setState({ postalCode: "" });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };


  render() {

    const urlchange = "https://widget.airnow.gov/aq-dial-widget/?city="+this.state.cityName+"&state="+this.state.stateCode+"&country=USA&transparent=true"
    if (this.loading) {
      return (

            <div className="d-flex align-items-center justify-content-center text-center min-vh-100">

                  <Spinner animation="border" className="loader" role="status"> <span className="visually-hidden">Loading...</span> </Spinner>

            </div>

      )
    } else {
      console.log("success!");
    }

    const days = { 0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday"}

    return (

      <Container className="dashboard" fluid>

        <Row className="cards">


          <Col xs={12} md={12} lg={4} xl={4} align="center">

            <Card className="shadow card">
            <Card.Body className="cardBody d-flex">
                <Card.Title className="cardTitle">Current Air Quality</Card.Title>
                  <hr/>
                  <Container fluid>
                    <iframe className="iframe_rss" height="300" src= {urlchange} width="230" ></iframe>
                  </Container>
              </Card.Body>
            </Card>


          </Col>


          <Col xs={12} md={12} lg={6} xl={6} align="center">
          <Card className="shadow card-weather">
            <Card.Body className="cardBody d-flex">
                <Card.Title className="cardTitle">Weather Forecast</Card.Title>
                <hr/>
                <Container fluid>
                <Row>
                  <Col>
                      <h3 className="loc_text"> Location: {this.state.cityName}, {this.state.stateCode}</h3>
                  </Col>
                </Row>

                <Row className="weatherRow" xs={1} s={1} md={1} lg={1} xl={3}>
                  <Col className="weatherCol">
                    <Container className="firstweatherContainer" fluid>

                      <div>
                        <b> {days[new Date(this.state.date[0]).getDay()]}</b>
                      </div>
                      <img
                        id="aq-weather-icon"
                        src={
                          "/weather-icons/" + this.state.weatherIcon[0] + ".png"
                        }
                        alt="weather-icon"
                      />

                      <strong>{this.state.weatherTemp[0]}&#8457;</strong>
                      <div>H: {this.state.weatherMaxTemp[0]}&#8457;<br/> L: {this.state.weatherMinTemp[0]}&#8457;</div>

                    </Container>
                  </Col>
                  <Col className="weatherCol">
                  <Container className="weatherContainer" fluid>
                    <div>
                      <b> {days[new Date(this.state.date[1]).getDay()]}</b>
                    </div>
                    <img
                      id="aq-weather-icon"
                      src={
                        "/weather-icons/" + this.state.weatherIcon[1] + ".png"
                      }
                      alt="weather-icon"
                    />
                    <strong>{this.state.weatherTemp[1]}&#8457;</strong>

                    <div>H: {this.state.weatherMaxTemp[1]}&#8457;<br/> L: {this.state.weatherMinTemp[1]}&#8457;</div>
                    </Container>
                  </Col>

                  <Col className="weatherCol">
                  <Container className="weatherContainer" fluid>
                    <div>
                      <b> {days[new Date(this.state.date[2]).getDay()]}</b>
                    </div>
                    <img
                      id="aq-weather-icon"
                      src={
                        "/weather-icons/" + this.state.weatherIcon[2] + ".png"
                      }
                      alt="weather-icon"
                    />
                      <strong>{this.state.weatherTemp[2]}&#8457;</strong>
                      <div>H: {this.state.weatherMaxTemp[2]}&#8457; <br/> L: {this.state.weatherMinTemp[2]}&#8457;</div>
                    </Container>
                  </Col>

                </Row>
                </Container>
              </Card.Body>
            </Card>
            </Col>
      </Row>
      <Row className="cards">
      <Col xs={12} md={12} lg={12} xl={12} align="center">
        <Card className="shadow card">
        <Card.Body className="cardBodyRSS d-flex">
            <Card.Title className="cardTitle">Weather News</Card.Title>
              <hr/>
              <Container fluid>
              <iframe className="iframe_rss" width="100%" height="100%" src="https://rss.app/embed/v1/wall/AIl1qD7RqZ9vaTEc" scrolling="yes" frameborder="0"></iframe>
              </Container>
          </Card.Body>
        </Card>


      </Col>
      </Row>



      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setAirQuality: (didLoad) => dispatch(setAirQuality(didLoad)),
});

export default Hourly;
