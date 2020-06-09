import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
import '../../AddEdit.css'
import Select from 'react-select';

class AddCompany extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            ID: '',
            AIRLINE_NAME: '',
            USER_NAME: '',
            PASSWORD: '',
            // EMAIL: '',
            COUNTRY_CODE: '',
            COUNTRY_NAME: '',
            countries: [],
            defaultCountry: null
        }

        if (this.props.company.ID) {
            let defaultCountry1 = { value: this.props.company.COUNTRY_CODE, label: this.props.company.COUNTRY_NAME }
            this.state = this.props.company
            this.state.countries = this.props.countries;
            this.state.defaultCountry = defaultCountry1;

        } else {
            this.state = this.initialState;
            this.state.countries = this.props.countries;
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }
    Country() {
        return (this.state.countries.map(data => ({ label: data.COUNTRY_NAME, value: data.ID })))
    }
    onChangeCountry = (selectedCountry) => {
        this.setState({ COUNTRY_NAME: selectedCountry.label })
    };

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

            pageTitle = 'Edit Company'
            actionStatus = 'Update'
        } else {
            pageTitle = 'Add Company'
            actionStatus = 'Save'
        }

        return (
            <div className="marginLeftDiv">
                <Button variant="primary" style={{ borderRadius: 0 }} onClick={this.props.ListView}> Company Details</Button>
                <h2> {pageTitle}</h2>
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

                                {/* <Form.Group controlId="Email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        defaultValue={this.state.EMAIL}
                                        onChange={this.handleChange}
                                        placeholder="Email" />
                                </Form.Group> */}

                                <Form.Group controlId="Country Name" style={{ color: 'black', fontWeight: 600 }} >
                                    <Form.Label style={{ color: 'white' }} >Country Name</Form.Label>

                                    <Select options={this.Country()}
                                        type="text"
                                        onChange={this.onChangeCountry}
                                        placeholder="Country Name"
                                        defaultValue={this.state.defaultCountry}
                                    />

                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="hidden" name="ID" value={this.state.ID} />
                                    <Button style={{ borderRadius: 0 }} variant="success" type="submit">{actionStatus}</Button>
                                </Form.Group>

                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default AddCompany;