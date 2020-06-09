import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'moment';
import '../../TableList.css'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../../../../../node_modules/react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Swal from "sweetalert2";
import { history } from '../../../../history';
import { logout } from '../../../../actions/user.actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BaseUrl } from '../../../../constants/BaseUrl'

class TicketDetailes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      tickets: [],
      response: {},
      customerId: ''

    }
  }

  componentDidMount() {

    let token = localStorage.getItem('customer');


    const instance = axios.create({
      baseURL: BaseUrl.url + '/api/CustomerFacade', headers: { 'Authorization': 'Bearer ' + token }
    });

    instance.get('/getCustomerId')
      .then((result) => {
        this.setState({
          customerId: result.data
        });
        this.getAllTicketsByCustomerId(this.state.customerId)
        console.log("getCustomeryId  id:" + this.state.companyId)
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

  getAllTicketsByCustomerId = (customerId) => {
    let token = localStorage.getItem('customer');
    axios.get(BaseUrl.url + '/api/CustomerFacade/getAllTicketsByCustomerId/' + customerId, { headers: { 'Authorization': 'Bearer ' + token } })
      .then(
        (result) => {
          this.setState({
            tickets: result.data
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

  deleteTicket(ticketId) {
    if (window.confirm('Are you sure to delete this record?')) {
      let token = localStorage.getItem('customer');
      const { tickets } = this.state;
      axios.delete(BaseUrl.url + '/api/CustomerFacade/deleteticket/' + ticketId, { headers: { 'Authorization': 'Bearer ' + token } })
        .then(result => {
          alert(result.data);
          this.setState({
            response: result,
            tickets: tickets.filter(ticket => ticket.ID !== ticketId)
          });
        });
    }

  }

  render() {
    const { error, tickets } = this.state;
    if (error) {
      return (
        <div>Error:{error.message}</div>
      )
    }
    else {
      return (

        <Table className='tableWidth tableFixHead tableViews'>
          <Thead>
            <Tr>
              <Th className="ticketIDWidth">Ticket ID</Th>
              <Th className="ticketFIDWidth">Flight ID</Th>
              <Th className="ticketFNWidth">Flight number</Th>
              <Th className="ticketCNWidth">Company</Th>
              <Th className="ticketIDWidth">Origin country</Th>
              <Th className="ticketDTimeWidth" >Departure date</Th>
              <Th className="ticketDCWidth">Destination country</Th>
              <Th className="ticketATimeWidth">Arrival Date</Th>
              <Th className="ticketCIDWidth">Customer ID</Th>
              <Th className="ticketFNDWidth">Customer first name</Th>
              <Th className="ticketLNDWidth">Customer last name</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tickets.map(ticket => (
              <Tr key={ticket.ID} >
                <Td>{ticket.ID}</Td>
                <Td>{ticket.FLIGHT_ID}</Td>
                <Td>{ticket.FLIGHT_NUMBER}</Td>
                <Td>{ticket.AIRLINE_NAME}</Td>
                <Td>{ticket.O_COUNTRY_NAME}</Td>
                <Td>{Moment(ticket.DEPARTURE_TIME).format('MMM dddd Do YYYY, HH:mm')}</Td>
                <Td>{ticket.D_COUNTRY_NAME}</Td>
                <Td>{Moment(ticket.LANDING_TIME).format('MMM dddd Do YYYY, HH:mm')}</Td>
                <Td>{ticket.CUSTOMER_ID}</Td>
                <Td>{ticket.FIRST_NAME}</Td>
                <Td>{ticket.LAST_NAME}</Td>

                <Td><Button variant="info" style={{ borderRadius: 0 }} onClick={() => this.props.editTicket(ticket.ID)}>Edit</Button>
                  {/* &nbsp;&nbsp;&nbsp; */}
                  {/* <Button variant="danger" style={{ borderRadius: 0 }} onClick={() => this.deleteTicket(ticket.ID)}>Delete</Button> */}
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
export default connect(null, mapDispatchToProps)(TicketDetailes);
