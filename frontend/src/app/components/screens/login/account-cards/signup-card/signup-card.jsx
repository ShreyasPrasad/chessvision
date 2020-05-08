
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './signup-card-styles.js';
import withStyles from 'react-jss';
import { Card, TextField, Button } from '@material-ui/core';

function SignUpCard(props) {
    const [signupFields, setSignupFields] = useState({username: null, password: null, confirmPassword: null, email: null})

    const onSetSignupField = (fieldName, evt)=> {
      setSignupFields({...signupFields, [fieldName]: evt.target.value})
    }

    const backToLogin = () => {
      props.selectCard('login');
    }

    const createAccount = () => {
      props.createAccount(signupFields.username, signupFields.email, signupFields.password);
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
        <Button className="signupButton" onClick={createAccount} variant="contained" color="primary">
          Create
        </Button>
        <Button className="backButton" onClick={backToLogin} variant="outlined" color="primary">
          Back to Login
        </Button>
      </div>
    </Card>
    );
  }

  
export default withStyles(styles)(SignUpCard);