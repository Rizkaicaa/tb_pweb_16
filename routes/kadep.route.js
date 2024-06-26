var express = require('express');
var router = express.Router();
const cek = require('../middleware/checktokenandrole');
const {getUser} = require('../controller/auth.controller');
const {editProfil} = require('../controller/auth.controller');
const labController = require('../controller/lab.controller');
const pengajuanasetController = require('../controller/pengajuan.controller');

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

router.get('/lab', cek('Kepala Departemen'), async (req, res, next) => {
  try {
    await labController.getAllLabsKadep(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.get('/dataaset', cek('Kepala Departemen'), async (req, res, next) => {
  try {
    await labController.getAllLabsAsetKadep(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.get('/lihataset/:labId',cek('Kepala Departemen'), async (req, res, next) => {
  try {
    await labController.getDataasetsByLabId(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.get('/pengajuan', pengajuanasetController.getAllPengajuanKadep);

router.get('/edit-pengajuan/:id', cek('Kepala Departemen'), async (req, res, next) => {
  try {
    await pengajuanasetController.getEditPengajuan(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.get('/edit-perbaikan/:id', cek('Kepala Departemen'), async (req, res, next) => {
  try {
    await pengajuanasetController.getEditPerbaikan(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});



router.post('/pengajuan', cek('Kepala Departemen'),  async (req, res, next) => {
  try {
    await pengajuanasetController.putPengajuan(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.post('/perbaikan/update', cek('Kepala Departemen'),  async (req, res, next) => {
  try {
    await pengajuanasetController.putPerbaikan(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.get('/perbaikan', pengajuanasetController.getAllPerbaikanKadep);

module.exports = router;
