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
import { BaseUrl } from '../../../../constants/BaseUrl';

class AdminList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      administrators: [],
      response: {}

    }
  }

  componentDidMount() {

    let token = localStorage.getItem('admin');

    const instance = axios.create({
      baseURL: BaseUrl.url + '/api/AdministratorFacade', headers: { 'Authorization': 'Bearer ' + token }
    });

    instance.post('/getAllAdministrators')

      .then((result) => {

        this.setState({
          administrators: result.data
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


  deleteAdmin(adminId) {
    let token = localStorage.getItem('admin');
    const { administrators } = this.state;
    if (administrators.length > 1) {
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
          axios.delete(BaseUrl.url + '/api/AdministratorFacade/deleteadmin/' + adminId, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(result => {
              console.log("deleteadmin: " + JSON.stringify(result))
              if (result.data === `Administrator with ID = ${adminId} deleted succsesfully`) {
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
                administrators: administrators.filter(admin => admin.ID !== adminId)
              });
            });
        }
      })
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: "Oops..",
        text: 'You are not allowed to delete the last admin!'
      });
    }
  }

  render() {
    const { error, administrators } = this.state;
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
              <Th>ID</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>User Name</Th>
              <Th>Password</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {administrators.map(admin => (
              <Tr key={admin.ID}>
                <Td >{admin.ID}</Td>
                <Td>{admin.FIRST_NAME}</Td>
                <Td>{admin.LAST_NAME}</Td>
                <Td>{admin.USER_NAME}</Td>
                <Td>{admin.PASSWORD}</Td>
                <Td><Button variant="info" style={{ borderRadius: 0 }} onClick={() => this.props.editAdmin(admin.ID)}>Edit</Button>  &nbsp;&nbsp;&nbsp;
                          <Button variant="danger" style={{ borderRadius: 0 }} onClick={() => this.deleteAdmin(admin.ID)}>Delete</Button>

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
export default connect(null, mapDispatchToProps)(AdminList);
