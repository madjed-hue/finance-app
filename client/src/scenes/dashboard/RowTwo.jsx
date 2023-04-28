/* eslint-disable no-unused-vars */
import { useContext, useEffect, useMemo, useState } from "react";
import DashboardBox from "../../components/DashboardBox";
import { useGetTopicQuery } from "../../state/api";
import { CountryContext } from "../../App";
import BoxHeader from "../../components/BoxHeader";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { useTheme } from "@emotion/react";
import FlexBetween from "../../components/FlexBetween";
import { Box, Typography } from "@mui/material";

const RowTwo = () => {
  const { palette } = useTheme();
  const { selectedTopic, selectedCountry } = useContext(CountryContext);
  const { data } = useGetTopicQuery(selectedTopic);
  const pieColors = [palette.primary[800], palette.primary[300]];
  const [pestle, setPestle] = useState([]);
  const intensityData = useMemo(() => {
    return (
      data &&
      data.map(({ country, intensity, relevance }) => {
        return {
          name: country,
          intensity: intensity,
          relevance: relevance,
        };
      })
    );
  }, [data]);

  const groupedCountryData = useMemo(() => {
    return (
      data &&
      data.reduce((group, statistic) => {
        const { country } = statistic;
        if (country) {
          group[country] = group[country] ?? [];
          group[country].push(statistic);
        }

        return group;
      }, {})
    );
  }, [data]);

  const groupedPestelData = useMemo(() => {
    const unique =
      groupedCountryData &&
      groupedCountryData[selectedCountry]?.filter(
        (obj, index) =>
          groupedCountryData[selectedCountry].findIndex(
            (item) => item.pestle === obj.pestle
          ) === index
      );
    setPestle(unique);
    return unique;
  }, [groupedCountryData, selectedCountry]);

  const groupedIntensityData = useMemo(() => {
    return (
      groupedCountryData &&
      groupedCountryData[selectedCountry]?.reduce((accumulator, object) => {
        return accumulator + object.intensity;
      }, 0)
    );
  }, [groupedCountryData, selectedCountry]);

  const groupedLiklihoodData = useMemo(() => {
    return (
      groupedCountryData &&
      groupedCountryData[selectedCountry]?.reduce((accumulator, object) => {
        return accumulator + object.likelihood;
      }, 0)
    );
  }, [groupedCountryData, selectedCountry]);

  const scatterData = useMemo(() => {
    return (
      groupedCountryData &&
      groupedCountryData[selectedCountry]?.map(({ _id, impact, relevance }) => {
        return {
          id: _id,
          impact: impact,
          relevance: relevance,
        };
      })
    );
  }, [groupedCountryData, selectedCountry]);

  const pieData = [
    { name: "Group A", value: groupedIntensityData },
    { name: "Group B", value: groupedLiklihoodData },
  ];

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Intensity & Relevance"
          subtitle="Intensity and relevance of the countries by Topic"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={intensityData}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />

            <Line
              yAxisId="left"
              type="Intensity"
              dataKey="intensity"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="relevance"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader title="Intensity and Liklihood" sideText="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box flexBasis="60%" textAlign="center">
            <Box style={{ display: "flex", justifyContent: "space-around" }}>
              <Box>
                <Typography variant="h5">Intensity</Typography>
                <Typography
                  m="0.3rem 0"
                  variant="h3"
                  color={palette.primary[300]}
                >
                  {groupedIntensityData ? groupedIntensityData : 0}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5">Liklihood</Typography>
                <Typography
                  m="0.3rem 0"
                  variant="h3"
                  color={palette.primary[300]}
                >
                  {groupedLiklihoodData ? groupedLiklihoodData : 0}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {pestle?.length &&
                pestle?.map((item) => (
                  <Typography variant="h6" key={item.pestle} mr={1}>
                    {item.pestle}
                  </Typography>
                ))}
            </Box>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader title="Impact and Relevance Ratio" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              dataKey="impact"
              name="impact"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              dataKey="relevance"
              name="relevance"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip />
            <Scatter
              name="Impact and Relevance Ratio"
              data={scatterData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default RowTwo;
