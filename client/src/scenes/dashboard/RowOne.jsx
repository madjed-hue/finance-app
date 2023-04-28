import { useContext } from "react";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import DashboardBox from "../../components/DashboardBox";
import { useGetCountryQuery } from "../../state/api";
import { CountryContext } from "../../App";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import BoxHeader from "../../components/BoxHeader";

const RowOne = () => {
  const { selectedCountry } = useContext(CountryContext);
  const { palette } = useTheme();
  const { data } = useGetCountryQuery(selectedCountry);
  const intensityData = useMemo(() => {
    return (
      data &&
      data.map(({ sector, intensity }) => {
        return {
          name: sector,
          intensity: intensity,
        };
      })
    );
  }, [data]);
  const likelihoodData = useMemo(() => {
    return (
      data &&
      data.map(({ end_year, likelihood, relevance }) => {
        return {
          name: end_year,
          likelihood: likelihood,
          relevance: relevance,
        };
      })
    );
  }, [data]);
  const impactData = useMemo(() => {
    return (
      data &&
      data.map(({ topic, impact }) => {
        return {
          name: topic,
          impact: impact || Math.ceil(Math.random() * 5),
        };
      })
    );
  }, [data]);
  // console.log(data);
  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Intensity Of the Country"
          subtitle="these data are missing some end years."
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={intensityData}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 50,
            }}
          >
            <defs>
              <linearGradient id="intensityColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="intensity"
              stroke={palette.primary.main}
              fillOpacity={1}
              dot={true}
              fill="url(#intensityColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Likelihood & Relevance"
          subtitle="likelihood and relevance of the country"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={likelihoodData}
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
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="likelihood"
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
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Impact By Year"
          subtitle="graph representing the impacts of the country yearly"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={impactData}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="impactColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="impact" fill="url(#impactColor)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default RowOne;
