
/* ++++++++++ --------------- EXPORT --------------- ++++++++++ */
// GAME : STYLES
// utliizes CSS-IN-JS (react-jss) (JS objects converted to CSS using a library)

export default theme => ({
    matchController: {
      width: '500px',
      height: '500px',
      '& .matchPieceSelector': {
          marginTop: "30px",
          marginBottom: "30px",
          fontSize: "32px",
          
          '& .whitePieceSelections': {
              marginBottom: '15px',
              '& a>svg': {
                color: '#fff !important',
              }
          },
          '& .blackPieceSelections>a>svg': {
              color: '#000 !important'
          }
      }
    },
  })