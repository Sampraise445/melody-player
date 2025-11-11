/* eslint-disable implicit-arrow-linebreak */
// src/redux/services/shazamCore.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const youtubeLiteApi = createApi({
  reducerPath: 'youtubeLiteApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://youtube-v3-lite.p.rapidapi.com/', // ✅ add trailing slash
    prepareHeaders: (headers) => {
      headers.set(
        'x-rapidapi-key',
        'cd9de67b45msh5651a3dc258d6c2p151178jsn30f8b0820073'
      );
      headers.set('x-rapidapi-host', 'youtube-v3-lite.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Correct endpoint syntax for "Most Popular" videos
    getTopCharts: builder.query({
      query: (region = 'US') =>
        `videos?chart=mostPopular&regionCode=${region}&part=id,snippet&maxResults=20`,
    }),
  }),
});

export const { useGetTopChartsQuery } = youtubeLiteApi;
 