const db = require('../models');
const { Pengajuan, Lab } = require('../models');

exports.getAllPengajuan = async (req, res, next) => {
    console.log('Fetching all pengajuans');
    const pengajuans = await db.Pengajuan.findAll();
    console.log('Pengajuan fetched:', pengajuans);
    res.render('kalab/pengajuan', { title: 'Data Pengajuan Aset', pengajuans });
};

exports.getAllAddPengajuan = async (req, res, next) => {
    res.render('kalab/addpengajuan', {title: 'Data Pengajuan Aset'});
};

exports.addPengajuan = async (req, res) => {
    try {
        const { namaAset, jumlah, harga,totalHarga, tujuan, status } = req.body;
        const userId = req.user.id;
        const lab = await Lab.findOne({ where: { id_user: userId } });

        if (!lab) {
            return res.status(404).json({ error: 'Lab Tidak Ditemukan' });
        }

        await Pengajuan.create({
            id_lab: lab.id,
            nama_aset: namaAset,
            jumlah: jumlah,
            harga: harga,
            total_harga: totalHarga,
            tujuan: tujuan,
            status: status || 'Pending'
        });
        res.redirect('/kalab/pengajuan');
    } catch (error) {
        console.error('Error adding submissions:', error);
        res.redirect('/kalab/pengajuan?error=Failed to add submissions');
    }
};

exports.deletePengajuan = async (req, res, next) => {
    try {
      const id_pengajuan = req.params.id_pengajuan;
      if (!id_pengajuan) {
        return res.status(400).send('Invalid request');
      }
      const pengajuan = await Pengajuan.findByPk(id_pengajuan);
      if (!pengajuan) {
        return res.status(404).send('Pengajuan Tidak Ditemukan');
      }
      await pengajuan.destroy();
      res.redirect('/kalab/pengajuan');
    } catch (error) {
      next(error);
    }
  };