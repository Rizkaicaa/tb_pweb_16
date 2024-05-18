var express = require('express');
var router = express.Router();
const auth = require("../controller/auth.controller.js");

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/not-found', function(req, res, next) {
  res.render('notfound');
});


// Rute untuk menampilkan halaman ubahPassword.ejs
router.get('/ubahPassword', function(req, res) {
  res.render('ubahPassword', { title: 'Ubah Password' }); // Menggunakan fungsi render untuk menampilkan halaman EJS
});


module.exports = router;
