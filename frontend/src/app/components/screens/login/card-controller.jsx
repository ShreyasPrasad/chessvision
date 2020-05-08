import React, {useState} from 'react';
import styles from './card-controller-styles.js';
import withStyles from 'react-jss';

//import individual card components from ./account-cards
import LoginCard from "./account-cards/login-card/login-card";
import SignupCard from "./account-cards/signup-card/signup-card";

function CardController(props) {
  const [selectedCard, setSelectedCard] = useState('login');
  const commonErrorProps = {
    errorField: props.errorField, errorMessage: props.errorMessage, setErrorState: props.setErrorState
  }
  const getSelectedCard = () => {
    switch(selectedCard){
      case 'signup':
        return <SignupCard 
          selectCard={setSelectedCard} 
          loading={props.signupLoading} 
          createAccount={props.createAccount}
          {...commonErrorProps}/>
      case 'login':
      default:
        return <LoginCard 
          selectCard={setSelectedCard} 
          loading={props.loginLoading} 
          processLogin={props.processLogin}
          {...commonErrorProps}/>
    }
  }
  return (
    <div className={props.classes.cardController}>
      {getSelectedCard()}
    </div> 
  );
}

export default withStyles(styles)(CardController);


