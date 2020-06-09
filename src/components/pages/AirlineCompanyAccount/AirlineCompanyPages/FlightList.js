import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import '../../TableList.css'
import Moment from 'moment';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../../../../../node_modules/react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Swal from "sweetalert2";
import { history } from '../../../../history';
import { logout } from '../../../../actions/user.actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BaseUrl } from '../../../../constants/BaseUrl'

class CompanyList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            flights: [],
            company: [],
            response: {},
            companyId: '',
            countriesData: []
        }
    }

    componentDidMount() {

        let token = localStorage.getItem('airlineCompany');


        const instance = axios.create({
            baseURL: BaseUrl.url + '/api/AirlineCompanyFacade', headers: { 'Authorization': 'Bearer ' + token }
        });

        instance.get('/getAirlineCompanyId')
            .then((result) => {
                this.setState({
                    companyId: result.data
                });
                this.getAllFlightsByAirlineCompanyId(this.state.companyId)
                console.log("getAirlineCompanyId  id:" + this.state.companyId)
            },
                (error) => {
                    this.setState({ error });
                    console.log("error: " + JSON.stringify(error))
                    if (error.message === 'Request failed with status code 401') {
                        this.props.logout();
                        Swal.fire({
                            icon: 'warning',
                            title: "Oops..",
                            type: "error",
                            text: "Your token expires, please re-login!",
                        });
                        history.push('/');
                    }
                }
            )
    }

    getAllFlightsByAirlineCompanyId = (companyId) => {
        let token = localStorage.getItem('airlineCompany');
        axios.get(BaseUrl.url + '/api/AirlineCompanyFacade/GetAllFlightsByAirlineCompanyId/' + companyId, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(
                (result) => {
                    this.setState({
                        flights: result.data
                    });
                },
                (error) => {
                    this.setState({ error });
                    if (error.message === 'Request failed with status code 401') {
                        this.props.logout();
                        Swal.fire({
                            icon: 'warning',
                            title: "Oops..",
                            type: "error",
                            text: "Your token expires, please re-login!",
                        });
                        history.push('/');
                    }
                }
            )
    }

    deleteCompany(flightId) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                let token = localStorage.getItem('airlineCompany');
                const { flights } = this.state;
                axios.delete(BaseUrl.url + '/api/AirlineCompanyFacade/deleteflight/' + flightId, { headers: { 'Authorization': 'Bearer ' + token } })
                    .then(result => {
                        console.log("deleteflight: " + JSON.stringify(result))
                        if (result.data === `Flight with ID = ${flightId} deleted succsesfully`) {
                            Swal.fire(
                                'Deleted!',
                                result.data,
                                'success'
                            )
                        }
                        else {
                            Swal.fire({
                                icon: 'warning',
                                title: "Oops..",
                                text: result.data
                            });
                        }
                        this.setState({
                            response: result,
                            flights: flights.filter(flight => flight.ID !== flightId)
                        });
                    });
            }
        })
    }
    render() {

        const { error, flights } = this.state;
        if (error) {
            return (
                <div>Error:{error.message}</div>
            )
        }
        else {
            Moment.locale('en');

            return (

                <Table className='tableFixHead tableViews'>
                    <Thead>
                        <Tr>
                            <Th className="iddWidth">Flight Number</Th>
                            <Th>Company Name</Th>
                            <Th>Origin country</Th>
                            <Th>Destination country</Th>
                            <Th>Departure date</Th>
                            <Th>Landing date</Th>
                            <Th>Remaining tickets</Th>
                            <Th>Total tickets</Th>
                            <Th className="cFlightWidth">Action</Th>

                            {/* <Th className="iddWidth">Flight Number</Th>
                            <Th className="cndWidth">Company Name</Th>
                            <Th className="ocdWidth">Origin country</Th>
                            <Th className="dcdWidth">Destination country</Th>
                            <Th className="dtdWidth">Departure date</Th>
                            <Th className="ltdWidth">Landing date</Th>
                            <Th className="rtdWidth">Remaining tickets</Th>
                            <Th className="ttdWidth">Total tickets</Th>
                            <Th className="aWidth">Action</Th> */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {flights.map(flight => (
                            <Tr key={flight.ID}>
                                <Td>{flight.FLIGHT_NUMBER}</Td>
                                <Td>{flight.AIRLINE_NAME}</Td>
                                <Td>{flight.O_COUNTRY_NAME}</Td>
                                <Td>{flight.D_COUNTRY_NAME}</Td>
                                <Td>{Moment(flight.REAL_DEPARTURE_TIME).format('MMM dddd Do YYYY, HH:mm')}</Td>
                                <Td>{Moment(flight.REAL_LANDING_TIME).format('MMM dddd Do YYYY, HH:mm')}</Td>
                                <Td>{flight.REMANING_TICKETS}</Td>
                                <Td>{flight.TOTAL_TICKETS}</Td>
                                <Td><Button id="editBtn" variant="info" style={{ borderRadius: 0 }} onClick={() => this.props.editFlight(flight.ID)}>Edit</Button>  &nbsp;&nbsp;&nbsp;
                          <Button id="deletBtn" variant="danger" style={{ borderRadius: 0 }} onClick={() => this.deleteCompany(flight.ID)}>Delete</Button>

                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

            )
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch),
    }
}
export default connect(null, mapDispatchToProps)(CompanyList);
