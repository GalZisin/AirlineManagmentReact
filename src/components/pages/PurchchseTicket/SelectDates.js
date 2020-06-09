import React, { Component } from 'react'
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from "@fullcalendar/timegrid";
import './SelectDates.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import $ from "jquery";
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { history } from '../../../history';
import { BaseUrl } from '../../../constants/BaseUrl'

let dealFlightId = '';
let selectedDepDate = '';
let selectedRetDate = '';

class SelectDates extends Component {
    constructor(props) {
        super(props)
        this.state = {
            departureDates: [],
            returnDates: [],
            companyName: '',
            destinationCountry: '',
            originCountry:'',
            defaultDepartureDate: '',
            selectedDepartureDate: '',
            selectedReturnDate: ''
        };

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
    handleSelectFlight = () => {
        if (this.state.selectedDepartureDate !== '' && this.state.selectedReturnDate) {
            let flightData = {
                departureFlight: this.state.selectedDepartureDate,
                returnFlight: this.state.selectedReturnDate,
                destinationCountry: this.state.destinationCountry,
                companyName: this.state.companyName,
                originCountry: this.state.originCountry
            }

            localStorage.setItem('selectedFlightData', JSON.stringify(flightData))
            history.push('/');
        }

    }
    handleClickMonthCalendar1 = () => {

        $('[id=calendar1] button.fc-next-button').click(() => {

            console.log("departureDates: " + this.state.departureDates)
            console.log("defaultDepartureDate: " + this.state.defaultDepartureDate)
            this.fillCalendarWithDepartureFlightsDates(this.state.departureDates, this.state.returnDates, this.state.defaultDepartureDate);



        });

        $('[id=calendar1] button.fc-prev-button').click(() => {

            this.fillCalendarWithDepartureFlightsDates(this.state.departureDates, this.state.returnDates, this.state.defaultDepartureDate);


        });

    }

    handleClickMonthCalendar2 = () => {

        $('[id=calendar2] button.fc-next-button').click(() => {

            console.log("departureDates: " + this.state.departureDates)
            this.fillCalendarWithReturnFlightsDates(this.state.returnDates);

        });

        $('[id=calendar2] button.fc-prev-button').click(() => {

            this.fillCalendarWithReturnFlightsDates(this.state.returnDates);


        });

    }
    moveToMonthCalendar2 = (numOfMovesf) => {
        let numOfMoves = numOfMovesf;
        let next = true;
        if (numOfMovesf < 0) {
            next = false;
            numOfMoves = (-1) * numOfMovesf;
        }
        if (numOfMoves > 1) {

            var i;
            for (i = 0; i < numOfMoves - 1; i++) {
                if (next) {
                    $('[id=calendar2] button.fc-next-button').trigger('click');
                }
                else {
                    console.log("prev")
                    $('[id=calendar2] button.fc-prev-button').trigger('click');
                }

            }
        }

        console.log("before trigger: " + numOfMoves)
        if (next) {
            $('[id=calendar2] button.fc-next-button').trigger('click');
        }
        else {
            console.log("prev1")

            $('[id=calendar2] button.fc-prev-button').trigger('click');
        }
        this.fillCalendarWithReturnFlightsDates(this.state.returnDates);
    }
    moveToMonthCalendar1 = (numOfMoves) => {
        if (numOfMoves > 1) {
            var i;
            for (i = 0; i < numOfMoves - 1; i++) {
                $('[id=calendar1] button.fc-next-button').trigger('click');
            }
        }
        $('[id=calendar1] button.fc-next-button').trigger('click');
    }

    componentDidMount() {
        this.getLocalCountry();
        this.getFlightsToFillCalendar(dealFlightId);
    }

    handleDateClickCalendar1 = (arg) => {
        let color = '';
        let prevSelectedDate = selectedDepDate;

        color = $(`[id=calendar1] td.fc-day[data-date='${arg.dateStr}']`).css('background-color');

        if (arg.dateStr !== prevSelectedDate && color !== 'rgba(234, 233, 232, 0.4)') {
            selectedDepDate = arg.dateStr;
            this.setState({ selectedDepartureDate: arg.dateStr })
            $(`[id=calendar1] td.fc-day[data-date='${prevSelectedDate}']`).css("background-color", "#FFF8DC")
            $(`[id=calendar1] td.fc-day[data-date='${selectedDepDate}']`).unbind('mouseenter mouseleave').css("background-color", "#339966")
            $(`[id=calendar1] td.fc-day[data-date='${prevSelectedDate}']`).hover(function () {
                $(this).css("background", "#339966");
            },
                function () {
                    $(this).css("background", "#FFF8DC");
                });
        }
        this.fillCalendarWithReturnFlightsDates(this.state.returnDates);
        this.fillCalendarWithDepartureFlightsDates(this.state.departureDates);
        let monthYear = $('[id=calendar1] div.fc-left h2').text()
        let month1 = moment(monthYear).get('month') + 1
        monthYear = $('[id=calendar2] div.fc-left h2').text()
        let month2 = moment(monthYear).get('month') + 1
        let numOfMoves = month1 - month2;
        console.log("month1: " + month1)
        console.log("month2: " + month2)
        console.log("numOfMoves: " + numOfMoves)
        if (numOfMoves !== 0) {
            this.moveToMonthCalendar2(numOfMoves);
        }
    }
    handleDateClickCalendar2 = (arg) => {
        let color = '';
        let prevSelectedDate = selectedRetDate;

        color = $(`[id=calendar2] td.fc-day[data-date='${arg.dateStr}']`).css('background-color');

        if (arg.dateStr !== prevSelectedDate && color !== 'rgba(234, 233, 232, 0.4)') {
            selectedRetDate = arg.dateStr;
            this.setState({ selectedReturnDate: arg.dateStr })
            $(`[id=calendar2] td.fc-day[data-date='${prevSelectedDate}']`).css("background-color", "#FFF8DC")
            $(`[id=calendar2] td.fc-day[data-date='${selectedRetDate}']`).unbind('mouseenter mouseleave').css("background-color", "#339966")
            $(`[id=calendar2] td.fc-day[data-date='${prevSelectedDate}']`).hover(function () {
                $(this).css("background", "#339966");
            },
                function () {
                    $(this).css("background", "#FFF8DC");
                });
        }
    }
    getFlightsToFillCalendar = (flightId) => {
        console.log("flightId: " + flightId)
        let url = BaseUrl.url + '/api/AnonymousFacade/getFlightsToFillCalendar/' + flightId;
        console.log("url: " + url)
        axios.get(url)
            .then((result) => {

                result.data.departureDates.map((derturedate, index) => {
                    let fderturedate = moment(derturedate.REAL_DEPARTURE_TIME).format("YYYY-MM-DD");;
                    console.log("fderturedate: " + fderturedate)
                    this.state.departureDates.push(fderturedate);
                    this.setState({ departureDates: this.state.departureDates })
                });
                console.log("departureDates: " + JSON.stringify(this.state.departureDates))
                result.data.returnDates.map((returnDates, index) => {
                    let freturnDates = moment(returnDates.REAL_DEPARTURE_TIME).format("YYYY-MM-DD");;
                    console.log("freturnDates: " + freturnDates)
                    this.state.returnDates.push(freturnDates);
                    this.setState({ returnDates: this.state.returnDates })
                });

                this.setState({ companyName: result.data.CompanyName })

                let DefaultDepartureDate = moment(result.data.DefaultDepartureDate).format("YYYY-MM-DD");

                this.setState({ destinationCountry: result.data.DestinationCountry })

                console.log("DefaultDepartureDate: " + DefaultDepartureDate)

                selectedDepDate = DefaultDepartureDate;

                let defaultMonth = moment(DefaultDepartureDate).get('month') + 1;
                console.log("defaultMonth: " + defaultMonth)
                let monthNow = moment(new Date()).get('month') + 1;
                console.log("monthNow: " + monthNow)
                let numOfMoves = defaultMonth - monthNow;
                console.log("numOfMoves: " + numOfMoves)
                if (numOfMoves > 0) {
                    this.moveToMonthCalendar1(numOfMoves)
                    this.moveToMonthCalendar2(numOfMoves)
                }

                this.setState({ selectedDepartureDate: DefaultDepartureDate })
                this.fillCalendarWithDepartureFlightsDates(this.state.departureDates);
                this.fillCalendarWithReturnFlightsDates(this.state.returnDates);
            },
                (error) => {
                    console.log("getFlightsToFillCalendar error: " + error);
                }
            )
    }

    fillCalendarWithDepartureFlightsDates = (departureDates) => {

        /////////////////////////////////////////////////////////////    departureDates   //////////////////////////////////////////////////////////////////

        $("[id=calendar1] td.fc-day").each(function () {
            let flagEnable = false;
            let calendarDate = $(this).attr('data-date')
            departureDates.map((departureDate) => {

                if (!flagEnable) {
                    if (calendarDate === departureDate) {
                        flagEnable = true;
                    }
                }
            })
            if (flagEnable === true) {
                if (calendarDate === selectedDepDate) {
                    $(`[id=calendar1] td.fc-day[data-date='${calendarDate}']`).css("background-color", "#339966")

                }
                else {
                    $(`[id=calendar1] td.fc-day[data-date='${calendarDate}']`).css("background-color", "#FFF8DC")

                    $(`[id=calendar1] td.fc-day[data-date='${calendarDate}']`).hover(function () {
                        $(this).css("background", "#339966");
                    },
                        function () {
                            $(this).css("background", "#FFF8DC");
                        });
                }
            }
            else {
                $(`[id=calendar1] td.fc-day[data-date='${calendarDate}']`).css("background-color", "rgba(234, 233, 232, 0.4)")
            }
        });
    }
    fillCalendarWithReturnFlightsDates = (returnDates) => {

        /////////////////////////////////////////////////////////////    returnDates   //////////////////////////////////////////////////////////////////

        let selectedDeparturDate = this.state.selectedDepartureDate;
        $("[id=calendar2] td.fc-day").each(function () {
            let flagEnable = false;
            let calendarDate = $(this).attr('data-date')
            returnDates.map((returnDate) => {

                if (!flagEnable) {
                    if (calendarDate === returnDate && calendarDate > selectedDeparturDate) {
                        flagEnable = true;
                    }
                }
            })
            if (flagEnable === true) {
                $(`[id=calendar2] td.fc-day[data-date='${calendarDate}']`).css("background-color", "#FFF8DC")

                $(`[id=calendar2] td.fc-day[data-date='${calendarDate}']`).hover(function () {
                    $(this).css("background", "#339966");
                },
                    function () {
                        $(this).css("background", "	#FFF8DC");
                    });
            }
            else {
                $(`[id=calendar2] td.fc-day[data-date='${calendarDate}']`).unbind('mouseenter mouseleave').css("background-color", "rgba(234, 233, 232, 0.4)")
            }
        });
    }
    render() {
        const { companyName, destinationCountry } = this.state
        return (
            <Container>
                <Row>
                    <Col md={12} xs={12}><div className="headerStyle">Flights with {companyName} to {destinationCountry}</div></Col>
                </Row>

                <Row>
                    <Col md={6} xs={12}>
                        <div id="calendar2" className="container calendarStyles" >
                            <div className="row title" style={{ marginTop: "20px" }} >
                                <div className="col-sm-12 btn btn-info">
                                    Select a return date
               </div>
                            </div>
                            <FullCalendar
                                header={{
                                    left: 'title',
                                    center: '',
                                    right: 'prev,next'
                                }}
                                height={600}
                                /* contentHeight={600}  */
                                defaultView="dayGridMonth"
                                dateClick={this.handleDateClickCalendar2}
                                plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
                                datesRender={this.handleClickMonthCalendar2}
                                editable={true}
                                selectable={false}
                                showNonCurrentDates={false}
                            />
                        </div>
                    </Col>
                    <Col md={6} xs={12}>
                        <div id="calendar1" className="container calendarStyles" >
                            <div className="row title" style={{ marginTop: "20px" }} >
                                <div className="col-sm-12 btn btn-info">
                                    Select a departure date
               </div>
                            </div>

                            <FullCalendar
                                header={{
                                    left: 'title',
                                    center: '',
                                    right: 'prev,next'
                                }

                                }
                                height={600}
                                /* contentHeight={600}  */
                                defaultView="dayGridMonth"
                                dateClick={this.handleDateClickCalendar1}
                                plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
                                datesRender={this.handleClickMonthCalendar1}
                                editable={true}
                                selectable={false}
                                showNonCurrentDates={false}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} xs={12} ><div className="selectedFlights">
                        <Row>
                            <Col md={{ span: 2, order: 1, offset: 0 }} xs={{ span: 12, order: 3, offset: 4 }}>
                                <Button className="purchaseBtn" onClick={this.handleSelectFlight}>purchase now</Button>
                            </Col>
                            <Col md={{ span: 5, order: 3 }} xs={{ span: 12, order: 1 }}>
                                <div className="selectedDeparture">{this.state.selectedDepartureDate}</div>
                            </Col>
                            <Col md={{ span: 5, order: 2 }} xs={{ span: 12, order: 2 }}>
                                <div className="selectedReturn">{this.state.selectedReturnDate}</div>
                            </Col>
                        </Row>
                    </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    dealFlightId = ownProps.match.params.flight_id
    console.log("flight_id: " + dealFlightId);
    return state;
}
export default connect(mapStateToProps, null)(SelectDates);