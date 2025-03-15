import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../config/customBaseQuery";


// Define the shape of the API response

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({ page, limit, companyType, salary, location, jobType, experienceLevel,company }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (company) params.append("company", company);
        if (companyType) params.append("companyType", companyType);
        if (salary) params.append("salary", salary.toString());
        if (location) params.append("location", location);
        if (jobType) params.append("jobType", jobType);
        if (experienceLevel) params.append("experienceLevel", experienceLevel);
        
        return `/jobs?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;