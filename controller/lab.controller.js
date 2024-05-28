const { Lab } = require('../models');

// Menampilkan daftar laboratorium
exports.getAllLabs = async (req, res, next) => {
  try {
    const labs = await Lab.findAll();
    res.render('admin/lab', { title: 'Laboratorium', labs });
  } catch (error) {
    next(error);
  }
};

// Menampilkan form untuk menambah laboratorium baru
exports.getAddLab = (req, res) => {
  res.render('admin/addLab', { title: 'Tambah Lab' });
};

// Menambah laboratorium baru
exports.addLab = async (req, res, next) => {
  try {
    const { nama_lab, nama_kepala, nama_kordas, jumlah_aslab } = req.body;
    await Lab.create({ nama_lab, nama_kepala, nama_kordas, jumlah_aslab });
    res.redirect('/admin/lab');
  } catch (error) {
    next(error);
  }
};

// Menampilkan form untuk mengedit laboratorium
exports.getEditLab = async (req, res, next) => {
  try {
    const lab = await Lab.findByPk(req.params.id);
    if (!lab) {
      return res.status(404).send('Lab not found');
    }
    res.render('admin/editLab', { title: 'Edit Lab', lab });
  } catch (error) {
    next(error);
  }
};

// Mengedit laboratorium
exports.editLab = async (req, res, next) => {
  try {
    const { nama_lab, nama_kepala, nama_kordas, jumlah_aslab } = req.body;
    const lab = await Lab.findByPk(req.params.id);
    if (!lab) {
      return res.status(404).send('Lab not found');
    }
    lab.nama_lab = nama_lab;
    lab.nama_kepala = nama_kepala;
    lab.nama_kordas = nama_kordas;
    lab.jumlah_aslab = jumlah_aslab;
    await lab.save();
    res.redirect('/admin/lab');
  } catch (error) {
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
    res.redirect('/admin/lab');
  } catch (error) {
    next(error);
  }
};
