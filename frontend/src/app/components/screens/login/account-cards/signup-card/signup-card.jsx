
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './signup-card-styles.js';
import withStyles from 'react-jss';
import { Card, TextField, Button, Snackbar } from '@material-ui/core';
import {validateEmail} from "../../../../../utils/regex";

import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignUpCard(props) {
    const [signupFields, setSignupFields] = useState({username: null, password: null, confirmPassword: null, email: null})

    const onSetSignupField = (fieldName, evt)=> {
      setSignupFields({...signupFields, [fieldName]: evt.target.value})
    }

    const backToLogin = () => {
      props.setErrorState(null, null);
      props.selectCard('login');
    }

    const createAccount = () => {
      props.createAccount(signupFields.username, signupFields.email, signupFields.password);
    }

    const handleAlertClose = () => {
      //reset login error state
      props.setErrorState(null, null);
    }

    const createAccountEnabled = () => {
      //perform basic, implicit verification:
      //1. check for empty characters
      const fieldKeys = Object.keys(signupFields);
      for (const key of fieldKeys){
        if (signupFields[key]==null || signupFields[key]==""){
          return false;
        }
      }
      //2. check for valid email
      if (!validateEmail(signupFields.email)){
        return false;
      }
      //3. check for equality between password and confirm password
      if (signupFields.password!=signupFields.confirmPassword){
        return false;
      }
      return true;
    }

    return (
    <Card className={props.classes.signupCard}>
      <div className="signupTitle">
        <h2>Create Account</h2>
      </div>
      <div className="signupFields">
        <div className="usernameField">
          <TextField 
              className="username" 
              onChange={(evt)=>onSetSignupField('username', evt)} 
              value={signupFields.username} 
              label="Username" variant="outlined" />
        </div>
        <div className="emailField">
          <TextField 
              className="email" 
              onChange={(evt)=>onSetSignupField('email', evt)} 
              value={signupFields.email} 
              label="Email" 
              variant="outlined" />
        </div>
        <div className="passwordField">
          <TextField 
              className="password" 
              onChange={(evt)=>onSetSignupField('password', evt)} 
              value={signupFields.password} 
              label="Password" 
              type="password" 
              variant="outlined" />
        </div>
        <div className="confirmPasswordField">
          <TextField 
              className="confirmPassword" 
              onChange={(evt)=>onSetSignupField('confirmPassword', evt)} 
              value={signupFields.confirmPassword} 
              label="Confirm Password" 
              type="password" 
              variant="outlined" />
        </div>
      </div>
      <div className="signupSubmit">
        <Button className="signupButton" disabled={!createAccountEnabled() || props.loading} onClick={createAccount} variant="contained" color="primary">
          Create
        </Button>
        <Button className="backButton" disabled={props.loading} onClick={backToLogin} variant="outlined" color="primary">
          Back to Login
        </Button>
      </div>
      <Snackbar open={props.errorField==='signup'} anchorOrigin={{ vertical: 'top', horizontal:'center' }} autoHideDuration={4000} onClose={handleAlertClose}>
        <Alert severity="error">
          {props.errorMessage}
        </Alert>
      </Snackbar>
    </Card>
    );
  }

  
export default withStyles(styles)(SignUpCard);