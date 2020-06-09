import React from 'react';
import { Container, Modal, Card, Button, ListGroup, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux';
import Moment from 'moment';
import { history } from '../history';

class SelectedFlightModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            f1: {},
            f2: {},
            index: 0
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ index: nextProps.indexofpost })
        console.log("nextProps msg:" + JSON.stringify(nextProps.indexofpost))
        console.log("nextProps msg:" + JSON.stringify(nextProps))
        if (nextProps.postsdata.posts.length > 0) {
            this.setState({ f1: nextProps.postsdata.posts[nextProps.indexofpost].f1 })
            this.setState({ f2: nextProps.postsdata.posts[nextProps.indexofpost].f2 })
        }
    }

    handlePurchaseTicket = () => {

        history.push('/PurchaseTicketPage');
    }

    render() {

        const { dispatch, ...rest } = this.props
        Moment.locale('en');
        let dtd1 = this.state.f1.REAL_DEPARTURE_TIME;
        let dtl1 = this.state.f1.REAL_LANDING_TIME;
        let dtd2 = this.state.f2.REAL_DEPARTURE_TIME;
        let dtl2 = this.state.f2.REAL_LANDING_TIME;
        const now1 = Moment(dtd1);
        const expiration1 = Moment(dtl1);
        const diff1 = expiration1.diff(now1);
        const now2 = Moment(dtd2);
        const expiration2 = Moment(dtl2);
        const diff2 = expiration2.diff(now2);
      
        return (

            <Modal
                {...rest}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <Container>
                        <div className="text-center">
                            <Row>
                                <Col md={6}>  <Card className="text-left">
                                    <Card.Header style={{ background: '#ffb366' }}>Outbound flight&nbsp;&nbsp;<i className="fa fa-plane"></i></Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item style={{ background: '#fff2e6' }}><h5>Airline company:</h5>{this.state.f1.AIRLINE_NAME}</ListGroup.Item>
                                        {/* <ListGroup.Item style={{ background: '#fff2e6' }}><h5>Flight ID:</h5>{this.state.f1.ID}</ListGroup.Item> */}
                                        <ListGroup.Item style={{ background: '#fff2e6' }}><h5>Flight number:</h5>{this.state.f1.FLIGHT_NUMBER}</ListGroup.Item>
                                        <ListGroup.Item style={{ background: '#fff2e6' }}><h5>From:</h5>{this.state.f1.O_COUNTRY_NAME}</ListGroup.Item>
                                        <ListGroup.Item style={{ background: '#fff2e6' }}><h5>Departure date:</h5>{Moment(dtd1).format('MMMM dddd Do YYYY, HH:mm:ss')}</ListGroup.Item>
                                        <ListGroup.Item style={{ background: '#fff2e6' }}><h5>To:</h5>{this.state.f1.D_COUNTRY_NAME}</ListGroup.Item>
                                        <ListGroup.Item style={{ background: '#fff2e6' }}><h5>Arrival date:</h5>{Moment(dtl1).format('MMMM dddd Do YYYY, HH:mm:ss')}</ListGroup.Item>
                                        <Card.Footer className="text-muted"><h5>Flight duration:</h5><h6>{Moment(diff1).format('HH:mm')}&nbsp;hours</h6></Card.Footer>
                                    </ListGroup>
                                </Card></Col>
                                <Col md={6}>  <Card className="text-left">
                                    <Card.Header style={{ background: '#ffb366' }}>Return flight&nbsp;&nbsp;<i className="fa fa-plane"></i></Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item style={{ background: '#fff2e6' }}><h5>Airline company:</h5>{this.state.f2.AIRLINE_NAME}</ListGroup.Item>
                                        {/* <ListGroup.Item style={{ background: '#fff2e6' }}><h5>Flight ID:</h5>{this.state.f2.ID}</ListGroup.Item> */}
                                        <ListGroup.Item style={{ background: '#fff2e6' }}><h5>Flight number:</h5>{this.state.f2.FLIGHT_NUMBER}</ListGroup.Item>
                                        <ListGroup.Item style={{ background: '#fff2e6' }}><h5>From:</h5>{this.state.f2.O_COUNTRY_NAME}</ListGroup.Item>
                                        <ListGroup.Item style={{ background: '#fff2e6' }}><h5>Departure date:</h5>{Moment(dtd2).format('MMMM dddd Do YYYY, HH:mm:ss')}</ListGroup.Item>
                                        <ListGroup.Item style={{ background: '#fff2e6' }}><h5>To:</h5>{this.state.f2.D_COUNTRY_NAME}</ListGroup.Item>
                                        <ListGroup.Item style={{ background: '#fff2e6' }}><h5>Arrival date:</h5>{Moment(dtl2).format('MMMM dddd Do YYYY, HH:mm:ss')}</ListGroup.Item>
                                        <Card.Footer className="text-muted"><h5>Flight duration:</h5><h6>{Moment(diff2).format('HH:mm')}&nbsp;hours</h6></Card.Footer>
                                    </ListGroup>
                                </Card> </Col>
                            </Row>
                            <Row>
                                <Col md={12}><Button variant="primary" className="text-center" style={{ marginTop: 10 }} onClick={this.handlePurchaseTicket}>Continue</Button></Col>
                            </Row>
                        </div>
                    </Container>
                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {

    console.log("mapStateToProps: state= " + JSON.stringify(state.posts));

    return {
        postsdata: state.postsData

    }
}
export default connect(mapStateToProps)(SelectedFlightModal);