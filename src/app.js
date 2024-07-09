const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const redisClient = require('./config/redis');
const routes = require('./routes/routes');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api', routes);

module.exports = app;
