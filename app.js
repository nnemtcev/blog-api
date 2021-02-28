var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const mongoDb = 'mongodb+srv://nnemtcev:Hariton12!@cluster0.8eiwn.mongodb.net/blog_api?retryWrites=true&w=majority';

mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => console.log(err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));

module.exports = app;
