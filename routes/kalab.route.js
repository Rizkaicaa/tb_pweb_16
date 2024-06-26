var express = require('express');
var router = express.Router();
const cek = require('../middleware/checktokenandrole');
const { getUser, editProfil } = require('../controller/auth.controller');
const dataasetController = require('../controller/dataaset.controller');
const pengadaanController = require('../controller/pengadaan.controller');
const multer = require('multer');
const { format } = require('date-fns');
const pengajuanasetController = require('../controller/pengajuan.controller');
const riwayatasetController = require('../controller/riwayat.controller');

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const now = new Date();
    const timestamp = format(now, 'yyyy-MM-dd-HHmmss');
    const uniqueSuffix = `${timestamp}-${file.originalname}`;
    cb(null, uniqueSuffix);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Hanya file JPG, JPEG, atau PNG yang diizinkan'), false);
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter 
});

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

router.post('/tambah-dataaset', authenticateUser, upload.single('foto'), async (req, res, next) => {
  try {
    await dataasetController.addDataaset(req, res, next);
  } catch (error) {
    console.error('Error adding dataaset:', error);
    res.redirect('/kalab/dataaset?error=Failed to add dataaset');
  }
});

router.get('/edit-dataaset/:id', authenticateUser, async (req, res, next) => {
  try {
    await dataasetController.getEditDataaset(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.post('/edit-dataaset/:id', authenticateUser, upload.single('fotoAset'), async (req, res, next) => {
  try {
    await dataasetController.editDataaset(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.post('/dataaset/delete/:id', authenticateUser, async (req, res, next) => {
  try {
    await dataasetController.deleteDataaset(req, res, next);
  } catch (error) {
    console.error('Error occurred:', error);
    next(error);
  }
});

router.get('/pengadaan', authenticateUser, pengadaanController.getAllPengadaanKalab);
router.post('/tambah-pengadaan', authenticateUser, upload.single('bukti'), pengadaanController.addPengadaan);
router.post('/hapus-pengadaan/:id', authenticateUser, pengadaanController.deletePengadaan);

router.get('/pengajuan', pengajuanasetController.getAllPengajuan);

router.get('/perbaikan', pengajuanasetController.getAllPerbaikan);
router.post('/tambah-perbaikan', pengajuanasetController.postPerbaikan);
router.post('/hapus-perbaikan/:id_perbaikan', authenticateUser, pengajuanasetController.deletePerbaikan);

router.get('/addpengajuan', pengajuanasetController.getAllAddPengajuan);
router.get('/cari-aset', dataasetController.getAllDataasetsSearch);

router.post('/tambah', authenticateUser, pengajuanasetController.addPengajuan);
router.post('/hapus-pengajuan/:id', authenticateUser, pengajuanasetController.deletePengajuan);

router.get('/riwayat', riwayatasetController.getAllRiwayat);
router.post('/tambah-riwayat', riwayatasetController.postRiwayat);
router.post('/hapus-riwayat/:id', authenticateUser, riwayatasetController.deleteRiwayat);

module.exports = router;
