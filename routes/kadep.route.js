var express = require('express');
var router = express.Router();
const cek = require('../middleware/checktokenandrole');
const {getUser} = require('../controller/auth.controller');
const {editProfil} = require('../controller/auth.controller');

router.get('/dashboard', cek('Kepala Departemen'), async function (req, res, next) {
  try {
    const user = await getUser(req);
    res.render('kadep/dashboard', { title: 'Dashboard',user });
  } catch (error) {
    next(error);
  }
});

router.get('/profil', cek('Kepala Departemen'), async function (req, res, next) {
  try {
    const user = await getUser(req);
    res.render('kadep/profil', { title: 'Profile',user });
  } catch (error) {
    next(error);
  }
});

router.get('/edit-profil', cek('Kepala Departemen'), async function (req, res, next) {
  try {
    const user = await getUser(req);
    res.render('kadep/editProfil', { title: 'Profile',user });
  } catch (error) {
    next(error);
  }
});

router.post('/edit-profil', cek('Kepala Departemen'), async (req, res,next)=> {
  await editProfil(req, res,next);

})

module.exports = router;
