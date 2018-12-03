import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const NotFoundRoute = ({isAuthenticated, component: Component, ...rest}) => (
    <Route
        {...rest}
        render={
            props =>
            <Redirect from="*" to="/" />
        }
    />
);

export default NotFoundRoute;