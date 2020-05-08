import React, { ReactNode, useEffect } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../../constants/routes.json';
import PrivateRoute from '../../constants/routing/privateroute';

//import individual page container components 
import LoginPage from '../../containers/LoginPage';
import GamePage from '../../containers/GamePage';
import { USER_AUTHENTICATED, USER_AUTHENTICATING } from '../../actions/user/user';

export default function App(props) {
  const { children } = props;
  useEffect(() => {
    props.authUser();
  }, []);

  //add 404 page later
  return <div className="app">
        {props.authState === USER_AUTHENTICATING ? null :
            <Switch>
                <PrivateRoute permitted={props.authState===USER_AUTHENTICATED} exact path={routes.GAME} component={GamePage} />
                <Route exact path={routes.LOGIN} component={LoginPage} />
                <Redirect to="/login" />
            </Switch>}
  </div>;
}
