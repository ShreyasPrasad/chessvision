import { Route, Redirect } from 'react-router-dom';
import React from 'react';

//private route for handling permission-requiring components 

const PrivateRoute = ({ permitted, component: Component, ...rest }) => (
    <Route {...rest} render={({location}) => (
        permitted 
        ? <Component {...props} />
        : <Redirect to={{
          pathname: "/login",
          state: { from: location }
        }}
      />
    )} />
  )

export default PrivateRoute;