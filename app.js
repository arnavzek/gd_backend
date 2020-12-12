// Environment Variables
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const express = require('express');
const routeHandeller = require('./routeHandeller');

const app = express();

// DB Setup
const connectDB = require('./config/db');
connectDB();

// Middlewares
app.use(express.json());

// PORT
const PORT = process.env.PORT || 5001;

// Route Handeller
app.get('/', (req, res) => res.status(403).send('Please use /v1/ route for accessing the API'));
app.use('/v1/', routeHandeller);
// 404 Error
app.use('*', (req, res) =>
  res.status(404).json({ status: 'error', message: 'API Endpoint Not Found' }),
);

// Start The Server
app.listen(
  PORT,
  console.log(
    `The Server Has Started In '${process.env.NODE_ENV}' mode on PORT ${process.env.PORT}`,
  ),
);
