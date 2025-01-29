var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');//index.js(carpeta routes)
var usersRouter = require('./routes/users');

/*nosotros clase 6/1/2025*/
/*PASO 1 MANEJADOR DE RUTA*/
var contactoRouter = require('./routes/contacto'); //routes/contacto.js

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

/*nosotros clase 6/1/2025*/
/*PASO 2 ESTRUCTURA DE RUTA*/
app.use('/contacto', contactoRouter); //cuando el app usa '/contacto' va a llamar a la variable 'contactoRouter'



/*nosotros clase 6/1/2025*/
app.get('/prueba', function(req,res,next){
  res.send('Hola soy la pagina de prueba')
})

app.get('/destacados', function(req,res,next){
  res.send('Hola soy la pagina de DESTACADOS')
})

app.get('/nosotros', function(req,res,next){
  res.send('Hola soy la pagina de Nosotros')
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
