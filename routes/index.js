var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/not-found', function(req, res, next) {
  res.render('notfound');
});



module.exports = router;
