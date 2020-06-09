import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { addPostAction } from '../actions/posts.action';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import "../components/SearchFlightsBox.css";
import moment from 'moment';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { BaseUrl } from '../constants/BaseUrl'
export const FETCH_POSTS = 'FETCH_POSTS'

class SearchFlights extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flightId: '',
            flightNumber: '',
            originCountry: 'select',
            destinationCountry: 'Select Destination Country',
            company: '',
            departureDate: '',
            returnDate: '',
            FlightsIds: [],
            FlightNumbers: [],
            FlightsCompanies: [],
            FlightsOriginCountries: [],
            FlightsDestinationCountries: [],
            formErrors: {},
            // formIsValid: false,

            addPostAction: addPostAction
        }
    }
    getLocalCountry = () => {
        axios.get('https://ipapi.co/json/')
            .then(res => {
                console.log("local country " + JSON.stringify(res.data.country_name));
                this.setState({ originCountry: res.data.country_name })
            })

            .catch(error => {
                console.log(error)
            })
    }

    getSelectedFlightFromCalendar = () => {
        let selectedFlightData = localStorage.getItem('selectedFlightData');

        if (selectedFlightData !== null) {
            let selectedFlightData1 = JSON.parse(selectedFlightData)
            console.log("selectedFlightData: " + selectedFlightData)
            let departureFlightFormat = moment(selectedFlightData1.departureFlight).format('DD/MM/YYYY')
            let returnFlightFormat = moment(selectedFlightData1.returnFlight).format('DD/MM/YYYY')


            var dateObj = new Date(selectedFlightData1.departureFlight);
            var myDate = moment(dateObj);
            console.log("myDate: " + myDate)
            this.setState({
                departureDate: moment(departureFlightFormat, 'DD/MM/YYYY').toDate(),
                returnDate: moment(returnFlightFormat, 'DD/MM/YYYY').toDate(),
                destinationCountry: selectedFlightData1.destinationCountry,
                company: selectedFlightData1.companyName,
                originCountry:selectedFlightData1.originCountry
            })
            localStorage.removeItem('selectedFlightData');
            setTimeout(() => {
                this.onSearchClick();
            }, 300);
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.getLocalCountry();
        localStorage.removeItem('posts');
        localStorage.removeItem('postId');
        axios.get(BaseUrl.url + '/api/AnonymousFacade/getgrupedbyflightsbyvacancy')
            .then(res => {
                console.log(res);
                this.setState({
                    FlightsIds: res.data.ids,
                    FlightNumbers: res.data.flightNumbers,
                    FlightsCompanies: res.data.companies,
                    FlightsOriginCountries: res.data.originCountries,
                    FlightsDestinationCountries: res.data.destinationCountries
                });
                console.log(JSON.stringify(res.data));
                this.getSelectedFlightFromCalendar();

            });

    }

    onSearchClick = () => {
        console.log("BaseUrl.url: " + BaseUrl.url)
        
        let dd = moment(this.state.departureDate).format('YYYY-MM-DD');
        let rr = moment(this.state.returnDate).format('YYYY-MM-DD');
        console.log("dd: " + dd)
        console.log("rr: " + rr)
        console.log("this.state.departureDate: " + this.state.departureDate)
        console.log("this.state.returnDate: " + this.state.returnDate)
        // yyyy-MM-dd
        // url = 'http://localhost:57588/api/AnonymousFacade/getflightsbyvacancy/search', {params: {flightId: this.state.flightId, originCountry: this.state.originCountry, destinationCountry: this.state.destinationCountry, airlineCompany: this.state.airlineCompany, date: this.state.date}}
        let url = BaseUrl.url + `/api/AnonymousFacade/getflightsbyvacancy/search?flightNumber=${this.state.flightNumber}&originCountry=${this.state.originCountry}&destinationCountry=${this.state.destinationCountry}&company=${this.state.company}&departureDate=${dd}&returnDate=${rr}`;
        console.log("url: " + url)
        axios.get(url)
            .then(res => {
                console.log("res= " + JSON.stringify(res.data));

                this.props.addPostAction(res.data);
                let posts = JSON.stringify(res.data);

                if (localStorage.getItem("posts") !== null) {
                    localStorage.removeItem("posts")
                }
                localStorage.setItem('posts', posts);
                // let posts2 = localStorage.getItem('posts');
                // console.log("put posts to local storage: " + posts2)
            })

            .catch(error => {
                console.log(error)
            })
    }

    handleFormValidation() {
        const { originCountry, destinationCountry, departureDate, returnDate } = this.state;
        let formErrors = {};
        let formIsValid = true;


        //origin country   
        if (originCountry === '' || originCountry === "select") {
            formIsValid = false;
            formErrors["oCountryErr"] = "Select origin country.";
        }

        //Destination country   
        if (destinationCountry === '' || destinationCountry === "Select Destination Country" || destinationCountry === "select") {
            formIsValid = false;
            formErrors["dCountryErr"] = "Select destination country.";
        }

        //Departure Date    
        if (!departureDate) {
            formIsValid = false;
            formErrors["dodErr"] = "Date of departure required.";
        }
        //Return Date    
        if (!returnDate) {
            formIsValid = false;
            formErrors["dorErr"] = "Date of return required.";
        }

        this.setState({ formErrors: formErrors });
        return formIsValid;
    }


    // onChangeFlightId = (e) => {
    //     this.setState({ flightId: e.target.value });
    // };
    onChangeFlightNumber = (e) => {
        this.setState({ flightNumber: e.target.value });
    };
    onChangeAirlineCompany = (e) => {
        this.setState({ company: e.target.value });
    };
    onChangeOriginCountry = (e) => {
        console.log("e: " + e.target.value)
        this.setState({ originCountry: e.target.value });
        if (e.target.value !== '' && e !== null && e.target.value !== 'select') {
            this.state.formErrors["oCountryErr"] = "";
        }
        else {
            this.state.formErrors["oCountryErr"] = "Select origin country.";
        }
    };
    onChangeDestinationCountry = (e) => {
        this.setState({ destinationCountry: e.target.value });
        if (e.target.value !== '' && e !== null && e.target.value !== 'select') {
            this.state.formErrors["dCountryErr"] = "";
        }
        else {
            this.state.formErrors["dCountryErr"] = "Select destination country.";
        }
    };

    onChangeDepartureDate = (e) => {
        console.log("datepicker change: " + e)
        this.setState({ departureDate: e });
        if (e !== null && e !== '') {

            this.state.formErrors["dodErr"] = '';
        }
        else {
            this.state.formErrors["dodErr"] = 'Date of departure required.';
        }
    };
    onChangeReturnDate = (e) => {
        this.setState({ returnDate: e });
        if (e !== null && e !== '') {

            this.state.formErrors["dorErr"] = '';
        }
        else {
            this.state.formErrors["dorErr"] = "Date of return required.";;
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.handleFormValidation()) {
            this.onSearchClick();
        }
    }

    render() {
        const { oCountryErr, dCountryErr, dorErr, dodErr } = this.state.formErrors;
        return (
            <Container style={{ marginTop: 150, width: '100%' }} >
                <form onSubmit={this.handleSubmit}>
                    <Card className="cardStyle1 box">
                        <Row className="justify-content-center">
                            <Col xs={12} sm={3} md={{ span: 5, offset: 0 }} lg={{ span: 3, offset: 0 }}>
                                <div className="form-group" style={{ marginTop: 15 }}>
                                    <select
                                        name="flightNumber"
                                        onChange={this.onChangeFlightNumber}
                                        value={this.state.flightNumber}
                                    >
                                        <option value="">Select Flight Number</option>
                                        {this.state.FlightNumbers.map((e, key) => {
                                            return <option key={key} value={e.flightNumber}>{e}</option>;
                                        })}
                                    </select>
                                </div>
                            </Col>
                            <Col xs={12} sm={3} md={{ span: 5, offset: 0 }} lg={{ span: 3, offset: 0 }}>
                                <div className="form-group" style={{ marginTop: 15 }}>
                                    <select

                                        name="company"
                                        onChange={this.onChangeAirlineCompany}
                                        value={this.state.company}
                                    >
                                        <option className="optionW" defaultValue={this.state.company} value="select">Select Airline Company</option>
                                        {this.state.FlightsCompanies.map((e, key) => {
                                            return <option key={key} value={e.company}>{e}</option>;
                                        })}
                                    </select>

                                </div>
                            </Col>
                            <Col xs={12} sm={3} md={{ span: 5, offset: 0 }} lg={{ span: 3, offset: 0 }}>
                                <div className="form-group" style={{ marginTop: 15 }}>
                                    <select
                                        name="oCountry"
                                        onChange={this.onChangeOriginCountry}
                                        value={this.state.originCountry}
                                        className={oCountryErr ? ' showError' : ''}
                                    >
                                        <option defaultValue={this.state.originCountry} value="select">Select Origin Country</option>
                                        {this.state.FlightsOriginCountries.map((e, key) => {
                                            return <option key={key} value={e.originCountry}>{e}</option>;
                                        })}
                                    </select>
                                    {oCountryErr &&
                                        <div style={{ color: "white", paddingBottom: 15 }}>{oCountryErr}</div>
                                    }
                                </div>
                            </Col>
                            <Col xs={12} sm={3} md={{ span: 5, offset: 0 }} lg={{ span: 3, offset: 0 }}>
                                <div className="form-group" style={{ marginTop: 15 }}>
                                    <select
                                        name="dCountry"
                                        onChange={this.onChangeDestinationCountry}
                                        value={this.state.destinationCountry}
                                        className={dCountryErr ? ' showError' : ''}
                                    >
                                        <option defaultValue={this.state.destinationCountry} value="select">Select Destination Country</option>
                                        {this.state.FlightsDestinationCountries.map((e, key) => {
                                            return <option key={key} value={e.destinationCountry}>{e}</option>;
                                        })}
                                    </select>
                                    {dCountryErr &&
                                        <div style={{ color: "white", paddingBottom: 15 }}>{dCountryErr}</div>
                                    }
                                </div>
                            </Col>
                            <Col xs={12} sm={3} md={{ span: 5, offset: 0 }} lg={{ span: 3, offset: 1 }}>
                                <div style={{ marginTop: 15 }}>
                                    <DatePicker
                                        selected={this.state.departureDate}
                                        placeholderText="Departure Date"
                                        showPopperArrow={false}
                                        onChange={this.onChangeDepartureDate}
                                        dateFormat='dd/MM/yyyy'
                                        minDate={new Date()}
                                        isClearable
                                        showMonthDropdown
                                        id={this.state.date_picker_id}
                                        className={dodErr ? 'showError' : ''}
                                    />
                                    {dodErr &&
                                        <div style={{ color: "white", paddingBottom: 10 }}>{dodErr}</div>
                                    }
                                </div>
                            </Col>
                            <Col xs={12} sm={3} md={{ span: 5, offset: 0 }} lg={{ span: 3, offset: 0 }}>
                                <div style={{ marginTop: 15 }}>
                                    <DatePicker
                                        selected={this.state.returnDate}
                                        placeholderText="Return Date"
                                        showPopperArrow={false}
                                        onChange={this.onChangeReturnDate}
                                        dateFormat='dd/MM/yyyy'
                                        minDate={new Date(this.state.departureDate)}
                                        isClearable
                                        showMonthDropdown
                                        className={dorErr ? 'showError' : ''}
                                    />
                                    {dorErr &&
                                        <div style={{ color: "white", paddingBottom: 10 }}>{dorErr}</div>
                                    }
                                </div>
                            </Col>
                            <Col xs={12} sm={3} md={{ span: 3, offset: 0 }} lg={{ span: 2, offset: 0 }}>
                                <Button style={{ padding: '12px 15px', marginTop: 15 }} variant="contained" color="primary" type="submit"><span><i className="fas fa-search"></i></span>&nbsp;Search</Button>
                            </Col>
                        </Row>
                    </Card>
                </form>
            </Container>
        );


    }
}

function mapDispatchToProps(dispatch) {
    console.log("mapDispatchToProps searchFlights")
    return {
        addPostAction: bindActionCreators(addPostAction, dispatch)
    }
}
export default connect(null, mapDispatchToProps)(SearchFlights);