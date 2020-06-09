import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import FlightList from './FlightList'
import AddFlight from './AddFlight';
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Swal from "sweetalert2";
import { history } from '../../../../history';
import { logout } from '../../../../actions/user.actions';
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../TableList.css'
import '../../../SecondaryMenu.css'
import { BaseUrl } from '../../../../constants/BaseUrl'

class ActionsOnFlights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddFlight: true,
      error: null,
      response: {},
      flightData: {},
      isEditFlight: false,
      countriesData: []

    }

    this.onFormSubmit = this.onFormSubmit.bind(this);

  }
  componentDidMount() {
    this.getAllcountries();
  }

  getAllcountries() {
    let token = localStorage.getItem('airlineCompany');
    axios.get(BaseUrl.url + '/api/AirlineCompanyFacade/getAllCountries/', { headers: { 'Authorization': 'Bearer ' + token } })
      .then((result) => {
        this.setState({

          countriesData: result.data

        });
        console.log("Countries from ActiOnFlight: " + JSON.stringify(result.data))
        console.log("Countries from FlightList state: " + JSON.stringify(this.state.countriesData))
      },
        (error) => {
          this.setState({ error });
        }
      )
  }
  onFormSubmit(data) {
    let token = localStorage.getItem('airlineCompany');
    if (this.state.isEditFlight) {
      axios.put(BaseUrl.url + '/api/AirlineCompanyFacade/updateFlight', data, { headers: { 'Authorization': 'Bearer ' + token } })
        .then(result => {
          let fdata = JSON.parse(result.config.data)
          if (result.data === `Flight with ID = ${fdata.ID} updated succsesfully`) {
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
            isAddFlight: true,
            isEditFlight: false
          })
        });
    } else {
      axios.post(BaseUrl.url + '/api/AirlineCompanyFacade/createFlight', data, { headers: { 'Authorization': 'Bearer ' + token } })
        .then(result => {
          if (result.data === 'Flight created succsesfully') {
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
            isAddFlight: true,
            isEditFlight: false
          })
        });
    }
  }

  editFlight = (flightId) => {

    let token = localStorage.getItem('airlineCompany');
    axios.get(BaseUrl.url + '/api/AirlineCompanyFacade/getFlightByFlightId/' + flightId, { headers: { 'Authorization': 'Bearer ' + token } })
      .then((result) => {
        // this.props.addCountriesAction(countries);
        this.setState({
          isEditFlight: true,
          isAddFlight: false,
          flightData: result.data
        });
        console.log("CountriesData from EditFlight kkkk: " + JSON.stringify(this.state.countriesData))
        console.log("flightData: " + JSON.stringify(this.state.flightData))
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
    this.setState({ isAddFlight: false });
    this.setState({ isEditFlight: false });
    this.setState({ flightData: {} });
  }
  onDetails(view) {
    if (view === 'ListView')
      this.setState({ isAddFlight: true });
    this.setState({ isEditFlight: false });
  }

  render() {

    let flightForm;
    if (!this.state.isAddFlight || this.state.isEditFlight) {

      flightForm = <AddFlight onFormSubmit={this.onFormSubmit} flight={this.state.flightData} countries={this.state.countriesData} ListView={this.onDetails.bind(this, 'ListView')} />

    }


    return (
      <div className="content1" style={{width: '100%'}}>
      <Container>
        <h1 style={{ textAlign: 'center' }}>CRUD operation on flights</h1>

        {this.state.isAddFlight && <Button className="addBtn" variant="primary" style={{ borderRadius: 0 }} onClick={() => this.onCreate()}>Add Flight</Button>}
        <br></br>
        {this.state.isAddFlight && <FlightList editFlight={this.editFlight} />}
        {flightForm}
        </Container>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch)
    // addCountriesAction: bindActionCreators(addCountriesAction, dispatch)
  }
}
export default connect(null, mapDispatchToProps)(ActionsOnFlights);
