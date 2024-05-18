var express = require('express');
var router = express.Router();
const cek = require('../middleware/checktokenandrole');

router.get('/dashboard', cek('Admin'), function (req, res, next) {
  res.render('admin/dashboard');
});

module.exports = router;
