import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
import '../../AddEdit.css'

class EditCompany extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            ID: '',
            AIRLINE_NAME: '',
            USER_NAME: '',
            PASSWORD: '',
            EMAIL: '',
            COUNTRY_CODE: ''
        }

        if (this.props.company.ID) {
            this.state = this.props.company
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
                <Button variant="primary" style={{ borderRadius: 0 }} onClick={this.props.ListView}> Company Details</Button>
                <h2>Edit Company</h2>
                <div className="divStyle">
                    <Row>
                        <Col className="formStyle" sm={5}>
                            <Form onSubmit={this.handleSubmit}>

                                <Form.Group controlId="Company Name">
                                    <Form.Label>Airline Company Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="AIRLINE_NAME"
                                        defaultValue={this.state.AIRLINE_NAME}
                                        onChange={this.handleChange}
                                        placeholder="Company Name"
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

                                <Form.Group controlId="Country Code">
                                    <Form.Label>Country Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="COUNTRY_CODE"
                                        defaultValue={this.state.COUNTRY_CODE}
                                        onChange={this.handleChange}
                                        placeholder="Country Code"
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

export default EditCompany;