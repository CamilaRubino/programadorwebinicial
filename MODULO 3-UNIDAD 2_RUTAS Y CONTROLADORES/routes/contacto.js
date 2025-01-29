var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.send('Hola soy la pagina de contacto');

res.render('contacto'); // contacto.hbs (donde voy a trabajar html-css)
});

module.exports = router;
