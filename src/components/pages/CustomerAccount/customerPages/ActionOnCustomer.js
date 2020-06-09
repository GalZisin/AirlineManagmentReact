import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import CustomerDetails from './CustomerDetails'
import EditCustomer from './EditCustomer';
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Swal from "sweetalert2";
import { history } from '../../../../history';
import { logout } from '../../../../actions/user.actions';
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BaseUrl } from '../../../../constants/BaseUrl'

class ActionsOnCustomer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            response: {},
            customerData: {},
            isEditCustomer: false
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(data) {

        let token = localStorage.getItem('customer');
        axios.put(BaseUrl.url + '/api/CustomerFacade/updateCustomer', data, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(result => {

                console.log("result: " + JSON.stringify(result))
                let cdata = JSON.parse(result.config.data)
                // alert(`Customer with ID = ${cdata.ID} updated succsesfully`)
                if (cdata.ID === data.ID) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Customer with ID = ${cdata.ID} updated succsesfully`,
                        showConfirmButton: true
                    });
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
                    isAddAdmin: true,
                    isEditAdmin: false
                })

                localStorage.setItem('customer', result.data)
                this.setState({
                    response: result,
                    isEditCustomer: false
                })
            });
    }

    editCustomer = customerId => {
        let token = localStorage.getItem('customer');
        axios.get(BaseUrl.url + '/api/CustomerFacade/getCustomerByCustomerId/' + customerId, { headers: { 'Authorization': 'Bearer ' + token } })
            .then((result) => {
                this.setState({
                    isEditCustomer: true,
                    // isAddCompany: false,
                    customerData: result.data
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

    onDetails(view) {
        if (view === 'ListView')
            this.setState({ isEditCustomer: false });
    }

    render() {
        console.log("isEditCustomer: " + this.state.isEditCustomer)
        let customerForm;
        if (this.state.isEditCustomer) {

            customerForm = <EditCustomer onFormSubmit={this.onFormSubmit} customer={this.state.customerData} ListView={this.onDetails.bind(this, 'ListView')} />

        }
        return (
            <div className="content1">
                <Container>
                    <h1 style={{ textAlign: 'center' }}>Your Account Details</h1>
                    <hr></hr>
                    <br></br>
                    {!this.state.isEditCustomer && <CustomerDetails editCustomer={this.editCustomer} />}
                    {customerForm}
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
export default connect(null, mapDispatchToProps)(ActionsOnCustomer);