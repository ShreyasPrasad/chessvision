//global theme for application, allowing for access of primary and secondary application colours
// from any js styling component in the application

import { createMuiTheme } from '@material-ui/core/styles';

export const theme = {
    fontFamily: "sans-serif",
    colorDark: "#1e152a",
    colorMedium: "#4e6766",
    colorMediumLight: "#5ab1bb",
    colorGreen: "#a5c882",
    colorYellow: "#f7dd72"
};

export const MUITheme = createMuiTheme({
    palette: {
        primary: {
            light: theme.colorMedium,
            main: theme.colorDark,
            dark: theme.colorDark,
          },
          secondary: {
            main: theme.colorGreen,
            contrastText: theme.colorYellow,
          },
    },
});