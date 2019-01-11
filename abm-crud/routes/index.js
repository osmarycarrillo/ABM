var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');
let user = fs.readFileSync('file.json');
user = JSON.parse(user);

/* GET home page. */

//rutas publicas
router.get('/ping', function(req, res) {
  res.sendFile(path.join (__dirname, '..','public','html', 'ping.html'))
});

router.get('/', function(req, res) {
  res.sendFile(path.join (__dirname, '..','public','html', 'index.html'))
});

router.get('/consulta', function(req, res) {
  res.sendFile(path.join (__dirname, '..','public','html', 'consult.html'))
});

router.get('/nuevo', function(req, res) {
  res.sendFile(path.join (__dirname, '..','public','html', 'new_user.html'))
});

router.get('/editar', function(req, res) {
  res.sendFile(path.join (__dirname, '..','public','html', 'edit.html'))
});

//traer datos
//rutas del servidor
router.get('/api/consulta', function(req, res){
  res.json(user);
})

//para guardar
//crear usuario
router.post('/api/nuevo', function(req, res){
  let usuario = req.body
  if (user.length == 0){
    usuario={
      name: usuario.name,
      surname: usuario.surname,
      phone: usuario.phone,
      mail: usuario.mail,
      id: 1
    }
  }else {
    const newId = user.length === 0 ? (1) : (user[user.length - 1].id + 1);
    usuario.id= newId;
  }
  user.push(usuario);
  fs.writeFileSync('file.json', JSON.stringify(user));
  res.json(user);
})

//EDITAR
router.get('/api/editar/:id', function(req, res){
  let id = req.params.id;
  
  for (let i = 0; i < user.length; i++) {
    const currentUser = user[i]
    if (currentUser.id == id) {
  res.json(currentUser);
    }
  }
})

router.put('/api/editar/:id', function (req, res) {
  let id = req.params.id;
  let body = req.body;
  const bodyKeys = Object.keys(body);
  for (let i = 0; i < user.length; i++) {
    const currentUser = user[i]
    if (currentUser.id == id) {
      const usersKeys = Object.keys(currentUser)

      for (x = 0; x < bodyKeys.length; x++) {
        const currentBodyKey = bodyKeys[x]
        if (usersKeys.indexOf(currentBodyKey) > -1) {
          currentUser[currentBodyKey] = body[currentBodyKey]
        } else {
          console.log(`${currentBodyKey} no es una clave válida`)
        }
      }
      return res.json(currentUser)
    }
  }

});

//BORRAR USUARIOS
router.delete('/api/consulta/:id', function(req, res){
  const id = req.params.id;
  for (let i = 0; i < user; i++){
    if (user[i].id == id){
      user.splice(i, 1);
    }
  }
  res.send('ok');
})


//buscar input
router.get('/api/consulta', function(req, res){
  const busqueda = req.query.search;
  if(busqueda && busqueda.length > 0){
    user = user.filter(function (u) {
      return u.name.toLowerCase().indexOf(busqueda.toLowerCase())>=0||
      u.surname.toLowerCase().indexOf(busqueda.toLowerCase()) >= 0 ||
      u.phone.toLowerCase().indexOf(busqueda.toLowerCase()) >= 0 ||
      u.mail.toLowerCase().indexOf(busqueda.toLowerCase()) >= 0
    });
 
  }

  res.json(user);
})



//tienes que construir los methods. te falta el get para ver los usuarios que creas
module.exports = router;








