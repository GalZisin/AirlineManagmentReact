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

class CompanyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      companies: [],
      response: {}

    }
  }

  componentDidMount() {

    let token = localStorage.getItem('admin');

    const instance = axios.create({
      baseURL: BaseUrl.url + '/api/AdministratorFacade', headers: { 'Authorization': 'Bearer ' + token }
    });

    instance.post('/getallairlinecompanies')
      .then(
        (result) => {
          this.setState({
            companies: result.data
          });
          // console.log("companies: " + JSON.stringify(result.data))
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

  deleteCompany(companyId) {
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
        const { companies } = this.state;
        axios.delete(BaseUrl.url + '/api/AdministratorFacade/deletecompany/' + companyId, { headers: { 'Authorization': 'Bearer ' + token } })
          .then(result => {
            console.log("result.data.ID: " + JSON.stringify(result))
            if (result.status === 200) {
              Swal.fire(
                'Deleted!',
                `Airline company with ID = ${result.data} deleted succsesfully`,
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
              companies: companies.filter(company => company.ID !== companyId)
            });
          });
      }
    })
  }

  render() {
    const { error, companies } = this.state;
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
                <Th>Company Name</Th>
                <Th>User Name</Th>
                <Th>Password</Th>
                <Th>Country Code</Th>
                <Th>Country Name</Th>
                <Th className="cActionW">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {companies.map(company => (
                <Tr key={company.ID}>
                  <Td>{company.ID}</Td>
                  <Td>{company.AIRLINE_NAME}</Td>
                  <Td>{company.USER_NAME}</Td>
                  <Td>{company.PASSWORD}</Td>
                  <Td>{company.COUNTRY_CODE}</Td>
                  <Td>{company.COUNTRY_NAME}</Td>
                  <Td><Button id="editBtn" variant="info" style={{ borderRadius: 0 }} onClick={() => this.props.editCompany(company.ID)}>Edit</Button>  &nbsp;&nbsp;&nbsp;
                          <Button id="deletBtn" variant="danger" style={{ borderRadius: 0 }} onClick={() => this.deleteCompany(company.ID)}>Delete</Button>
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

