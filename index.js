const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todo');

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.use(express.json());

app.get('/', (req, res) => res.json({ 'message': 'server is running' }));
app.use('/todo', todoRoutes);

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
  })
  .catch((err) => {
    console.log('Database connection failed');
    console.log(err);
  })