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

/* eliminar novedad*/ 
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades')
  
}); //cierra get de eliminar


/* para que se vea el formulario de agregar*/ 
router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', { //agregar.hbs
    layout: 'admin/layout'
  }) //cierra el render
}); //cierra el get

router.post('/agregar', async (req, res, next) => {
  try {
    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await novedadesModel.insertNovedad(req.body);
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
      console.log(error)
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'No se cargo novedad'
      })
  }
})

//modificar novedad
router.get('/modificar/:id', async function(req, res, next) { 
  var id = req.params.id; //genero la variable que almacena el numero de la novedad

  console.log(req.params.id)

  var novedad = await novedadesModel.getNovedadById(id);
  res.render('admin/modificar', { //modificar.hbs
    layout:'admin/layout',  
    novedad
  });  
});

// abro post
router.post('/modificar', async (req, res, next) => {
  try {
    //console.log(req.body.id); // para ver si trae el id
    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo0
    }

    console.log(obj) // para ver si trae los datos

    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modifico la novedad'
    })
  } // cierro catch
}) // cierro post


module.exports = router;