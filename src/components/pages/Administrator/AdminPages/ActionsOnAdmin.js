import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import AdminList from './AdminList'
import AddAdmin from './AddAdmin';
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Swal from "sweetalert2";
import { history } from '../../../../history';
import { logout } from '../../../../actions/user.actions';
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BaseUrl } from '../../../../constants/BaseUrl'

class ActionsOnAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddAdmin: true,
      error: null,
      response: {},
      adminData: {},
      isEditAdmin: false,
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);

  }

  onFormSubmit(data) {

    let token = localStorage.getItem('admin');

    if (this.state.isEditAdmin) {
      axios.put(BaseUrl.url + '/api/AdministratorFacade/updateadmin', data, { headers: { 'Authorization': 'Bearer ' + token } })
        .then(result => {
          let adata = JSON.parse(result.config.data)
          if (result.data === `Administrator with ID = ${adata.ID} updated succsesfully`) {
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
            isAddAdmin: true,
            isEditAdmin: false
          })
        });
    } else {

      axios.post(BaseUrl.url + '/api/AdministratorFacade/createadmin', data, { headers: { 'Authorization': 'Bearer ' + token } })
        .then(result => {
          if (result.data === 'Administrator account created succsesfully') {
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
            isAddAdmin: true,
            isEditAdmin: false
          })
        });
    }

  }



  editAdmin = adminId => {

    let token = localStorage.getItem('admin');
    axios.post(BaseUrl.url + `/api/AdministratorFacade/getAdministratorById`, { id: adminId }, { headers: { 'Authorization': 'Bearer ' + token } })
      .then((result) => {
        this.setState({
          isEditAdmin: true,
          isAddAdmin: false,
          adminData: result.data
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
    this.setState({ isAddAdmin: false });
    this.setState({ isEditAdmin: false });
    this.setState({ adminData: {} });
  }
  onDetails(view) {
    if (view === 'ListView')
      this.setState({ isAddAdmin: true });
    this.setState({ isEditAdmin: false });

  }

  render() {
    let adminForm;
    if (!this.state.isAddAdmin || this.state.isEditAdmin) {

      adminForm = <AddAdmin onFormSubmit={this.onFormSubmit} admin={this.state.adminData} ListView={this.onDetails.bind(this, 'ListView')} />

    }


    return (
      <div className="content1">
        <Container>
          <h1 style={{ textAlign: 'center' }}>CRUD operation on Admin</h1>
          <hr></hr>
          {this.state.isAddAdmin && <Button className="addBtn" variant="primary" style={{ borderRadius: 0 }} onClick={() => this.onCreate()}>Add Admin</Button>}
          <br></br>
          {this.state.isAddAdmin && <AdminList editAdmin={this.editAdmin} />}
          {adminForm}
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
export default connect(null, mapDispatchToProps)(ActionsOnAdmin);

