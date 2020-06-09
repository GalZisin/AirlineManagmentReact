import React, { Component } from 'react';
import FlightView from './FlightView';
import AddTickets from './AddTickets'
import { Container, Row, Col } from 'react-bootstrap'

class PurchaseTicketPage extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={6}>
                            <FlightView />
                        </Col>
                        <Col md={6} >
                            <AddTickets />
                        </Col>
                    </Row>
                </Container>
                <div style={{ marginTop: 50 }}></div>
            </div>
        );
    }
}
export default PurchaseTicketPage;