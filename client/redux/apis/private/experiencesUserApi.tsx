import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../config/customBaseQuery";

export const experiencesApi = createApi(
    {
        reducerPath: "experiencesApi",
        baseQuery: customBaseQuery,
        tagTypes: ["Experiences"],
        endpoints: (builder) => ({
           getExperiencesByUserId: builder.query({
               query: (id) => ({
                url:`/user/${id}/experiences`
               }),
               providesTags:['Experiences']
           }),
           getExperiencesByUserName: builder.query({
            query: (name) => ({
             url:`/user/name/${name}/experiences`
            }),
            providesTags:['Experiences']
        }),

           createExperiences: builder.mutation({
               query: ({...data}) => ({
                   url: "/create/experience",
                   method: "POST",
                   body: data,
               }),
               invalidatesTags:['Experiences']
           }),
           updateExperiences: builder.mutation({
               query: (data) => ({
                   url: "/update/experience",
                   method: "PUT",
                   body: JSON.stringify(data),
               })
           }),
           deleteExperiences: builder.mutation({
             query: (experienceId) => ({
                 url: `/experience/${experienceId}`,
                 method: "DELETE",
             }),
             invalidatesTags:['Experiences']
           }),
           getExperiencesCountByUserId: builder.query({
             query: (id) => ({
                 url:`/experiences/count/${id}`
             }),
             providesTags:['Experiences']
         }),

        }),
    }
)

export const { useGetExperiencesByUserIdQuery, useCreateExperiencesMutation, useUpdateExperiencesMutation, useDeleteExperiencesMutation, useGetExperiencesCountByUserIdQuery, useGetExperiencesByUserNameQuery } = experiencesApi;