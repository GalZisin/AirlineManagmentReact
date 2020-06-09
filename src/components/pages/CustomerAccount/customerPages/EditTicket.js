import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
import '../../AddEdit.css'

class EditTicket extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            ID: '',
            FLIGHT_ID: '',
            FLIGHT_NUMBER: '',
            f1_AIRLINE_NAME: '',
            f2_AIRLINE_NAME: '',
            f1_O_COUNTRY: '',
            f1_D_COUNTRY: '',
            f2_O_COUNTRY: '',
            f2_D_COUNTRY: '',
            f1_REAL_DEPARTURE_TIME: '',
            f1_REAL_LANDING_TIME: '',
            f2_REAL_DEPARTURE_TIME: '',
            f2_REAL_LANDING_TIME: '',
            CUSTOMER_ID: '',
            FIRST_NAME: '',
            LAST_NAME: '',
        }

        if (this.props.ticket.ID) {
            this.state = this.props.ticket
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onFormSubmit(this.state);
        this.setState(this.initialState);
    }
    render() {

        return (
            <div className="marginLeftDiv">
                <Button variant="primary" style={{ borderRadius: 0 }} onClick={this.props.ListView}> Passenger Details</Button>
                <h2>Edit Customer</h2>
                <div className="divStyle">
                <Row>
                    <Col className="formStyle" sm={5}>
                        <Form onSubmit={this.handleSubmit}>

                            <Form.Group controlId="FirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="FIRST_NAME"
                                    defaultValue={this.state.FIRST_NAME}
                                    onChange={this.handleChange}
                                    placeholder="First Name"
                                    required />
                            </Form.Group>

                            <Form.Group controlId="LastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="LAST_NAME"
                                    defaultValue={this.state.LAST_NAME}
                                    onChange={this.handleChange}
                                    placeholder="Last Name"
                                    required />
                            </Form.Group>
                            <Form.Group>

                                <Form.Control type="hidden" name="ID" value={this.state.ID} />
                                <Button style={{ borderRadius: 0 }} variant="success" type="submit">Update</Button>
                            </Form.Group>

                        </Form>
                    </Col>
                </Row>
            </div>
            </div>
        )
    }
}

export default EditTicket;