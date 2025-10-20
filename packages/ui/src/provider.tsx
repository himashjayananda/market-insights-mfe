import { type PropsWithChildren } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
