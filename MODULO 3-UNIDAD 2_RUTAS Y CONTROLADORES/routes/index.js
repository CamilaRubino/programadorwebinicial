var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' }); // index.hbs (se comunica con una vista de diseño)
});

module.exports = router;
