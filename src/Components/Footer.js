import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

const Styles = styled.div`
    h4 {
        color: #738076;
        font-size: 1.5em;
    }
    .main-footer {
        padding-top: 4em;
        background-color: black;
        max-width: 100%;
        position:absolute;


    }
    .linkItem {
        color: white;
        text-decoration: none;
    }

    .col-sm {
        color: white;
    }

    .hrClass {
      border-top: 2px solid white;
    }
`;


function Footer(props) {


    return (
        <Styles>
            <Container className="main-footer">
                <Container>
                    <Row>
                        <Col>
                            <h4>Air Quality</h4>
                            <ul className="list-unstyled">
                                <li><a className="linkItem" href="/">Home</a></li>
                                <li><a className="linkItem" href="/MapForecast">Forecast</a></li>
                                <li><a className="linkItem" href="/airqualitymap">Live Air Quality Map</a></li>
                            </ul>
                        </Col>

                        <Col>
                            <h4>News</h4>
                            <ul className="list-unstyled">
                                <li><a className="linkItem" href="/publications">Publications</a></li>

                                <li><a className="linkItem" href="https://www.calstatela.edu/research/data-science">Team</a></li>
                            </ul>
                        </Col>
                    </Row>
                    <hr className="hrClass" />
                    {/*
                        <Row>
                            <p className="col-sm">
                                &copy;{new Date().getFullYear()} Kabir Nagrecha. All Rights Reserved. Contact at knagrech@ucsd.edu.
                            </p>
                        </Row>
    */}
                </Container>
            </Container>

        </Styles>
    )
}

export default Footer;
