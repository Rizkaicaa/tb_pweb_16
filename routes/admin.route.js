const express = require('express');
const router = express.Router();
const cek = require('../middleware/checktokenandrole');
const { getUser } = require('../controller/auth.controller');
const labController = require('../controller/lab.controller');

// Routes untuk dashboard, profil, dan edit profil
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
    await editProfil(req, res, next); // Pastikan untuk mengimpor dan menggunakan fungsi editProfil yang sesuai
  } catch (error) {
    next(error);
  }
});

// Rute untuk menampilkan daftar laboratorium
router.get('/lab', async (req, res, next) => {
  try {
    await labController.getAllLabs(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

// Rute untuk menambah laboratorium baru melalui modal
router.post('/tambah-lab', labController.addLab);

// Rute untuk menampilkan form edit laboratorium berdasarkan ID
router.get('/edit-lab/:id', async (req, res, next) => {
  try {
    await labController.getEditLab(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

// Rute untuk mengedit laboratorium (dari formulir edit)
router.post('/edit-lab/:id', async (req, res, next) => {
  try {
    await labController.editLab(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

// Rute untuk menghapus laboratorium
router.post('/lab/delete/:id', async (req, res, next) => {
  try {
    await labController.deleteLab(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

// Rute untuk menampilkan daftar laboratorium
router.get('/manajemen_kalab', async (req, res, next) => {
  try {
    await labController.getAllLabs(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

module.exports = router;