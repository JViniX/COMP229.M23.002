var createError = require('http-errors');
var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');

// let session = require('express-session');
// let flash = require('connect-flash');
let passport = require('passport');

let cors = require('cors');
let compression = require('compression');

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var inventoryRouter = require('../routes/inventory');

var app = express();

// Enables cors.
app.use(cors());
app.options('*', cors());

// Enable Compression
app.use(compression());
// Enable sessoions
// app.use(session({
//   saveUninitialized: true,
//   resave: true,
//   secret: "sessionSecret"
// }));

// view engine setup
// app.set('views', path.join(__dirname, '../views')); // view folder
// app.set('view engine', 'ejs'); // sets the EJS engine

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.static(path.join(__dirname, '../node_modules')));

// Sets up passport
// app.use(flash());
app.use(passport.initialize());
// app.use(passport.session());

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/inventory', inventoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.locals.title = 'Error!';
  
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json(
    {
        success: false,
        message: err.message
    }
  );
});

module.exports = app;
