import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../config/customBaseQuery";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: customBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/id/${id}`,
      }),
      providesTags: ["User"],
    }),
    getUserByName: builder.query({
      query: (name) => ({
        url: `/user/name/${name}`,
      }),
      providesTags: ["User"],
    }),
    getApplicationByUserId: builder.query({
      query: (id) => `/user/${id}/applications`,
    }),
    getApplicationByUserName: builder.query({
      query: (name) => `/user/${name}/applications`,
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfileImage: builder.mutation({
        query: ({ id, formData }) => ({
          url: `/user/${id}/upload`,
          method: "POST",
          body: formData, 
        }),
        invalidatesTags: ["User"],
      }),
    }),
  })

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetUserByNameQuery,
  useCreateUserMutation,
  useGetApplicationByUserIdQuery,
  useUpdateUserMutation,
  useUpdateProfileImageMutation,
  useGetApplicationByUserNameQuery,
} = usersApi;
