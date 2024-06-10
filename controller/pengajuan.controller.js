const { Pengajuan } = require('../models');

exports.getAllPengajuan = async (req, res, next) => {
    console.log('Fetching all pengajuans');
    const pengajuans = await Pengajuan.findAll();
    console.log('Labs fetched:', pengajuans);
    res.render('kalab/pengajuan', { title: 'Pengajuan Pembelian', pengajuans });
};

exports.addPengajuan = async (req, res) => {
    try {
        const { namaAset, jumlah, harga,totalHarga, tujuan, status } = req.body;

        await Pengajuan.create({
            nama_aset: namaAset,
            jumlah: jumlah,
            harga: harga,
            total_harga: totalHarga,
            tujuan: tujuan,
            status: status
        });
        res.redirect('kalab/pengajuan');
    } catch (error) {
        console.error('Error adding submissions:', error);
        res.redirect('kalab/pengajuan?error=Failed to add submissions');
    }
};

exports.deletePengajuan = async (req, res, next) => {
    try {
        const pengajuan = await Pengajuan.findByPk(req.params.id);
        if (!pengajuan) {
            return res.status(404).send('Aset Tidak Ditemukan');
        }
        await pengajuan.destroy();
        res.redirect('kalab/pengajuan');
    } catch (error) {
        next(error);
    }
};