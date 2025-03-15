import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../config/customBaseQuery";
export const applicationsApi = createApi(
    {
        reducerPath: "applicationsApi",
        baseQuery: customBaseQuery,
        tagTypes: ["Application"],
        endpoints: (builder) => ({
            createApplication: builder.mutation({
                query: (data) => ({
                    url: "/create/application",
                    method: "POST",
                    body: data,
                }),
                invalidatesTags: ["Application"],
            }),
            getApplicationsCountByUserId: builder.query({
                query: (id) => ({
                    url:`/applications/count/${id}`
                }),
                providesTags:['Application']
            }),
   
           
        }),
    }
)

export const { useCreateApplicationMutation,useGetApplicationsCountByUserIdQuery } = applicationsApi;
