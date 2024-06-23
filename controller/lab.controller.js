const { Lab, User, Dataaset } = require('../models');
const { Op } = require('sequelize');


exports.getAllLabs = async (req, res, next) => {
  try {
    console.log('Fetching all labs');
    const labs = await Lab.findAll();
    const users = await User.findAll({
      where: { role: 'Kepala Lab' }
    }); 
    res.render('admin/lab', { title: 'Data Laboratorium', labs, users });
  } catch (error) {
    console.error('Error in getAllLabs:', error);
    next(error);
  }
};

exports.getAllLabsKadep = async (req, res, next) => {
  try {
    console.log('Fetching all labs');
    const labs = await Lab.findAll();
    console.log('Labs fetched:', labs);
    res.render('kadep/lab', { title: 'Data Laboratorium', labs });
  } catch (error) {
    console.error('Error in getAllLabs:', error);
    next(error);
  }
};

exports.getAllLabsAsetKadep = async (req, res, next) => {
  try {
    console.log('Fetching all labs');
    const labs = await Lab.findAll();
    console.log('Labs fetched:', labs);
    res.render('kadep/dataaset', { title: 'Aset Laboratorium', labs });
  } catch (error) {
    console.error('Error in getAllLabs:', error);
    next(error);
  }
};

exports.getDataasetsByLabId = async (req, res, next) => {
  try {
      const labId = req.params.labId; 
      console.log('Lab ID:', labId);

      const lab = await Lab.findOne({ where: { id: labId } });

      if (!lab) {
          console.error('Lab not found');
          return res.status(404).json({ error: 'Lab tidak ditemukan' });
      }

      const nama_lab = lab.nama_lab; 
      console.log('Nama Lab:', nama_lab);

      const dataasets = await Dataaset.findAll({
          where: { id_lab: labId }, 
      });

      console.log('Dataasets:', dataasets); 
      res.render('kadep/lihataset', { title: 'Aset Laboratorium', nama_lab: nama_lab, dataasets: dataasets });
  } catch (error) {
      console.error('Error fetching dataasets:', error);
      next(error);
  }
};

exports.addLab = async (req, res) => {
  try {
    const { namaLab, kepalaLab, namaKordas, jumlahAsisten } = req.body;

    const existingLab = await Lab.findOne({ where: { nama_lab: namaLab } });

    const kepalaLabUser = await User.findOne({ where: { nama: kepalaLab } });
    const id_user = kepalaLabUser.id;

    if (existingLab) {
      return res.redirect('/admin/lab?error=Gagal, nama lab sudah ada');
    }

    const existingKepalaLab = await Lab.findOne({ where: { nama_kepala: kepalaLab } });
    if (existingKepalaLab) {
      return res.redirect('/admin/lab?error=Nama kepala lab sudah ada');
    }

    const existingNamaKordas = await Lab.findOne({ where: { nama_kordas: namaKordas } });
    if (existingNamaKordas) {
      return res.redirect('/admin/lab?error=Nama kordas sudah ada');
    }

    await Lab.create({
      nama_lab: namaLab,
      nama_kepala: kepalaLab,
      nama_kordas: namaKordas,
      jumlah_aslab: jumlahAsisten,
      id_user: id_user
    });

    res.redirect('/admin/lab'); 
  } catch (error) {
    console.error('Error adding lab:', error);
    res.redirect('/admin/lab?error=Failed to add lab');
  }
};

exports.getEditLab = async (req, res, next) => {
  try {
    const lab = await Lab.findByPk(req.params.id);
    if (!lab) {
      return res.status(404).json({ error: 'Lab not found' });
    }
    res.json(lab); 
  } catch (error) {
    console.error('Error fetching lab data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.editLab = async (req, res, next) => {
  try {
    const { namaLab, kepalaLab, namaKordas, jumlahAsisten } = req.body;
    const labId = req.params.id;

    const kepalaLabUser = await User.findOne({ where: { nama: kepalaLab } });
    if (!kepalaLabUser) {
      return res.redirect(`/admin/lab?error=Kepala lab not found`);
    }
    const id_user = kepalaLabUser.id;

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

    const lab = await Lab.findByPk(labId);
    if (!lab) {
      return res.status(404).send('Lab tidak ditemukan');
    }

    lab.nama_lab = namaLab;
    lab.nama_kepala = kepalaLab;
    lab.id_user = id_user; 
    lab.nama_kordas = namaKordas;
    lab.jumlah_aslab = jumlahAsisten;

    await lab.save();
    res.redirect('/admin/lab');
  } catch (error) {
    console.error('Error editing lab:', error);
    next(error);
  }
};

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


