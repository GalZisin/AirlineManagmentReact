import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
import '../../AddEdit.css'
import { bindActionCreators } from 'redux'
import { addUserAction } from '../../../../actions/user.actions'
import { connect } from 'react-redux';
import Select from 'react-select';

class AddFlight extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            ID: '',
            FLIGHT_NUMBER: '',
            AIRLINECOMPANY_ID: '',
            AIRLINE_NAME: '',
            O_COUNTRY_NAME: '',
            D_COUNTRY_NAME: '',
            REAL_DEPARTURE_TIME: '',
            REAL_LANDING_TIME: '',
            REMANING_TICKETS: '',
            TOTAL_TICKETS: '',
            countries: [],
            defaultOriginCountry: null,
            defaultDestinationCountry: null
        }


        if (this.props.flight.ID) {
            let defaultOriginCountry1 = { value: this.props.flight.ORIGIN_COUNTRY_CODE, label: this.props.flight.O_COUNTRY_NAME }
            let defaultDestinationCountry1 = { value: this.props.flight.ORIGIN_COUNTRY_CODE, label: this.props.flight.D_COUNTRY_NAME }
            this.state = this.props.flight
            this.state.countries = this.props.countries;
            this.state.defaultOriginCountry = defaultOriginCountry1;
            this.state.defaultDestinationCountry = defaultDestinationCountry1;
            this.state.AIRLINE_NAME = this.props.auth.user
        }
        else {
            this.state = this.initialState;
            this.state.countries = this.props.countries;
            this.state.AIRLINE_NAME = this.props.auth.user
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

    onChangeOriginCountry = (selectedCountry) => {
        this.setState({ O_COUNTRY_NAME: selectedCountry.label })
    };

    onChangeDestinationCountry = (selectedCountry) => {
        this.setState({ D_COUNTRY_NAME: selectedCountry.label })
    };

    handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }


    handleSubmit(event) {
        event.preventDefault();

        // console.log("HandleSubmite props.auth: " + JSON.stringify(this.props.auth))
        console.log("HandleSubmite: " + JSON.stringify(this.state))

        this.props.onFormSubmit(this.state);
        this.setState(this.initialState);
    }



    render() {
        const { user } = this.props.auth;
        let pageTitle;
        let actionStatus;
        if (this.state.ID) {

            pageTitle = 'Edit Flight'
            actionStatus = 'Update'
        } else {
            pageTitle = 'Add Flight'
            actionStatus = 'Save'
        }

        return (
            <div className="marginLeftDiv">
                <Button variant="primary" style={{ borderRadius: 0 }} onClick={this.props.ListView}> Flight Details</Button>
                <h2> {pageTitle}</h2>
                <div className="divStyle">
                    <Row>
                        <Col className="formStyle" sm={5}>
                            <Form onSubmit={this.handleSubmit}>

                                <Form.Group controlId="Company Name">
                                    <Form.Label>Airline Company Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="AIRLINE_NAME1"
                                        defaultValue={user}
                                        /* onChange={this.handleChange} */
                                        placeholder="Company Name"
                                        disabled
                                        required />
                                </Form.Group>

                                <Form.Group controlId="Flight Number">
                                    <Form.Label>Flight Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="FLIGHT_NUMBER"
                                        defaultValue={this.state.FLIGHT_NUMBER}
                                        onChange={this.handleChange}
                                        placeholder="Flight Number"
                                        required />
                                </Form.Group>

                   
                                <Form.Group controlId="Origin Country Name" style={{ color: 'black', fontWeight: 600 }} >
                                    <Form.Label style={{ color: 'white' }} >Origin Country Name</Form.Label>

                                    <Select options={this.Country()}
                                        type="text"
                                        onChange={this.onChangeOriginCountry}
                                        placeholder="Origin Country Name"
                                        defaultValue={this.state.defaultOriginCountry}
                                    />

                                </Form.Group>

                                <Form.Group controlId="Destination Country Name" style={{ color: 'black', fontWeight: 600 }} >
                                    <Form.Label style={{ color: 'white' }} >Destination Country Name</Form.Label>

                                    <Select options={this.Country()}
                                        type="text"
                                        onChange={this.onChangeDestinationCountry}
                                        placeholder="Destination Country Name"
                                        defaultValue={this.state.defaultDestinationCountry}
                                    />

                                </Form.Group>

                                <Form.Group controlId="Departure Date">
                                    <Form.Label>Departure Date</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="REAL_DEPARTURE_TIME"
                                        defaultValue={this.state.REAL_DEPARTURE_TIME}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="Landing Date">
                                    <Form.Label>Landing Date</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="REAL_LANDING_TIME"
                                        defaultValue={this.state.REAL_LANDING_TIME}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="Remaining Tickets">
                                    <Form.Label>Remaining Tickets</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="REMANING_TICKETS"
                                        defaultValue={this.state.REMANING_TICKETS}
                                        onChange={this.handleChange}
                                        placeholder="Remaining Tickets"
                                        required />
                                </Form.Group>

                                <Form.Group controlId="Total Tickets">
                                    <Form.Label>Total Tickets</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="TOTAL_TICKETS"
                                        defaultValue={this.state.TOTAL_TICKETS}
                                        onChange={this.handleChange}
                                        placeholder="Total Tickets"
                                        required />
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
const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
};
function mapDispatchToProps(dispatch) {
    return {
        addUserAction: bindActionCreators(addUserAction, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFlight);

