var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/auth.route');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth.route');
var adminRouter = require('./routes/admin.route');
var kadepRouter = require('./routes/kadep.route');
var kalabRouter = require('./routes/kalab.route');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./node_modules/preline/dist")));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/kalab', kalabRouter);
app.use('/kadep', kadepRouter);
app.use('/uploads', express.static('uploads'));

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
