const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoRoutes = require('./app/routes/lead.routes');
const {http_formatter} = require('./_util/Formtter');
const { StatusCodes } = require('http-status-codes');
const businessRoutes = require('./app/routes/business.routes');
const app = express();
dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.use(express.json());

app.get('/', (req, res) => res.json({ 'message': 'server is running' }));
app.use('/api/auth', todoRoutes);
app.use('/api', businessRoutes);

app.use((req, res, next) => {
  const error = new Error('Invalid request');
  res.status = StatusCodes.NOT_FOUND; // not found.
  next(error);
});

// this is the last route that will get hit, if there's no matching route or some error has occurred.
app.use((error, req, res, next) => {
  res.status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
  return res.json(
      http_formatter(error, error.message, false)
  );
})
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
