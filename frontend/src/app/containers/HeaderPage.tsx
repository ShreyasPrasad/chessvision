import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/screens/dashboard/header/header';
import { logoutUser } from '../actions/user/user';
import { appStateType } from '../reducers/combinedType';

/* ========== ~~~~~~~~~~ LoginPage: PARENT ~~~~~~~~~~ ========== */
// CONTAINER COMPONENT
// interacts with react-redux (application store)
// infuses child component (imported above) with state & actions by mapping to the component's props

function mapStateToProps({user} : appStateType) {
  return {
    username: user.username
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      logoutUser
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
