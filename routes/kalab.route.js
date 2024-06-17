var express = require('express');
var router = express.Router();
const cek = require('../middleware/checktokenandrole');
const { getUser, editProfil } = require('../controller/auth.controller');
const dataasetController = require('../controller/dataaset.controller');
const multer = require('multer');
const pengajuanasetController = require('../controller/pengajuan.controller');
const db = require('../models/lab')


const authenticateUser = async (req, res, next) => {
  try {
    const user = await getUser(req);

    if (!user || user.role !== 'Kepala Lab') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
// Konfigurasi storage untuk menyimpan file foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder tempat menyimpan file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Penamaan file: timestamp + nama asli file
  }
});

// Validasi tipe file
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Hanya file JPG, JPEG, atau PNG yang diizinkan'), false);
  }
};

// Inisialisasi multer dengan konfigurasi storage dan validasi tipe file
const upload = multer({ storage, fileFilter });

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

router.get('/dataaset', authenticateUser, async (req, res, next) => {
  try {
    await dataasetController.getAllDataasets(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});


// Rute untuk menambah aset baru
router.post('/tambah-dataaset', authenticateUser, upload.single('foto'), async (req, res, next) => {
  try {
    await dataasetController.addDataaset(req, res, next);
  } catch (error) {
    console.error('Error adding dataaset:', error);
    res.redirect('/kalab/dataaset?error=Failed to add dataaset');
  }
});


router.get('/pengajuan', pengajuanasetController.getAllPengajuan);

router.get('/addpengajuan', pengajuanasetController.getAllAddPengajuan);

router.post('/tambah', authenticateUser, pengajuanasetController.addPengajuan);

router.post('/pengajuan/delete/:id_pengajuan', authenticateUser, pengajuanasetController.deletePengajuan);

module.exports = router;
