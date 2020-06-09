import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import CompanyList from './CompanyList'
import AddCompany from './AddCompany';
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Swal from "sweetalert2";
import { history } from '../../../../history';
import { logout } from '../../../../actions/user.actions';
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BaseUrl } from '../../../../constants/BaseUrl'

class ActionsOnCompanies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddCompany: true,
      error: null,
      response: {},
      companyData: {},
      isEditCompany: false,
      countriesData: []
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);

  }
  componentDidMount() {
    this.getAllcountries();
  }
  getAllcountries() {
    let token = localStorage.getItem('admin');
    axios.get(BaseUrl.url + '/api/AdministratorFacade/getAllCountries/', { headers: { 'Authorization': 'Bearer ' + token } })
      .then((result) => {
        this.setState({

          countriesData: result.data

        });

      },
        (error) => {
          this.setState({ error });
        }
      )
  }
  onFormSubmit(data) {
    let token = localStorage.getItem('admin');
    if (this.state.isEditCompany) {
      axios.put(BaseUrl.url + '/api/AdministratorFacade/updateairlinecompany', data, { headers: { 'Authorization': 'Bearer ' + token } })
        .then(result => {
          console.log("updatecomapny: " + JSON.stringify(result))
          let adata = JSON.parse(result.config.data)
          if(result.data === `Airline Company with ID = ${adata.ID} updated succsesfully`){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: result.data,
              showConfirmButton: true
            });
          }
          else{
            Swal.fire({
              icon: 'warning',
              title: "Oops..",
              text: result.data
            });
          }    
          this.setState({
            response: result,
            isAddCompany: true,
            isEditCompany: false
          })
        });
    } else {
      axios.post(BaseUrl.url + '/api/AdministratorFacade/createairlinecompany', data, { headers: { 'Authorization': 'Bearer ' + token } })
        .then(result => {
          if (result.data === 'AirlineCompany account created succsesfully') {
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
            isAddCompany: true,
            isEditCompany: false
          })
        }).catch(error => {
          console.log(error)
        })
    }
  }

  editCompany = companyId => {

    let token = localStorage.getItem('admin');
    axios.post(BaseUrl.url + `/api/AdministratorFacade/getAirlineCompanyById`, { id: companyId }, { headers: { 'Authorization': 'Bearer ' + token } })
      .then((result) => {
        this.setState({
          isEditCompany: true,
          isAddCompany: false,
          companyData: result.data
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
    this.setState({ isAddCompany: false });
    this.setState({ isEditCompany: false });
    this.setState({ companyData: {} });
  }
  onDetails(view) {
    if (view === 'ListView')
      this.setState({ isAddCompany: true });
    this.setState({ isEditCompany: false });
  }

  render() {

    let companyForm;
    if (!this.state.isAddCompany || this.state.isEditCompany) {

      companyForm = <AddCompany onFormSubmit={this.onFormSubmit} company={this.state.companyData} countries={this.state.countriesData} ListView={this.onDetails.bind(this, 'ListView')} />

    }


    return (
      <div className="content1" style={{width: '100%'}}>
        <Container>
          <h1 style={{ textAlign: 'center' }}>CRUD operation on companies</h1>
          {/* <hr></hr> */}
          {this.state.isAddCompany && <Button className="addBtn" variant="primary" style={{ borderRadius: 0 }} onClick={() => this.onCreate()}>Add Company</Button>}
          <br></br>
          {this.state.isAddCompany && <CompanyList editCompany={this.editCompany} />}
          {companyForm}
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
export default connect(null, mapDispatchToProps)(ActionsOnCompanies);
