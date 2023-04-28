/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import DashboardBox from "../../components/DashboardBox";
import { useGetRegionQuery } from "../../state/api";
import { Box, Link, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { Fragment, useContext } from "react";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import {
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { CountryContext } from "../../App";
import BoxHeader from "../../components/BoxHeader";

const RowThree = () => {
  const { selectedRegion } = useContext(CountryContext);
  const { data } = useGetRegionQuery(selectedRegion);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { palette } = useTheme();

  const regionData = [];

  data?.length &&
    data?.forEach((item) => {
      const regionInfo = {
        id: item._id,
        source: item.source,
        title: item.title,
        url: item.url,
      };
      return regionData.push(regionInfo);
    });

  const productColumns = [
    {
      field: "id",
      headerName: "id",
      flex: isAboveMediumScreens ? 0.2 : 0.3,
    },
    {
      field: "source",
      headerName: "Source",
      flex: isAboveMediumScreens ? 0.4 : 0.3,
    },
    {
      field: "url",
      headerName: "Url",
      flex: 0.1,
    },
    {
      field: "title",
      headerName: "Title",
      flex: isAboveMediumScreens ? 0.3 : 1,
    },
    {
      field: "article",
      headerName: "Article",
      flex: 0.3,
      headerAlign: "right",
      align: "right",
      renderCell: (params) => {
        return (
          <Fragment>
            <a href={`${params.row.url}`} target="_blank" rel="noreferrer">
              <InsertLinkIcon
                sx={{ color: "rgb(0 147 133)", marginRight: "10px" }}
              />
            </a>
          </Fragment>
        );
      },
    },
  ];

  var intensityRadar = [];

  data &&
    data?.reduce((res, value) => {
      if (!res[value.country]) {
        res[value.country] = {
          country: value.country,
          intensity: 0,
          relevance: 0,
        };
        intensityRadar.push(res[value.country]);
      }
      res[value.country].intensity += value.intensity;
      res[value.country].relevance += value.relevance;
      return res;
    }, {});

  console.log(intensityRadar);

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Articles"
          sideText={`${data?.length} articles`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={regionData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Relevance and Intensity"
          subtitle="relevance and intensity of countries in each region"
        />
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="40%"
            cy="40%"
            outerRadius="80%"
            data={intensityRadar}
            margin={{
              top: -10,
              right: 0,
              left: 0,
              bottom: 60,
            }}
          >
            <PolarGrid gridType="polygon" />
            <PolarAngleAxis dataKey="country" />
            <PolarRadiusAxis />
            <Radar
              name="Intensity"
              dataKey="intensity"
              stroke="#82ca9d"
              fill={palette.primary[300]}
              fillOpacity={0.6}
            />
            <Radar
              name="Relevance"
              dataKey="relevance"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="Intensity an Relevance by Region" />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PieChart
            width={400}
            height={400}
            margin={{
              top: -20,
              right: 0,
              left: 0,
              bottom: 70,
            }}
          >
            <Pie
              data={intensityRadar}
              dataKey="intensity"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
            />
            <Pie
              data={intensityRadar}
              name="country"
              dataKey="relevance"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </Box>
      </DashboardBox>
    </>
  );
};

export default RowThree;
