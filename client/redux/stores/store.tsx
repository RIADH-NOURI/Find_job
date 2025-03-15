
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../apis/public/auth";
import { usersApi } from "../apis/private/userApi";
import { experiencesApi } from "../apis/private/experiencesUserApi";
import { jobsApi } from "../apis/private/jobsApi";
import { recruitersApi } from "../apis/private/recruiterApi";
import { applicationsApi } from "../apis/private/applicationApi";
import { notificationApi } from "../apis/private/notificationsApi";



export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [experiencesApi.reducerPath]: experiencesApi.reducer,
        [jobsApi.reducerPath]: jobsApi.reducer,
        [recruitersApi.reducerPath]: recruitersApi.reducer,
        [applicationsApi.reducerPath]: applicationsApi.reducer,
        [notificationApi.reducerPath]: notificationApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware,
        usersApi.middleware,
        experiencesApi.middleware,
        jobsApi.middleware,
        recruitersApi.middleware,
        applicationsApi.middleware,
        notificationApi.middleware,
    )
    
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;