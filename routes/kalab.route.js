var express = require('express');
var router = express.Router();
const cek = require('../middleware/checktokenandrole');
const { getUser, editProfil } = require('../controller/auth.controller');
const pengajuanasetController = require('../controller/pengajuan.controller');
const db = require('../models/lab')

router.get('/dashboard', cek('Kepala Lab'), async function (req, res, next) {
  try {
    const user = await getUser(req);
    res.render('kalab/dashboard', { title: 'Dashboard', user });
  } catch (error) {
    next(error);
  }
});

router.get('/profil', cek('Kepala Lab'), async function (req, res, next) {
  try {
    const user = await getUser(req);
    res.render('kalab/profil', { title: 'Dashboard', user });
  } catch (error) {
    next(error);
  }
});

router.get('/edit-profil', cek('Kepala Lab'), async function (req, res, next) {
  try {
    const user = await getUser(req);
    res.render('kalab/editProfil', { user });
  } catch (error) {
    next(error);
  }
});

router.post('/edit-profil', cek('Kepala Lab'), async (req, res, next) => {
  await editProfil(req, res, next);
});


router.get('/pengajuan', pengajuanasetController.getAllPengajuan);

router.post('/tambah', pengajuanasetController.addPengajuan);


router.post('/pengajuan/delete/:id_pembelianaset', async (req, res, next) => {
  try {
    await pengajuanasetController.deletePengajuan(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});
module.exports = router;
