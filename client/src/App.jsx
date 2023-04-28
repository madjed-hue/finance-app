/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./scenes/navbar";
import Dashboard from "./scenes/dashboard";
import { createContext } from "react";

export const CountryContext = createContext();

const App = () => {
  const theme = useMemo(() => createTheme(themeSettings), []);
  const [selectedCountry, setSelectedCountry] = useState(
    "United States of America"
  );
  const [selectedTopic, setSelectedTopic] = useState("oil");
  const [selectedSector, setSelectedSector] = useState("Energy");
  const [selectedRegion, setSelectedRegion] = useState("Eastern Asia");
  const value = {
    selectedCountry,
    setSelectedCountry,
    selectedTopic,
    setSelectedTopic,
    selectedSector,
    setSelectedSector,
    selectedRegion,
    setSelectedRegion,
  };
  return (
    <div className="app">
      <CountryContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Dashboard />
          </Box>
        </ThemeProvider>
      </CountryContext.Provider>
    </div>
  );
};

export default App;
