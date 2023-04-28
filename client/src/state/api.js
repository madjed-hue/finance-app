import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Country", "Topic", "Region"],
  endpoints: (build) => ({
    getCountry: build.query({
      query: (country) => `/api/stats?country=${country}`,
      providesTags: ["Country"],
    }),
    getTopic: build.query({
      query: (topic) => `/api/stats?topic=${topic}`,
      providesTags: ["Topic"],
    }),
    getRegion: build.query({
      query: (region) => `/api/stats?region=${region}`,
      providesTags: ["Region"],
    }),
  }),
});

// `/api/stats?country=${country}&end_year=${end_year}&sector=${sector}&topic=${topic}&region=${region}&postle=${postle}&likelihood=${likelihood}`

export const { useGetCountryQuery, useGetTopicQuery, useGetRegionQuery } = api;
