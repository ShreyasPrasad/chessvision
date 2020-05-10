
/* ++++++++++ --------------- EXPORT --------------- ++++++++++ */
// PLAYERCARD : STYLES
// utliizes CSS-IN-JS (react-jss) (JS objects converted to CSS using a library)

export default theme => ({
    playerCard: {
      width: '400px',
      height: '50px', 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& .playerName>h2': {
          color: theme.colorMediumLight
      },
      '& .playerRating>h4': {
        color: theme.colorGreen
    }
    },
  })