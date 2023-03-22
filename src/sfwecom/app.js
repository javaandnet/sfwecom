import express from 'express';
import serveStatic from 'serve-static';
import cors from 'cors';
import debug from 'debug';
import http from 'http';
import ejs from 'ejs';
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


var app = express();


app.use(cors());

// 開発環境のCORS対策
// if (process.env.NODE_ENV !== 'production') {
// 	app.use(cors);
// }
// view engine setup
// app.set('views', path.join(__dirname, 'web/dist'));
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//  拡張子 htm,htmlのテンプレートエンジンを指定
app.engine('htm', ejs.renderFile);  　//  <--追加
app.engine('html', ejs.renderFile);   //　<--追加

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'web/dist/')));//设置后才能取得



app.get('/',function(req, res){//get,put,post,delete   
  res.sendFile(path.join(__dirname, "./", "web", "dist","index.html"));
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/msg', msgRouter);
app.use('/sf', sfRouter);

/**
 * Listen on provided port, on all network interfaces.
 */



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
  res.write("<br>404</br>");
  // res.render('error');
});

/**
 * Normalize a port into a number, string, or false.
 */
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

app.on('error', onError);
app.on('listening', onListening);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Now app listening at http://localhost:${port}`));



 
