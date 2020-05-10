
/* ++++++++++ --------------- EXPORT --------------- ++++++++++ */
// DASHBOARD : STYLES
// utliizes CSS-IN-JS (react-jss) (JS objects converted to CSS using a library)

export default theme => ({
    dashboard: {
      backgroundColor: theme.colorDark,
      height: '100%',
      '& .content': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }
    }
  })