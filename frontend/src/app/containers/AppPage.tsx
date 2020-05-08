import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import App from '../components/screens/App';
import { authUser } from '../actions/user/user';
import { appStateType } from '../reducers/combinedType';

/* ========== ~~~~~~~~~~ GamePage: PARENT ~~~~~~~~~~ ========== */
// CONTAINER COMPONENT
// interacts with react-redux (application store)
// infuses child component (imported above) with state & actions by mapping to the component's props

function mapStateToProps({user} : appStateType) {
  return {
    authState: user.authState
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      authUser
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
