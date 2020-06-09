import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import '../../TableList.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Swal from "sweetalert2";
import { history } from '../../../../history';
import { logout } from '../../../../actions/user.actions';
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../../../../../node_modules/react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { BaseUrl } from '../../../../constants/BaseUrl'

class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      customers: [],
      response: {}
    }
  }

  componentDidMount() {

    let token = localStorage.getItem('admin');

    const instance = axios.create({
      baseURL: BaseUrl.url + '/api/AdministratorFacade', headers: { 'Authorization': 'Bearer ' + token }
    });

    instance.post('/getAllCustomers')

      .then((result) => {

        this.setState({
          customers: result.data
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


  deleteCustomer(customerId) {
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
        let token = localStorage.getItem('admin');
        const { customers } = this.state;
        axios.delete(BaseUrl.url + '/api/AdministratorFacade/deletecustomer/' + customerId, { headers: { 'Authorization': 'Bearer ' + token } })
          .then(result => {
            console.log("delete customer from admin: " + JSON.stringify(result))
            if (result.status === 200) {
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
                type: "error",
                text: result.data
              });
            }

            this.setState({
              response: result,
              customers: customers.filter(customer => customer.ID !== customerId)
            });
          });
      }
    })
  }

  render() {
    const { error, customers } = this.state;
    if (error) {
      return (
        <div>Error:{error.message}</div>
      )
    }
    else {
      return (
      
          <Table className="tableFixHead tableViews">
            <Thead>
              <Tr>
                <Th className="customerIDWidth">ID</Th>
                <Th className="customerFNWidth">First Name</Th>
                <Th className="customerLNWidth">Last Name</Th>
                <Th className="customerUNWidth">User Name</Th>
                <Th className="customerPassWidth">Password</Th>
                <Th className="customerPhonNoWidth">PhoneNo</Th>
                <Th className="customerAddressWidth">Address</Th>
                <Th className="customerCreditWidth">CCN</Th>
                <Th className="cActionW ">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.map(customer => (
                <Tr key={customer.ID}>
                  <Td >{customer.ID}</Td>
                  <Td>{customer.FIRST_NAME}</Td>
                  <Td>{customer.LAST_NAME}</Td>
                  <Td>{customer.USER_NAME}</Td>
                  <Td>{customer.PASSWORD}</Td>
                  <Td>{customer.PHONE_NO}</Td>
                  <Td>{customer.ADDRESS}</Td>
                  <Td>{customer.CREDIT_CARD_NUMBER}</Td>
                  <Td><Button id="editBtn" variant="info" style={{ borderRadius: 0 }} onClick={() => this.props.editCustomer(customer.ID)}>Edit</Button>  &nbsp;&nbsp;&nbsp;
                          <Button id="deletBtn" variant="danger" style={{ borderRadius: 0 }} onClick={() => this.deleteCustomer(customer.ID)}>Delete</Button>

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
export default connect(null, mapDispatchToProps)(CustomerList);
