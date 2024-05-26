const express = require('express');
const router = express.Router();
const cek = require('../middleware/checktokenandrole');
const { getUser } = require('../controller/auth.controller');

// Import controller lab
const labController = require('../controller/lab.controller');

// Routes untuk lab
router.get('/lab', cek('Admin'), labController.getAllLabs);

// Routes untuk dashboard, profil, dan edit profil
router.get('/dashboard', cek('Admin'), async (req, res, next) => {
  try {
    const user = await getUser(req);
    res.render('admin/dashboard', { user });
  } catch (error) {
    next(error);
  }
});

router.get('/profil', cek(''), async (req, res, next) => {
  try {
    const user = await getUser(req);
    res.render('admin/profil', { user });
  } catch (error) {
    next(error);
  }
});

router.get('/edit-profil', cek(''), async (req, res, next) => {
  try {
    const user = await getUser(req);
    res.render('admin/editProfil', { user });
  } catch (error) {
    next(error);
  }
});

router.post('/edit-profil', cek('Admin'), async (req, res, next) => {
  await editProfil(req, res, next);
});

module.exports = router;
