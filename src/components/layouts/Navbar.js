import React, { Component, Fragment } from "react";
import logo from './logo3.png';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from "sweetalert2";
// import PropTypes from 'prop-types';
import './navbar.css';
import ModalLogin from '../pages/Authentication/ModalLogin'
import CompanyRegisterModal from '../pages/Authentication/CompanyRegisterModal'
import { bindActionCreators } from 'redux'
import { addUserAction } from '../../actions/user.actions'
import Logout from '../pages/Authentication/Logout';
import '../../components/linkButton.css'
import axios from 'axios';
import { history } from '../../history';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BaseUrl } from '../../constants/BaseUrl'

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalShow: false,
      showRegisterCompanyModal: false
    }
  }
  handleMyAccountCustomer = () => {
    let customerToken = localStorage.getItem('customer');
    if (customerToken === null) {
      localStorage.setItem('customerRelogin', true)
      window.location.href = "/";
    }
  }
  handleMyAccountCompany = () => {
    let companyToken = localStorage.getItem('airlineCompany');
    if (companyToken === null) {
      localStorage.setItem('companyRelogin', true)
      window.location.href = "/";
    }

  }
  handleMyAccountAdmin = () => {
    let adminToken = localStorage.getItem('admin');
    if (adminToken === null) {
      localStorage.setItem('adminRelogin', true)
      window.location.href = "/";
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    let showCustomerReloginMessage = localStorage.getItem('customerRelogin')
    let showCompanyReloginMessage = localStorage.getItem('companyRelogin')
    let showAdminReloginMessage = localStorage.getItem('adminRelogin')
    console.log("UserReloginMessageCustomer: " + showCustomerReloginMessage)
    if (showCustomerReloginMessage) {
      Swal.fire({
        icon: 'warning',
        title: "Oops..",
        text: "Please login as Customer!",
      });
      localStorage.removeItem('customerRelogin')
    }
    if (showCompanyReloginMessage) {
      Swal.fire({
        icon: 'warning',
        title: "Oops..",
        text: "Please login as airline company!",
      });
      localStorage.removeItem('companyRelogin')
    }
    if (showAdminReloginMessage) {
      Swal.fire({
        icon: 'warning',
        title: "Oops..",
        text: "Please login as administrator!",
      });
      localStorage.removeItem('adminRelogin')
    }
    this.loadUser();

  }

  handleShowModal = () => {

    this.setState({ modalShow: true })
  }
  handleShowRegisterCompany = () => {
    this.setState({ showRegisterCompanyModal: true })
  }
  closeRegModal = () => {
    this.setState({ showRegisterCompanyModal: false })

  }
  closemymodal = (close) => {
    console.log("is close from navbar: " + JSON.stringify(close))
    if (close === 'close') {
      this.setState({ modalShow: false });
    }
  }

  // Check token & load user
  loadUser = () => {
    let token = '';
    let url = '';
    let adminToken = localStorage.getItem('admin');
    let customerToken = localStorage.getItem('customer');
    let companyToken = localStorage.getItem('airlineCompany');

    console.log("adminToken: " + adminToken)
    console.log("customerToken: " + customerToken)
    console.log("companyToken: " + companyToken)


    if (adminToken !== null && adminToken !== '') {
      token = adminToken;
      url = '/api/AdministratorFacade/getAdministratorFirstName';
    }
    else if (customerToken !== null && customerToken !== '') {
      token = customerToken;
      url = '/api/CustomerFacade/getCustomerFirstName';
    }
    else if (companyToken !== null && companyToken !== '') {
      token = companyToken
      url = '/api/AirlineCompanyFacade/getAirlineCompanyName';
    }
    else {
      return;
    }

    const instance = axios.create({
      baseURL: BaseUrl.url, headers: { 'Authorization': 'Bearer ' + token }
    });

    instance.post(url)
      .then(res => {
        this.props.addUserAction(res.data);
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Swal.fire({
            icon: 'warning',
            title: "Oops..",
            type: "error",
            text: "Your token expires, please re-login!",
          });
          localStorage.removeItem('admin');
          localStorage.removeItem('airlineCompany');
          localStorage.removeItem('customer');
          history.push('/');
        }
      })
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <li className="nav-item">
          <h3 style={{ color: 'white', marginTop: 12 }}>
            {user ? `Welcome ${user}` : ''}
          </h3>
        </li>
        <Logout />
      </Fragment>
    );

    const guestLinks = (
      <Fragment>

        <li className="nav-item">
          <NavLink className="nav-link" to="/" onClick={this.handleShowModal} data-toggle="collapse" data-target=".navbar-collapse.show">Login</NavLink>
        </li>
      </Fragment>
    );

    return (
      <header>
        <nav id="mainNavbar" className="navbar py-0 px-0 navbar-expand-xl fixed-top shadow-sm">
          <button type="button" className="navbar-brand link-button">
            <img src={logo} alt="logo" className="imgSize" />
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <i className="fa fa-arrow-down fa-3x" style={{ color: 'rgba(255,207,148,1)' }} />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto justify-content-start" style={{width: '63%'}}>
              <li className="nav-item">
                <NavLink className="nav-link" exact activeStyle={{ backgroundColor: 'rgb(206, 77, 17)' }} to="/">Home&nbsp;<i className="fas fa-home" />
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={BaseUrl.url + "/Page/FlightDeals"}>Deals</a>
              </li>
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle link-button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Flight Info
                </button>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item nav-link subColor" href={BaseUrl.url + "/Page/GetDepartureFlights"}>Departures</a>
                  <a className="dropdown-item nav-link subColor" href={BaseUrl.url + "/Page/GetLandingFlights"}>Arrivals</a>
                  <a className="dropdown-item nav-link subColor" href={BaseUrl.url + "/Page/SearchFlights"}>Search Flights</a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <button type="button" className="nav-link dropdown-toggle link-button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Accounts
                </button>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item nav-link subColor" activeStyle={{ backgroundColor: 'rgb(206, 77, 17)' }} to="/CustomerAccountPage/ModifyTicketDetails" onClick={this.handleMyAccountCustomer}>My account (Customer)</NavLink>
                  <NavLink className="dropdown-item nav-link subColor" activeStyle={{ backgroundColor: 'rgb(206, 77, 17)' }} to="/AirlineAccountPage/ModifyFlights" onClick={this.handleMyAccountCompany}>My account (Airline Company)</NavLink>
                  <NavLink className="dropdown-item nav-link subColor" activeClassName="xxx" to="/" onClick={this.handleShowRegisterCompany}>Register new Company</NavLink>
                  <NavLink className="dropdown-item nav-link subColor" activeStyle={{ backgroundColor: 'rgb(206, 77, 17)' }} to="/administratorPage/Inbox" onClick={this.handleMyAccountAdmin}>Administrator</NavLink>
                </div>
              </li>
              <li className="nav-item">
                <NavLink
                  /* data-toggle="collapse" data-target=".navbar-collapse.show" */
                  className="nav-link" exact activeStyle={{ backgroundColor: 'rgb(206, 77, 17)' }} to="/contacts">contact us</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav justify-content-end">
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </nav>
        <ModalLogin show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} onclosemodal={this.closemymodal} />
        <CompanyRegisterModal show={this.state.showRegisterCompanyModal} onHide={() => this.setState({ showRegisterCompanyModal: false })} onclosemodal={() => this.setState({ showRegisterCompanyModal: false })} />
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps: " + JSON.stringify(state))
  return {
    auth: state.auth
  }
};
function mapDispatchToProps(dispatch) {
  return {
    addUserAction: bindActionCreators(addUserAction, dispatch)
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));