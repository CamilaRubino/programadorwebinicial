var express = require('express');
var router = express.Router();


/* GET home page. DISEÑO*/ 
router.get('/', function(req, res, next) {
  res.render('admin/novedades', { //aca va a llamar a novedades.hbs
    layout:'admin/layout',  
    usuario: req.session.nombre

  });  
});

module.exports = router;