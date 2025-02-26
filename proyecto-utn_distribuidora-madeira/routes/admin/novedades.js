var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');


/* listar las  novedades. DISEÑO*/ 
router.get('/', async function(req, res, next) { /*pasa a ser asincronica*/

  var novedades = await novedadesModel.getNovedades();

  res.render('admin/novedades', { //aca va a llamar a novedades.hbs
    layout:'admin/layout',  
    usuario: req.session.nombre,
    novedades

  });  
});

/* eliminar noticia*/ 
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades')
  
});

module.exports = router;