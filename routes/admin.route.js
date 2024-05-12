var express = require('express');
var router = express.Router();
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');


router.get('/dashboard',verifyTokenAndRole('Admin'), function(req, res, next) {
    res.render('admin/dashboard');
  });


module.exports = router;
