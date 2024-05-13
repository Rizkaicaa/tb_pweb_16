var express = require('express');
var router = express.Router();
const cek = require('../middleware/checktokenandrole');

router.get('/dashboard', cek('Kepala Departemen'), function (req, res, next) {
  res.render('kadep/dashboard');
});

module.exports = router;
