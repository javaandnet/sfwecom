import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import msgRouter from './routes/msg.js';
import sfRouter from './routes/sf.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// var indexRouter = require('./routes/index.js');
// var userRouter = require('./routes/users.js');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var createError = require('http-errors');
// var logger = require('morgan');
 //hwsmtp.exmail.qq.com

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/msg', msgRouter);
app.use('/sf', sfRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
export default app;
 
