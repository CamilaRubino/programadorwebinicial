var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//TAREA paso 1//
var contactoRouter = require('./routes/contacto');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//TAREA paso 2//
app.use('/contacto', contactoRouter);


/*TAREA*/
app.get('/distribuidoramadeira',function(req,res,next){
  res.send('Hola, soy la página de Distribuidora Madeira')
})

app.get('/productos',function(req,res,next){
  res.send('En esta página encontrarás todos nuestros productos')
})

app.get('/nosotros',function(req,res,next){
  res.send('Hola, en esta página encontrarás a los integrantes de la empresa')
})

app.get('/contacto',function(req,res,next){
  res.send('En esta página encontrá un formulario para poder ponerse en contacto con nosotros')
})

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

module.exports = app;
