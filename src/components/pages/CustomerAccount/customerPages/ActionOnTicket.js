import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import TicketDetails from './TicketDetails'
import EditTicket from './EditTicket';
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Swal from "sweetalert2";
import { history } from '../../../../history';
import { logout } from '../../../../actions/user.actions';
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BaseUrl } from '../../../../constants/BaseUrl'

class ActionsOnTicket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            response: {},
            ticketData: {},
            isEditTicket: false,
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(data) {
        console.log("ticket data :" + JSON.stringify(data))
        let token = localStorage.getItem('customer');
        axios.put(BaseUrl.url + '/api/CustomerFacade/updateticket', data, { headers: { 'Authorization': 'Bearer ' + token } })
        .then(result => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: result.data,
                showConfirmButton: true
              });
            this.setState({
                response: result,
                isEditTicket: false
            })
        });
    }

    editTicket = ticketId => {

        let token = localStorage.getItem('customer');
        axios.get(BaseUrl.url + '/api/CustomerFacade/getTicketByTicketId/' + ticketId, { headers: { 'Authorization': 'Bearer ' + token } })
            .then((result) => {
                this.setState({
                    isEditTicket: true,
                    ticketData: result.data
                });
                console.log("Ticket Data: " + JSON.stringify(this.state.ticketData))
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

    onDetails(view) {
        if (view === 'ListView')
            this.setState({ isEditTicket: false });
    }

    render() {
        console.log("isEditTicket: " + this.state.isEditTicket)
        let ticketForm;
        if (this.state.isEditTicket) {

            ticketForm = <EditTicket onFormSubmit={this.onFormSubmit} ticket={this.state.ticketData} ListView={this.onDetails.bind(this, 'ListView')} />

        }
        return (
            <div className="content1">
                <Container>
                    <h1 style={{ textAlign: 'center' }}>Your Ticket Details</h1>
                    <hr></hr>
                    <br></br>
                    {!this.state.isEditTicket && <TicketDetails editTicket={this.editTicket} />}
                    {ticketForm}
                </Container>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch),
    }
}
export default connect(null, mapDispatchToProps)(ActionsOnTicket);
