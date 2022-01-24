const express = require('express');
require('dotenv').config();
const createError = require('http-errors');
const path = require('path');
const db = require('./db');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');

const app = express();

db.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(indexRouter);
app.use(registrationRouter);
app.use(loginRouter);


app.use((req, res, next) => {
    next(createError.NotFound());
    next();
});

module.exports = { app };