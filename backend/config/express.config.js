import express from 'express';
import cors from 'cors';

const expressConfig = (app) => {
    app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://find-job-topaz.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, 
}));
};


export default expressConfig;