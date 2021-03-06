import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';


import AirQualityLineChart from "./graphs/airqualitylinechart.component.jsx";
import EmissionsLinechart from "./graphs/emissionlinechart.component.jsx";
import OpenWeatherMapHistorical from './graphs/historical/openweathermap-historical.component.jsx';
import BroadwayHistorical from './graphs/historical/broadway-historical.component.jsx';
import MemorialColiseumHistorical from './graphs/historical/memorialcoliseum-historical.component'
import OpenWeatherMapLive from './graphs/live/openweathermap-live.component.jsx';
import BroadwayLive from './graphs/live/broadway-live.component.jsx';
import MemorialColiseumLive from './graphs/live/memorialcoliseum-live.component.jsx';
import BarChart from "./graphs/barchart.component.jsx";
import LincolnHeightsLive from './graphs/live/lincolnheights-live.component.jsx';
import LincolnHeightsHistorical from './graphs/historical/lincolnheights-historical.component.jsx';
import MagnoliaLive from './graphs/live/magnolia-live.component.jsx';
import MagnoliaHistorical from './graphs/historical/magnolia-historical.component.jsx';
import "./dashboard.css"

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            key: 'General'
        }
    }

    changeKey(newKey) {
        this.setState({key: newKey})
    }

    render() {

        return (
            <div class="container mt-3 background  ">
                <div class="center" class="title" className="col-12">
                    <Tabs defaultActiveKey={
                            this.state.key
                        }
                        activeKey={
                            this.state.key
                        }
                        onSelect={
                            (k) => this.changeKey(k)
                    }>
                        <Tab eventKey='General' title='General Los Angeles'><OpenWeatherMapLive/></Tab>
                        <Tab eventKey='Broadway' title='3rd and Broadway'><BroadwayLive/></Tab>
                        <Tab eventKey='Coliseum' title='Memorial Coliseum'><MemorialColiseumLive/></Tab>
                        <Tab eventKey='Lincoln' title='Lincoln Heights'><LincolnHeightsLive/></Tab>
                        <Tab eventKey='Magnolia' title='7th and Magnolia'><MagnoliaLive/></Tab>
                    </Tabs>
                </div>

                <br/>
                <br/>
                <br/>



                <div class="center "className="col-12">
                    <Tabs defaultActiveKey={
                            this.state.key
                        }
                        activeKey={
                            this.state.key
                        }
                        onSelect={
                            (k) => this.changeKey(k)
                    }>
                
                        <Tab eventKey='General' ><OpenWeatherMapHistorical/></Tab>
                        <Tab eventKey='Broadway'><BroadwayHistorical/></Tab>
                        <Tab eventKey='Coliseum' ><MemorialColiseumHistorical/></Tab>
                        <Tab eventKey='Lincoln' ><LincolnHeightsHistorical/></Tab> 
                        <Tab eventKey='Magnolia'><MagnoliaHistorical/></Tab>

                    </Tabs>
                </div>
                <br/>
                <br/>
                <br/>


                <div class="center " className="col-12">
                <AirQualityLineChart/>
                </div>
                <br/>
                <br/>

            </div>
        );
    }
}
