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
    await editProfil(req, res, next);
  } catch (error) {
    next(error);
  }
});



// Rute untuk menampilkan daftar laboratorium
router.get('/admin/lab', labController.getAllLabs);

// Rute untuk menambah laboratorium baru melalui modal
router.post('/admin/tambah-lab', labController.addLab);


// Rute untuk menampilkan form edit laboratorium
router.get('/admin/lab/edit/:id', labController.getEditLab);

// Rute untuk mengedit laboratorium
router.post('/admin/lab/edit/:id', labController.editLab);

// Rute untuk menghapus laboratorium
router.post('/admin/lab/delete/:id', labController.deleteLab);

module.exports = router;
