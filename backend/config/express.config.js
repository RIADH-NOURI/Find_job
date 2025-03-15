import express from 'express';
import cors from 'cors';

const expressConfig = (app) => {
    app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, 
}));
};


export default expressConfig;