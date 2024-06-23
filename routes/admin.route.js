const express = require('express');
const router = express.Router();
const cek = require('../middleware/checktokenandrole');
const { getUser } = require('../controller/auth.controller');
const labController = require('../controller/lab.controller');
const akunKalabController = require('../controller/akunKalab.controller');
const dataasetController = require('../controller/dataaset.controller');

router.get('/dashboard', cek('Admin'), async (req, res, next) => {
  try {
    const user = await getUser(req);
    res.render('admin/dashboard', {title: 'Dashboard', user });
  } catch (error) {
    next(error);
  }
});

router.get('/profil', cek(''), async (req, res, next) => {
  try {
    const user = await getUser(req);
    res.render('admin/profil', { title: 'Profile', user });
  } catch (error) {
    next(error);
  }
});

router.get('/edit-profil', cek(''), async (req, res, next) => {
  try {
    const user = await getUser(req);
    res.render('admin/editProfil', {title: 'Profile',  user });
  } catch (error) {
    next(error);
  }
});

router.post('/edit-profil', cek('Admin'), async (req, res, next) => {
  try {
    await editProfil(req, res, next); 
  } catch (error) {
    next(error);
  }
});

router.get('/lab', async (req, res, next) => {
  try {
    await labController.getAllLabs(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.post('/tambah-lab', labController.addLab);

router.get('/edit-lab/:id', async (req, res, next) => {
  try {
    await labController.getEditLab(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.post('/edit-lab/:id', async (req, res, next) => {
  try {
    await labController.editLab(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.post('/lab/delete/:id', async (req, res, next) => {
  try {
    await labController.deleteLab(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.get('/akunKalab', async (req, res, next) => {
  try {
    await akunKalabController.getAllAkunKalab(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.post('/tambah-akun-kalab', akunKalabController.addAkunKalab);

router.get('/edit-akun-kalab/:id', async (req, res, next) => {
  try {
    await akunKalabController.getEditAkunKalab(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.post('/edit-akun-kalab/:id', async (req, res, next) => {
  try {
    await akunKalabController.editAkunKalab(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.post('/akunKalab/delete/:id', async (req, res, next) => {
  try {
    await akunKalabController.deleteAkunKalab(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get('/cari-aset', dataasetController.getAllDataasetsSearch);

module.exports = router;