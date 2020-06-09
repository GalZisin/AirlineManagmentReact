import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
import '../../AddEdit.css'

class AddCustomer extends React.Component {

    constructor(props) {
        super(props);

        this.initialState = {
            ID: '',
            FIRST_NAME: '',
            LAST_NAME: '',
            EMAIL: '',
            USER_NAME: '',
            PASSWORD: '',
            ADDRESS: '',
            PHONE_NO: '',
            CREDIT_CARD_NUMBER: ''
        }
        if (this.props.customer.ID) {
            this.state = this.props.customer
        } else {
            this.state = this.initialState;
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
        let pageTitle;
        let actionStatus;
        if (this.state.ID) {
            pageTitle = 'Edit Customer';
            actionStatus = 'Update';
        } else {
            pageTitle = 'Add Customer';
            actionStatus = 'Save';
        }

        return (
            <div className="marginLeftDiv">
                <Button variant="primary" style={{ borderRadius: 0 }} onClick={this.props.ListView}> Customer Details</Button>
                <h2> {pageTitle}</h2>
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

                                <Form.Group controlId="UserName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="USER_NAME"
                                        defaultValue={this.state.USER_NAME}
                                        onChange={this.handleChange}
                                        placeholder="UserName"
                                        required />
                                </Form.Group>

                                <Form.Group controlId="Password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="PASSWORD"
                                        defaultValue={this.state.PASSWORD}
                                        onChange={this.handleChange}
                                        placeholder="Password"
                                        required />
                                </Form.Group>

                                <Form.Group controlId="Email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        defaultValue={this.state.EMAIL}
                                        onChange={this.handleChange}
                                        placeholder="Email" />
                                </Form.Group>

                                <Form.Group controlId="PhoneNo">
                                    <Form.Label>PhoneNo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="PHONE_NO"
                                        defaultValue={this.state.PHONE_NO}
                                        onChange={this.handleChange}
                                        placeholder="PhoneNo"
                                        required />
                                </Form.Group>

                                <Form.Group controlId="Address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="ADDRESS"
                                        defaultValue={this.state.ADDRESS}
                                        onChange={this.handleChange}
                                        placeholder="Address"
                                        required />
                                </Form.Group>

                                <Form.Group controlId="Credit Card Number">
                                    <Form.Label>Credit card number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="CREDIT_CARD_NUMBER"
                                        defaultValue={this.state.CREDIT_CARD_NUMBER}
                                        onChange={this.handleChange}
                                        placeholder="Credit Card Number"
                                        required />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control type="hidden" name="ID" value={this.state.ID} />
                                    <Button variant="success" type="submit">{actionStatus}</Button>
                                </Form.Group>

                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default AddCustomer;


