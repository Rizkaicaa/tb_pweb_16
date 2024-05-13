var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/not-found', function(req, res, next) {
  res.render('notfound');
});


router.get('/ubahPassword', function(req, res) {
  res.render('ubahPassword', { title: 'Ubah Password' }); 
});

router.get('/editProfil', function(req, res) {
  res.render('editProfil',{title: 'Edit Profile'} )
})

module.exports = router;
