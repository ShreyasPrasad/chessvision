
/* ++++++++++ --------------- EXPORT --------------- ++++++++++ */
// HEADER : STYLES
// utliizes CSS-IN-JS (react-jss) (JS objects converted to CSS using a library)

export default theme => ({
    header: {
        "& header>div": {
            display: 'flex',
            justifyContent: 'space-between',
            "& .logo": {
                width: '200px'
            }
        }
       
    }
  })