import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Inbox from './AdminPages/Inbox';
import ModifyAdministrators from './AdminPages/ModifyAdministrators';
import ModifyAirlines from './AdminPages/ModifyAirlines';
import ModifyCustomers from './AdminPages/ModifyCustomers';
import AdminNav from '../Administrator/AdminNav';
import { history } from '../../../history';

class AdministratorPage extends Component {

    render() {
        return (
            <React.Fragment>
                <AdminNav />
                <Router history={history}>
                    <Switch>
                        <Route exact path="/AdministratorPage/Inbox/" component={Inbox} />
                        <Route exact path="/AdministratorPage/ModifyAdministrators/" component={ModifyAdministrators} />
                        <Route exact path="/AdministratorPage/ModifyAirlines/" component={ModifyAirlines} />
                        <Route exact path="/AdministratorPage/ModifyCustomers/" component={ModifyCustomers} />
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}
export default AdministratorPage;