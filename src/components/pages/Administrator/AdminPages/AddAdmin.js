import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
import '../../AddEdit.css'

class AddAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.initialState = {
            ID: '',
            FIRST_NAME: '',
            LAST_NAME: '',
            USER_NAME: '',
            PASSWORD: ''
        }
        if (this.props.admin.ID) {
            this.state = this.props.admin
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
            pageTitle = 'Edit Admin';
            actionStatus = 'Update';
        } else {
            pageTitle = 'Add Admin';
            actionStatus = 'Save';
        }

        return (
            <div className="marginLeftDiv">
                <Button variant="primary" style={{ borderRadius: 0 }} onClick={this.props.ListView}> Admin Details</Button>
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
                                        placeholder="First Name" />
                                </Form.Group>

                                <Form.Group controlId="LastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="LAST_NAME"
                                        defaultValue={this.state.LAST_NAME}
                                        onChange={this.handleChange}
                                        placeholder="Last Name" />
                                </Form.Group>

                                <Form.Group controlId="UserName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="USER_NAME"
                                        defaultValue={this.state.USER_NAME}
                                        onChange={this.handleChange}
                                        placeholder="UserName" />
                                </Form.Group>

                                <Form.Group controlId="Password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="PASSWORD"
                                        defaultValue={this.state.PASSWORD}
                                        onChange={this.handleChange}
                                        placeholder="Password" />
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

export default AddAdmin;


