
/* ++++++++++ --------------- EXPORT --------------- ++++++++++ */
// LOGIN-CARD : STYLES
// utliizes CSS-IN-JS (react-jss) (JS objects converted to CSS using a library)

export default theme => ({
    loginCard: {
        padding: '30px',
        height: '250px',
        '& .loginTitle': {
          marginBottom: '20px',
          '& h2': {
            color: theme.colorDark,
            fontSize: '30px',
          }
        },
        '& .loginFields': {
          display: 'block',
          '& .usernameField>.username,.passwordField>.password': {
            width: '100%'
          },
          '& .usernameField': {
            marginBottom: '10px'
          }
        },
        '& .loginSubmit': {
           marginTop: '20px',
          '& .loginButton,.createButton': {
            width: '100%'
          }, 
          '& .loginButton':{
            marginBottom: '10px'
          }

        }
      },
  })