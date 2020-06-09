import React from 'react';
// import styled from 'styled-components';
import '../../components/linkButton.css'
import './Footer.css'
import { Container, Row, Col } from 'react-bootstrap'
function Footer() {

  return (

    <section id="footer" className="py-4" style={{marginTop: 100}}>

      <Container>
        <Row className="justify-content-center">
          <Col xs="auto" md={6} lg={6}>
            <div className="services">
              <h4>Additional services</h4>
              <div className="flex d-flex ">
                <i className="fa fa-check mr-4 align-self-start "></i>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur
              adipisicing elit.</p>
              </div>
              <div className="flex d-flex ">
                <i className="fa fa-check mr-4 align-self-start "></i>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur
              adipisicing elit.</p>
              </div>
              <div className="flex d-flex ">
                <i className="fa fa-check mr-4 align-self-start "></i>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur
              adipisicing elit.</p>
              </div>
            </div>

            <div className="footer-icons">
              <a href="#facebook" className="mx-2"><i className="fab fa-facebook"></i></a>
              <a href="#twitter" className="mx-2"><i className="fab fa-twitter"></i></a>
              <a href="#instagram" className="mx-2"><i className="fab fa-instagram"></i></a>
              <a href="#linkedin" className="mx-2"><i className="fab fa-linkedin"></i></a>
            </div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6}> 
            <h4 className="services">Our Location</h4>
            <iframe title="frame"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26919.1402456562!2d34.94345568670439!3d32.50230143132708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d0c4c2bca8fb7%3A0x3edf7e9243cf880a!2z15DXldeoINei16fXmdeR15A!5e0!3m2!1siw!2sil!4v1588803286269!5m2!1siw!2sil"
              style={{
                border: '0',
                width: '100%',
                height: '315px',
                frameborder: '0'
              }}
              allowFullScreen
            />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md="auto" xs="auto">
            <p className="text-xs-center">
              &copy;{new Date().getFullYear()} Airline Flight Management App - All Rights
              Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
export default Footer;