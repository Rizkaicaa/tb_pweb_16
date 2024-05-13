var express = require('express');
var router = express.Router();
const controller = require('../controller/auth.controller');

router.get('/login',  controller.form);
router.post('/proses-login', controller.prosesLogin);

router.post('/logout', controller.logout);


module.exports = router;
