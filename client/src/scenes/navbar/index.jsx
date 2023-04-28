/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import PixIcon from "@mui/icons-material/Pix";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { CountryContext } from "../../App";

const Navbar = () => {
  const {
    setSelectedCountry,
    selectedCountry,
    setSelectedTopic,
    setSelectedRegion,
    selectedTopic,
    selectedRegion,
    setSelectedSector,
  } = useContext(CountryContext);
  const { palette } = useTheme();

  const [selected, setSelected] = useState("dashboard");
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          WorldSat
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel
              htmlFor="demo-simple-select-standard-label"
              style={{ color: palette.primary[100] }}
            >
              Country
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedCountry}
              onChange={handleCountryChange}
              label="Country"
              autoWidth={true}
              sx={{
                borderColor: palette.primary[100],
                borderWidth: "1px",
              }}
              style={{
                color: selected === "dashboard" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
              }}
            >
              <MenuItem value="United States of America">USA</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="Algeria">Algeria</MenuItem>
              <MenuItem value="Lebanon">Lebanon</MenuItem>
              <MenuItem value="China">China</MenuItem>
              <MenuItem value="Iraq">Iraq</MenuItem>
              <MenuItem value="Venezuela">Venezuela</MenuItem>
              <MenuItem value="Libya">Libya</MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="Angola">Angola</MenuItem>
              <MenuItem value="Kuwait">Kuwait</MenuItem>
              <MenuItem value="Mexico">Mexico</MenuItem>
              <MenuItem value="Estonia">Estonia</MenuItem>
              <MenuItem value="Spain">Spain</MenuItem>
              <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
              <MenuItem value="Iran">Iran</MenuItem>
              <MenuItem value="Indonesia">Indonesia</MenuItem>
              <MenuItem value="Egypt">Egypt</MenuItem>
              <MenuItem value="Russia">Russia</MenuItem>
              <MenuItem value="Brazil">Brazil</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel
              htmlFor="demo-simple-select-standard-label"
              style={{ color: palette.primary[100] }}
            >
              Topic
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedTopic}
              onChange={handleTopicChange}
              label="Topic"
              autoWidth={true}
              sx={{
                borderColor: palette.primary[100],
                borderWidth: "1px",
              }}
              style={{
                color: selected === "dashboard" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
              }}
            >
              <MenuItem value="war">War</MenuItem>
              <MenuItem value="market">Market</MenuItem>
              <MenuItem value="oil">Oil</MenuItem>
              <MenuItem value="economy">Economy</MenuItem>
              <MenuItem value="energy">Energy</MenuItem>
              <MenuItem value="demand">Demand</MenuItem>
              <MenuItem value="worker">Worker</MenuItem>
              <MenuItem value="gas">Gas</MenuItem>
              <MenuItem value="power">Power</MenuItem>
              <MenuItem value="production">Production</MenuItem>
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="infrastructure">Infrastructure</MenuItem>
              <MenuItem value="government">Government</MenuItem>
              <MenuItem value="robot">Robot</MenuItem>
              <MenuItem value="growth">Growth</MenuItem>
              <MenuItem value="policy">Policy</MenuItem>
              <MenuItem value="strategy">strategy</MenuItem>
              <MenuItem value="tourist">Tourist</MenuItem>
              <MenuItem value="population">Population</MenuItem>
              <MenuItem value="politics">Politics</MenuItem>
              <MenuItem value="export">Export</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel
              htmlFor="demo-simple-select-standard-label"
              style={{ color: palette.primary[100] }}
            >
              Region
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedRegion}
              onChange={handleRegionChange}
              label="Topic"
              autoWidth={true}
              sx={{
                borderColor: palette.primary[100],
                borderWidth: "1px",
              }}
              style={{
                color: selected === "dashboard" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
              }}
            >
              <MenuItem value="Western Asia">Western Asia</MenuItem>
              <MenuItem value="World">World</MenuItem>
              <MenuItem value="Eastern Asia">Eastern Asia</MenuItem>
              <MenuItem value="South America">South America</MenuItem>
              <MenuItem value="Northern Africa">Northern Africa</MenuItem>
              <MenuItem value="Southern Asia">Southern Asia</MenuItem>
              <MenuItem value="Central Africa">Central Africa</MenuItem>
              <MenuItem value="Europe">Europe</MenuItem>
              <MenuItem value="Central America">Central America</MenuItem>
              <MenuItem value="Northern Europe">Northern Europe</MenuItem>
              <MenuItem value="Africa">Africa</MenuItem>
              <MenuItem value="Southern Europe">Southern Europe</MenuItem>
              <MenuItem value="Western Europe">Western Europe</MenuItem>
              <MenuItem value="South-Eastern Asia">South-Eastern Asia</MenuItem>
              <MenuItem value="Eastern Europe">Eastern Europe</MenuItem>
              <MenuItem value="Central Asia">Central Asia</MenuItem>
              <MenuItem value="Asia">Asia</MenuItem>
              <MenuItem value="Southern Africa">Southern Africa</MenuItem>
              <MenuItem value="Western Africa">Western Africa</MenuItem>
              <MenuItem value="Eastern Africa">Eastern Africa</MenuItem>
              <MenuItem value="Oceania">Oceania</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
