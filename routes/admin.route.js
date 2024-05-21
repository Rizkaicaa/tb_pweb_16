var express = require('express');
var router = express.Router();
const cek = require('../middleware/checktokenandrole');
const {getUser} = require('../controller/auth.controller');

const {editProfil} = require('../controller/auth.controller');

router.get('/dashboard', cek('Admin'), async function (req, res, next) {
  try {
    const user = await getUser(req);
    res.render('admin/dashboard', { user });
  } catch (error) {
    next(error);
  }
});

router.get('/profil', cek(''), async function (req, res, next) {
  try {
    const user = await getUser(req);
    res.render('admin/profil', { user });
  } catch (error) {
    next(error);
  }
});

router.get('/edit-profil', cek(''), async function (req, res, next) {
  try {
    const user = await getUser(req);
    res.render('admin/editProfil', { user });
  } catch (error) {
    next(error);
  }
});

router.post('/edit-profil', cek('Admin'), async (req, res,next)=> {
  await editProfil(req, res,next);

})




module.exports = router;
