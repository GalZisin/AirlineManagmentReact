import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateCompanyRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('airlineCompany')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)