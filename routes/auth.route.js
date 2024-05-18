var express = require('express');
var router = express.Router();
const controller = require('../controller/auth.controller.js');
const changePassword = require ('../controller/ubahpw.controller.js')
const notLogin = require('../middleware/notLogin.js');
const control = require ('../controller/ubahpw.controller'); // Mengubah alias menjadi ubahpwController
const verify = require('../middleware/verifyTokenAndRole.js');
const verifyToken = require('../middleware/verifyTokenAndRole.js');

router.get('/login', notLogin, controller.form);
router.post('/proses-login', controller.prosesLogin);
router.post('/logout', controller.logout);

router.get("/ubahPassword", function (req, res, next) {
    res.render("ubahPassword", { title: "ubahPassword" });
});


router.post('/changePassword', verifyToken(), async (req, res, next) => {
    // Panggil fungsi changePassword dengan req, res, dan next
    await changePassword(req, res);

});



module.exports = router;
