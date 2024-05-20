var express = require('express');
var router = express.Router();
const cek = require('../middleware/checktokenandrole');
const {getUser} = require('../controller/auth.controller');
const {editProfil} = require('../controller/auth.controller');

router.get('/dashboard', cek('Kepala Departemen'), async function (req, res, next) {
  try {
    const user = await getUser(req);
    res.render('kadep/dashboard', { user });
  } catch (error) {
    next(error);
  }
});

router.get('/edit-profil', cek('Kepala Departemen'), async function (req, res, next) {
  try {
    const user = await getUser(req);
    res.render('kadep/editProfil', { user });
  } catch (error) {
    next(error);
  }
});

router.post('/edit-profil', cek('Kepala Departemen'), async (req, res,next)=> {
  await editProfil(req, res,next);

})

module.exports = router;
