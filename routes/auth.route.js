var express = require('express');
var router = express.Router();
const controller = require('../controller/auth.controller');
const notLogin = require('../middleware/notLogin');

router.get('/login', notLogin, controller.form);
router.post('/proses-login', controller.prosesLogin);

router.post('/logout', controller.logout);


module.exports = router;
