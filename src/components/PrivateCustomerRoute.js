import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateCustomerRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={props => (
        localStorage.getItem('customer')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />



)


