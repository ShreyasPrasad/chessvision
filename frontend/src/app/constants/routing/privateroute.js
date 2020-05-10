import { Route, Redirect } from 'react-router-dom';
import React from 'react';

//private route for handling login-requiring page wrappers

const PrivateRoute = ({ permitted, component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        permitted 
        ? <Component {...props} />
        : <Redirect to={{
          pathname: "/login",
          state: { from: props.location }
        }}
      />
    )} />
  )

export default PrivateRoute;