import React, { ReactNode, useEffect } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../../constants/routes.json';
import PrivateRoute from '../../constants/routing/privateroute';
import PermissionRoute from "../../constants/routing/permissionroute"

//import individual page container components 
import LoginPage from '../../containers/LoginPage';
import Dashboard from '../../components/screens/dashboard/dashboard';
import { USER_AUTHENTICATED, USER_AUTHENTICATING, USER_NOT_AUTHENTICATED } from '../../actions/user/user';

export default function App(props) {
  const { children } = props;
  useEffect(() => {
    props.authUserWithCSRF();
  }, []);

  //add 404 page later
  return <div className="app">
        {props.authState === USER_AUTHENTICATING ? null :
            <Switch>
                <PrivateRoute permitted={props.authState===USER_AUTHENTICATED} exact path={routes.GAME} component={Dashboard} />
                <PermissionRoute permitted={props.authState===USER_NOT_AUTHENTICATED} exact path={routes.LOGIN} component={LoginPage} redirectURL={'/game'}/>
                <Redirect to="/login" />
            </Switch>}
  </div>;
}
