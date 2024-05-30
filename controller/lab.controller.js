const { Lab } = require('../models');
const { Op } = require('sequelize');


exports.getAllLabs = async (req, res, next) => {
  try {
    console.log('Fetching all labs');
    const labs = await Lab.findAll();
    console.log('Labs fetched:', labs);
    res.render('admin/lab', { title: 'Laboratorium', labs });
  } catch (error) {
    console.error('Error in getAllLabs:', error);
    next(error);
  }
};

exports.getAllLabsAdmin = async (req, res, next) => {
  try {
    console.log('Fetching all labs');
    const labs = await Lab.findAll();
    console.log('Labs fetched:', labs);
    res.render('kadep/lab', { title: 'Laboratorium', labs });
  } catch (error) {
    console.error('Error in getAllLabs:', error);
    next(error);
  }
};
// Menambah laboratorium baru melalui modal
exports.addLab = async (req, res) => {
  try {
    const { namaLab, kepalaLab, namaKordas, jumlahAsisten } = req.body;

    // Cek apakah sudah ada lab dengan nama_lab yang sama
    const existingLab = await Lab.findOne({ where: { nama_lab: namaLab } });
    if (existingLab) {
      return res.redirect('/admin/lab?error=Nama lab sudah ada');
    }

    // Cek apakah sudah ada lab dengan nama_kepala yang sama
    const existingKepalaLab = await Lab.findOne({ where: { nama_kepala: kepalaLab } });
    if (existingKepalaLab) {
      return res.redirect('/admin/lab?error=Nama kepala lab sudah ada');
    }

    // Cek apakah sudah ada lab dengan nama_kordas yang sama
    const existingNamaKordas = await Lab.findOne({ where: { nama_kordas: namaKordas } });
    if (existingNamaKordas) {
      return res.redirect('/admin/lab?error=Nama kordas sudah ada');
    }

    // Jika semua pengecekan lolos, buat lab baru
    await Lab.create({
      nama_lab: namaLab,
      nama_kepala: kepalaLab,
      nama_kordas: namaKordas,
      jumlah_aslab: jumlahAsisten
    });

    res.redirect('/admin/lab'); // Pengalihan ke halaman admin/lab setelah berhasil
  } catch (error) {
    console.error('Error adding lab:', error);
    res.redirect('/admin/lab?error=Failed to add lab');
  }
};


// Menampilkan form untuk mengedit laboratorium
exports.getEditLab = async (req, res, next) => {
  try {
    const lab = await Lab.findByPk(req.params.id);
    if (!lab) {
      return res.status(404).json({ error: 'Lab not found' });
    }
    res.json(lab); // Mengirim data laboratorium dalam format JSON
  } catch (error) {
    console.error('Error fetching lab data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Mengedit laboratorium
exports.editLab = async (req, res, next) => {
  try {
    const { namaLab, kepalaLab, namaKordas, jumlahAsisten } = req.body;
    const labId = req.params.id;

    // Lakukan validasi data yang diterima dari formulir edit
    const existingLab = await Lab.findOne({ where: { [Op.and]: [{ id: { [Op.ne]: labId } }, { nama_lab: namaLab }] } });
    if (existingLab) {
      return res.redirect(`/admin/lab?error=Nama lab sudah ada`);
    }

    const existingKepalaLab = await Lab.findOne({ where: { [Op.and]: [{ id: { [Op.ne]: labId } }, { nama_kepala: kepalaLab }] } });
    if (existingKepalaLab) {
      return res.redirect(`/admin/lab?error=Nama kepala lab sudah ada`);
    }

    const existingNamaKordas = await Lab.findOne({ where: { [Op.and]: [{ id: { [Op.ne]: labId } }, { nama_kordas: namaKordas }] } });
    if (existingNamaKordas) {
      return res.redirect(`/admin/lab?error=Nama kordas sudah ada`);
    }

    // Lakukan pengeditan laboratorium dengan menggunakan model Lab
    const lab = await Lab.findByPk(labId);
    if (!lab) {
      return res.status(404).send('Lab not found');
    }

    lab.nama_lab = namaLab;
    lab.nama_kepala = kepalaLab;
    lab.nama_kordas = namaKordas;
    lab.jumlah_aslab = jumlahAsisten;

    await lab.save();
    
    // Redirect kembali ke halaman daftar laboratorium setelah berhasil mengedit
    res.redirect('/admin/lab');
  } catch (error) {
    console.error('Error editing lab:', error);
    next(error);
  }
};


// Menghapus laboratorium
exports.deleteLab = async (req, res, next) => {
  try {
    const lab = await Lab.findByPk(req.params.id);
    if (!lab) {
      return res.status(404).send('Lab not found');
    }
    await lab.destroy();
    res.redirect('/admin/lab'); // Redirect kembali ke halaman daftar laboratorium setelah berhasil menghapus
  } catch (error) {
    next(error);
  }
};


