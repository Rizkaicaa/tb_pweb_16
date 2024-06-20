var express = require('express');
var router = express.Router();
const auth = require("../controller/auth.controller.js");

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/not-found', function(req, res, next) {
  res.render('notfound');
});


module.exports = router;
