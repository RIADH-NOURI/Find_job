import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../config/customBaseQuery";


export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Notification"],
    endpoints: (builder) => ({
        getNotificationsByUserId: builder.query({
            query: (userId) => ({
                url: `/user/notifications/${userId}`,
            }),
            providesTags: ["Notification"],
        }),
        readNotification: builder.query
        ({
            query: (userId) => ({
                url: `/read/notifications/${userId}`,
            }),
            providesTags: ["Notification"],
        }),
        deleteNotification: builder.mutation({
            query: (notificationId) => ({
                url: `delete/notification/${notificationId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Notification"],
        }),
    }),
})

export const {
    useGetNotificationsByUserIdQuery,
    useReadNotificationQuery,
    useDeleteNotificationMutation,
} = notificationApi;