import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import CardController from '../components/screens/login/card-controller.jsx';
import { processLogin, createAccount, setErrorState } from '../actions/login/login';
import { appStateType } from '../reducers/combinedType';

/* ========== ~~~~~~~~~~ LoginPage: PARENT ~~~~~~~~~~ ========== */
// CONTAINER COMPONENT
// interacts with react-redux (application store)
// infuses child component (imported above) with state & actions by mapping to the component's props

function mapStateToProps({login} : appStateType) {
  return {
    errorMessage: login.errorMessage,
    errorField: login.errorField,
    loginLoading: login.loginLoading,
    signupLoading: login.signupLoading
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      processLogin,
      createAccount,
      setErrorState
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CardController);
