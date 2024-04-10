import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Router from "./route/Router";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode); // หลัง state ตามด้วยชื่อ reducer ใน store
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
