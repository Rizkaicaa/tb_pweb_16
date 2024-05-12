var express = require('express');
var router = express.Router();
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');
// const controller = require('../controller/auth.controller');


router.get('/dashboard',verifyTokenAndRole('Kepala Departemen'), function(req, res, next) {
    res.render('kadep/dashboard');
  });


module.exports = router;
