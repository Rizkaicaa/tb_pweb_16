var express = require('express');
var router = express.Router();
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');
// const controller = require('../controller/auth.controller');


router.get('/dashboard',verifyTokenAndRole('Kepala Lab'), function(req, res, next) {
    res.render('kalab/dashboard');
  });


module.exports = router;
