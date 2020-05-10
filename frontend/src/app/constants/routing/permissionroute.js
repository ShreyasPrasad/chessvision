import { Route, Redirect } from 'react-router-dom';
import React from 'react';

//permission route for handling permission-requiring page components 

const PermissionRoute = ({ permitted, component: Component, redirectURL, ...rest }) => (
    <Route {...rest} render={(props) => (
        permitted 
        ? <Component {...props}/>
        : <Redirect to={{
          pathname: redirectURL,
          state: { from: props.location }
        }}
      />
    )} />
  )

export default PermissionRoute;