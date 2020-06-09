import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ModifyCustomer from './customerPages/ModifyCustomer';
import ModifyTicketDetails from './customerPages/ModifyTicketDetails';
import CustomerNav from '../CustomerAccount/CustomerNav';
import { history } from '../../../history';

class CustomerAccountPage extends Component {

    render() {
        return (
            <React.Fragment>
                <Router history={history}>
                    <CustomerNav />
                    <Switch>
                        <Route exact path="/CustomerAccountPage/ModifyCustomer/" component={ModifyCustomer} />
                        <Route exact path="/CustomerAccountPage/ModifyTicketDetails/" component={ModifyTicketDetails} />
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}
export default CustomerAccountPage;