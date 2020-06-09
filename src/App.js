import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import { Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home/HomePage';
import AdministratorPage from './components/pages/Administrator/AdministratorPage';
import AirlineAccountPage from './components/pages/AirlineCompanyAccount/AirlineAccountPage';
import CustomerAccountPage from './components/pages/CustomerAccount/CustomerAccountPage';
import ContactPage from './components/pages/Contact/ContactPage';
import Search from './components/Search';
import { history } from './history';
import { PrivateAdminRoute } from './components/PrivateAdminRoute';
import { PrivateCustomerRoute } from './components/PrivateCustomerRoute';
import { PrivateCompanyRoute } from './components/PrivateCompanyRoute';
import PurchaseTicketPage from './components/pages/PurchchseTicket/PurchaseTicketPage';
import SelectDates from './components/pages/PurchchseTicket/SelectDates';

class App extends Component {

  render() {
    return (
        <Router history={history}>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateAdminRoute path="/AdministratorPage" component={AdministratorPage} />
              <PrivateCustomerRoute path="/CustomerAccountPage" component={CustomerAccountPage} />
              <PrivateCompanyRoute path="/AirlineAccountPage" component={AirlineAccountPage} />
              <Route path="/contacts" component={ContactPage} />
              <Route path="/Search" component={Search} />
              <Route path="/PurchaseTicketPage" component={PurchaseTicketPage} />
              <Route path="/SelectDates/:flight_id" component={SelectDates} />
            </Switch>
            <Footer />
        </Router>
    );
  }
}
export default App;