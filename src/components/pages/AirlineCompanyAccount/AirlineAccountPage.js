import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ModifyFlights from './AirlineCompanyPages/ModifyFlights';
import ModifyCompany from './AirlineCompanyPages/ModifyCompany';
import CompanyNav from '../AirlineCompanyAccount/CompanyNav';
import { history } from '../../../history';

class AirlineAccountPage extends Component {

    render() {
        return (
            <React.Fragment>
                <Router history={history}>
                <CompanyNav />
                    <Switch>
                        <Route exact path="/AirlineAccountPage/ModifyFlights" component={ModifyFlights} />
                        <Route exact path="/AirlineAccountPage/ModifyCompany" component={ModifyCompany} />
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}
export default AirlineAccountPage;