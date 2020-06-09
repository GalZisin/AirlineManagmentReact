import React, { Component } from "react";
// import Button from 'react-bootstrap/Button'
import { Form, Button } from 'react-bootstrap';
import './AddTicket.css'
import axios from 'axios';
import { connect } from 'react-redux';
import Swal from "sweetalert2";
import { BaseUrl } from '../../../constants/BaseUrl'

class AddTickets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: "",
            tickets: [],
            f1: {},
            f2: {},
            inputErrors: false,
            ADDRESS: '',
            PHONE_NO: '',
            CREDIT_CARD_NUMBER: ''

        };
    }
    componentDidMount() {
        this.handleAddEvent();
        this.getFromRedux();
    }
    getFromRedux() {
        if (this.props.postsData.posts.length > 0) {
            this.setState({ f1: this.props.postsData.posts[this.props.postId.postId].f1 })
            this.setState({ f2: this.props.postsData.posts[this.props.postId.postId].f2 })
        }
    }
    handleChangeAddress(event) {
        this.setState({ ADDRESS: event.target.value })
    }
    handleChangePhoneNo(event) {
        this.setState({ PHONE_NO: event.target.value })
    }
    handleCreditCardNumber(event) {
        this.setState({ CREDIT_CARD_NUMBER: event.target.value })
    }
    handleOrderTickets = (event) => {
        event.preventDefault();
        let data = {
            'tickets':
                this.state.tickets,
            'flights': [{

                'ID': this.state.f1.ID,
                'DepartureTime': this.state.f1.DEPARTURE_TIME
            },
            {
                'ID': this.state.f2.ID,
                'DepartureTime': this.state.f2.DEPARTURE_TIME

            }],
            'user': [{
                'address': this.state.ADDRESS,
                'phoneNo': this.state.PHONE_NO,
                'creditCardNumber': this.state.CREDIT_CARD_NUMBER
            }]
        }
        console.log("passangers: " + JSON.stringify(data))
        let result = false;
        for (let i = 0; i < this.state.tickets.length; i++) {
            for (let j = i + 1; j < this.state.tickets.length; j++) {
                if (this.state.tickets[i].firstName === this.state.tickets[j].firstName && this.state.tickets[i].lastName === this.state.tickets[j].lastName) {
                    result = true;
                    break;
                }
                if (result === true) {
                    break;
                }
            }
        }

        this.setState({ inputErrors: result })

        if (!result) {
            console.log("Data to send: " + JSON.stringify(data))
            let token = localStorage.getItem('customer');
            axios.post(BaseUrl.url + '/api/CustomerFacade/purchaseTickets', data, { headers: { 'Authorization': 'Bearer ' + token } })
                .then((result) => {
                    console.log("purchaseTickets result: " + JSON.stringify(result))
                    if (result.data === 'Tickets ordered succsesfully') {

                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: result.data,
                            showConfirmButton: true
                        });
                    }
                    else {
                        Swal.fire({
                            icon: 'warning',
                            title: "Oops..",
                            type: "error",
                            text: result.data
                        })
                    }
                }).catch((error) => {
                    console.log("error: " + error)
                })
        }

    }
    handleUserInput(filterText) {
        this.setState({ filterText: filterText });
    };

    handleRowDel(ticket) {
        var index = this.state.tickets.indexOf(ticket);
        this.state.tickets.splice(index, 1);
        this.setState(this.state.tickets);
        this.setState({ inputErrors: false })
    };

    handleAddEvent(evt) {
        var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        var ticket = {
            id: id,
            firstName: "",
            lastName: ""
        }
        this.state.tickets.push(ticket);
        this.setState(this.state.tickets);

    }

    handleTicketTable(evt) {
        var item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        var tickets = this.state.tickets.slice();
        var newTickets = tickets.map(function (ticket) {

            for (var key in ticket) {
                if (key === item.name && ticket.id === item.id) {
                    ticket[key] = item.value;
                }
            }
            return ticket;
        });

        this.setState({ tickets: newTickets });

    };

    render() {
        return (
            <div className="addTicketStyle">
                <div className="addTicketHeader">
                    <p style={{ fontSize: 23, color: 'white', paddingTop: 12, paddingBottom: 12, textAlign: 'center'}}>Complete the details to place your order</p>
                </div>
                <div className="AddTicketpadding">
                <p style={{ fontSize: 20 }}><span className="step">1</span>Contact details and payment details</p>
                <Form onSubmit={this.handleOrderTickets}>

                    <Form.Group controlId="Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="ADDRESS"
                            defaultValue={this.state.ADDRESS}
                            onChange={this.handleChangeAddress.bind(this)}
                            placeholder="Address"
                            required />
                    </Form.Group>

                    <Form.Group controlId="Phone number">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                            type="text"
                            name="PHONE_NO"
                            defaultValue={this.state.PHONE_NO}
                            onChange={this.handleChangePhoneNo.bind(this)}
                            placeholder="Phone number"
                            required />
                    </Form.Group>

                    <Form.Group controlId="Credit card number">
                        <Form.Label>Credit card number</Form.Label>
                        <Form.Control
                            type="search"
                            placeholder="xxxx xxxx xxxx xxxx"
                            name="CREDIT_CARD_NUMBER"
                            defaultValue={this.state.CREDIT_CARD_NUMBER}
                            onChange={this.handleCreditCardNumber.bind(this)}
                            required
                        />
                    </Form.Group>

                    <p style={{ fontSize: 20 }}><span className="step">2</span>Add passengers names</p>
                    <TicketTable
                        onTicketTableUpdate={this.handleTicketTable.bind(this)}
                        onRowAdd={this.handleAddEvent.bind(this)}
                        onRowDel={this.handleRowDel.bind(this)}
                        tickets={this.state.tickets}
                        filterText={this.state.filterText}
                        onOrderTickets={this.handleOrderTickets.bind(this)}
                        inputErrors={this.state.inputErrors}
                    />

                </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps  state Addtickets: " + JSON.stringify(state))
    return {
        postsData: state.postsData,
        postId: state.postId
    }
}

export default connect(mapStateToProps)(AddTickets);

class TicketTable extends React.Component {
    render() {
        let isNotValid = this.props.inputErrors
        var onTicketTableUpdate = this.props.onTicketTableUpdate;
        var rowDel = this.props.onRowDel;
        var filterText = this.props.filterText;
        var ticket = this.props.tickets.map(function (ticket) {
            // console.log("tickets from TicketTable: " + JSON.stringify(ticket))
            if (ticket.firstName.indexOf(filterText) === -1) {
                return '';
            }
            return (<TicketRow onTicketTableUpdate={onTicketTableUpdate} ticket={ticket} onDelEvent={rowDel.bind(this)} key={ticket.id} />)
        });
        return (
            <div>
                <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
                <table className="table tableViews">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticket}
                    </tbody>
                </table>
                {isNotValid && <p style={{ color: 'red' }}>duplicate names</p>}
                <button type="submit" className="btn btn-success pull-right">Order tickets</button>
            </div>
        );
    }
}
class TicketRow extends React.Component {
    onDelEvent() {
        this.props.onDelEvent(this.props.ticket);
    }
    render() {

        return (
            <tr>
                <EditableCell onTicketTableUpdate={this.props.onTicketTableUpdate} cellData={{
                    type: "firstName",
                    value: this.props.ticket.firstName,
                    id: this.props.ticket.id
                }} />
                <EditableCell onTicketTableUpdate={this.props.onTicketTableUpdate} cellData={{
                    type: "lastName",
                    value: this.props.ticket.lastName,
                    id: this.props.ticket.id
                }} />
                <td>
                    <Button style={{ marginTop: 5 }} variant="outline-danger" onClick={this.onDelEvent.bind(this)}>X</Button>
                </td>
            </tr>
        );
    }
}
class EditableCell extends React.Component {
    render() {

        return (
            <td>
                <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onTicketTableUpdate} required />
            </td>
        );
    }
}