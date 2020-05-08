
/* ++++++++++ --------------- EXPORT --------------- ++++++++++ */
// SIGNUP-CARD : STYLES
// utliizes CSS-IN-JS (react-jss) (JS objects converted to CSS using a library)

export default theme => ({
    signupCard: {
        padding: '30px',
        height: '400px',
        '& .signupTitle': {
          marginBottom: '20px',
          '& h2': {
            color: theme.colorDark,
            fontSize: '30px',
          }
        },
        '& .signupFields': {
          display: 'block',
          '& .usernameField>.username,.passwordField>.password,.emailField>.email,.confirmPasswordField>.confirmPassword': {
            width: '100%'
          },
          '& .usernameField, .emailField, .passwordField': {
            marginBottom: '10px'
          }
        },
        '& .signupSubmit': {
           marginTop: '20px',
          '& .signupButton,.backButton': {
            width: '100%'
          }, 
          '& .signupButton':{
            marginBottom: '10px'
          }
        }
      },
  })