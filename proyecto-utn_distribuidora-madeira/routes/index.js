var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;


/* pasa a ser una función asincrónica*/
router.get('/', async function(req, res, next) {

 var novedades = await novedadesModel.getNovedades();
 
 novedades = novedades.splice(0, 5); //seleccionamos los primeros 5 elementos del array
 
 novedades = novedades.map(novedad => {
  if (novedad.img_id) {
    const imagen =cloudinary.url(novedad.img_id, {
      width: 460,
      crop: 'fill'
    });
    
    return {
      ...novedad,
      imagen
    }
  } else {
    return {
      ...novedad,
      imagen: '/img/noimage.jpg'
    }
  }  
 });

  res.render('index', {
    novedades
  });
});

router.post('/', async(req, res, next) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  console.log(req.body)

  var obj = {
    to: 'camiinahiir@gmail.com',
    subject: 'Contacto desde la web',
    html: nombre + " " + apellido + " se contacto a través de la web y quiere más información a este correo: " + email + ".<br> Además, hizo el siguiente comentario: " + mensaje + ".<br> Su telefono es " + telefono }
    // cierra var obj

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      }
  });  //cierra transporter
  
  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente'
  })   

}); //cierra petición del POST


module.exports = router;
