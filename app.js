const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

// Body parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Other config
app.use(cors());
app.use(helmet());
app.use(morgan());

// Routes
app.use(require('./routes/auth.todo'));
app.use('/todo', require('./routes/todo.route'));

module.exports = app;