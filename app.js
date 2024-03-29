// Environment Variables
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const routeHandeller = require('./routeHandeller');
const ErrorHandeller = require('./middlewares/ErrorHandeller');
const AppError = require('./utils/AppError');

const app = express();

// DB Setup
const connectDB = require('./config/db');
connectDB();

// Middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

// PORT
const PORT = process.env.PORT || 5001;

// Route Handeller
app.get('/', (req, res) => {
  throw new AppError(400, 'Please use /v1/ route for accessing the API');
});

app.use('/v1/', routeHandeller);

// 404 Error
app.use('*', (req, res) => {
  throw new AppError(404, "API Endpoint Doesn't Exists");
});

// Setup Error Handeller
app.use(ErrorHandeller);

// Start The Server
app.listen(
  PORT,
  console.log(
    `🚀🚀 The Server Has Started In '${process.env.NODE_ENV}' mode on PORT ${process.env.PORT}`,
  ),
);
