import React, { Component } from "react";
// import Carousel from 'react-bootstrap/Carousel'
import SlideImg from './para.jpg';
import "../../node_modules//react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from '../../node_modules/react-responsive-carousel';
import { Row, Col } from 'react-bootstrap';
class MyCarousel extends Component {
  render() {
    return (
      <Row className="justify-content-center" style={{ marginLeft: 0, marginRight: 0 }}>
        <Col md={6} lg={6}>
          <Carousel>
            <div>
              <img src={SlideImg} />
              {/* <p className="legend">Legend 1</p> */}
            </div>
            <div>
              <img src={SlideImg} />
              {/* <p className="legend">Legend 2</p> */}
            </div>
            <div>
              <img src={SlideImg} />
              {/* <p className="legend">Legend 3</p> */}
            </div>
          </Carousel>
        </Col>
      </Row>
    );
  }
}
export default MyCarousel;