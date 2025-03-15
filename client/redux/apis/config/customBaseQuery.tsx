import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export default customBaseQuery;
