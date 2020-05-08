import React from 'react';
import AppPage from './containers/AppPage';

//inject global themeprovider and theme
import { ThemeProvider } from "react-jss";
import {MUITheme, theme} from "./theme"

import { ThemeProvider as MUIThemeProvider} from '@material-ui/core/styles';

export default function Routes() {

  //retrieve user data first if auth cookie exists

  return (
    <MUIThemeProvider theme={MUITheme}>
      <ThemeProvider theme={theme}>
        <AppPage/>
      </ThemeProvider>
    </MUIThemeProvider>   
  );
}
