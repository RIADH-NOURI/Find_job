
import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../config/customBaseQuery";
import { Jobs } from "@/types";


interface jobsData {
  jobs : Jobs[];
}
interface Application {
    id: number;
    candidateName: string;
    status: string;
    appliedAt: Date;
  }
  
export const recruitersApi = createApi(
    {
        reducerPath: "recruitersApi",
        baseQuery: customBaseQuery ,
        tagTypes: ["Recruiter","jobs"],
        endpoints: (builder) => ({
           getCompanyBySearch: builder.query({
               query: (search) => `/companies?search=${search}`,
               keepUnusedDataFor: 0,
           }),
           getRecruiterById :builder.query({
               query: (id) => `/recruiter/${id}`
           }),
           getApplicationsByRecruiterId: builder.query<Application[], { id: number; limit: number; page: number }>({
            query: ({ id, limit, page }) => ({
              url: `/recruiter/${id}/applications`,
              params: { limit, page },
            }),
            providesTags: ['Recruiter'],
          }),
           getJobsByRecruiterId: builder.query<jobsData, number>({
             query: (id) =>({
                url:`/recruiter/jobs/${id}`
             }),
             providesTags:['jobs']
         }),
         createJobForRecruiter: builder.mutation({
             query: ({...data}) => ({
                 url: "/create/job",
                 method: "POST",
                 body: data,
             }),
             invalidatesTags:['jobs']
         }),
         updateStatusApplication: builder.mutation({
             query: ({applicationId,...data}) => ({
                 url: `/application/${applicationId}/status`,
                 method: "PUT",
                 body: data,
             }),
             invalidatesTags:['Recruiter']
         }),
         updateRecruiter: builder.mutation({
                query: ({id,...data}) => ({
                    url: `/recruiter/${id}`,
                    method: "PUT",
                    body: data,
                }),
                invalidatesTags:['Recruiter']
         }),
         deleteRecruiterById : builder.mutation({
                query: (id) => ({
                    url: `/recruiter/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags:['Recruiter']
            }),
            deleteJobById : builder.mutation({
                query: (id) => ({
                    url: `/delete/job/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags:['jobs']
            }),
        }),
    }
)

export const {useDeleteJobByIdMutation,  useGetCompanyBySearchQuery, useGetRecruiterByIdQuery, useGetApplicationsByRecruiterIdQuery ,useGetJobsByRecruiterIdQuery,useCreateJobForRecruiterMutation,useUpdateStatusApplicationMutation,useDeleteRecruiterByIdMutation,useUpdateRecruiterMutation} = recruitersApi;