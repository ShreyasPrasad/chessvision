import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './login-card-styles.js';
import withStyles from 'react-jss';
import MuiAlert from '@material-ui/lab/Alert';
import { Card, TextField, Button, Snackbar,  } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LoginCard(props) {
  const [loginFields, setLoginFields] = useState({username: null, password: null});

  const onSetLoginField = (fieldName, evt)=> {
    setLoginFields({...loginFields, [fieldName]: evt.target.value});
  }

  const onProcessLogin = () => {
    props.processLogin(loginFields.username, loginFields.password);
  }

  const onSelectCreateAccount = () => {
    props.setErrorState(null, null);
    props.selectCard('signup');
  }

  const handleAlertClose = () => {
    //reset login error state
    props.setErrorState(null, null);
  }

  const loginUserEnabled = () => {
    //perform basic, implicit verification:
    //1. check for empty characters
    const fieldKeys = Object.keys(loginFields);
    for (const key of fieldKeys){
      if (loginFields[key]==null || loginFields[key]==""){
        return false;
      }
    }
    return true;
  }

  return (
      <Card className={props.classes.loginCard}>
        <div className="loginTitle">
          <h2>Login</h2>
        </div>
        <div className="loginFields">
          <div className="usernameField">
             <TextField disabled={props.loading} className="username" onChange={(evt)=>onSetLoginField('username', evt)} value={loginFields.username} label="Username" variant="outlined" />
          </div>
          <div className="passwordField">
            <TextField disabled={props.loading} className="password" onChange={(evt)=>onSetLoginField('password', evt)} value={loginFields.password} label="Password" type="password" variant="outlined" />
          </div>
        </div>
        <div className="loginSubmit">
          <Button onClick={onProcessLogin} disabled={props.loading || !loginUserEnabled()} className="loginButton" variant="contained" color="primary">
            Login
          </Button>
          <Button onClick={onSelectCreateAccount} disabled={props.loading} className="createButton" variant="outlined" color="primary">
            Create Account
          </Button>
        </div>
      <Snackbar open={props.errorField==='login'} anchorOrigin={{ vertical: 'top', horizontal:'center' }} autoHideDuration={4000} onClose={handleAlertClose}>
        <Alert severity="error">
          {props.errorMessage}
        </Alert>
      </Snackbar>
      </Card>
  );
}

export default withStyles(styles)(LoginCard);


