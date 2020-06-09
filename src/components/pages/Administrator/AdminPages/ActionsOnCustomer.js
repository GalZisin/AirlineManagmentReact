import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import CustomerList from './CustomerList'
import AddCustomer from './AddCustomer';
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
      isAddCustomer: true,
      error: null,
      response: {},
      customerData: {},
      isEditCustomer: false,
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);

  }

  onFormSubmit(data) {

    let token = localStorage.getItem('admin');

    if (this.state.isEditCustomer) {
      axios.put(BaseUrl.url + '/api/AdministratorFacade/updatecustomer', data, { headers: { 'Authorization': 'Bearer ' + token } })
        .then(result => {
          let cdata = JSON.parse(result.config.data)
          if (result.data === `Customer with ID = ${cdata.ID} updated succsesfully`) {
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
              text: result.data
            });
          }
          this.setState({
            response: result,
            isAddCustomer: true,
            isEditCustomer: false
          })
        });
    } else {

      axios.post(BaseUrl.url + '/api/AdministratorFacade/createcustomer', data, { headers: { 'Authorization': 'Bearer ' + token } })
        .then(result => {
          if (result.data === 'Customer account created succsesfully') {
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
            });
          }
          this.setState({
            response: result,
            isAddCustomer: true,
            isEditCustomer: false
          })
        });
    }

  }

  editCustomer = customerId => {

    let token = localStorage.getItem('admin');
    axios.post(BaseUrl.url + `/api/AdministratorFacade/getCustomerById`, { id: customerId }, { headers: { 'Authorization': 'Bearer ' + token } })
      .then((result) => {
        this.setState({
          isEditCustomer: true,
          isAddCustomer: false,
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

  onCreate() {
    this.setState({ isAddCustomer: false });
    this.setState({ isEditCustomer: false });
    this.setState({ customerData: {} });
  }
  onDetails(view) {
    if (view === 'ListView')
      this.setState({ isAddCustomer: true });
    this.setState({ isEditCustomer: false });

  }

  render() {
    let customerForm;
    if (!this.state.isAddCustomer || this.state.isEditCustomer) {

      customerForm = <AddCustomer onFormSubmit={this.onFormSubmit} customer={this.state.customerData} ListView={this.onDetails.bind(this, 'ListView')} />

    }


    return (
      <div className="content1">
        <Container>
          <h1 style={{ textAlign: 'center' }}>CRUD operation on customer</h1>
          {/* <hr></hr> */}
          {this.state.isAddCustomer && <Button className="addBtn" variant="primary" style={{ borderRadius: 0 }} onClick={() => this.onCreate()}>Add Customer</Button>}
          <br></br>
          {this.state.isAddCustomer && <CustomerList editCustomer={this.editCustomer} />}
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
