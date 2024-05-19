var express = require('express');
var router = express.Router();
const cek = require('../middleware/checktokenandrole');

router.get('/dashboard', cek('Kepala Lab'), function (req, res, next) {
  res.render('kalab/dashboard');
});

router.get('/editProfil', cek('Kepala Lab'), function (req, res, next) {
  res.render('/editProfil');
});

module.exports = router;
