const { Pengajuan, Perbaikan, Dataaset } = require('../models');

const { format } = require('date-fns');
const { id } = require('date-fns/locale');
const pengajuan = require('../models/pengajuan');

const formatTanggal = (date) => {
    return format(new Date(date), 'dd MMMM yyyy', { locale: id });
};

exports.getAllPengajuan = async (req, res, next) => {
    console.log('Fetching all pengajuans');
    const pengajuans = await Pengajuan.findAll();
    console.log('Labs fetched:', pengajuans);
    res.render('kalab/pengajuan', { title: 'Pengajuan Pembelian', pengajuans });
};

exports.getAllPengajuanKadep = async (req, res, next) => {
    console.log('Fetching all pengajuans');
    const pengajuans = await Pengajuan.findAll();
    console.log('Labs fetched:', pengajuans);
    res.render('kadep/pengajuan', { title: 'Pengajuan Pembelian', pengajuans });
};

exports.getAllPerbaikan = async (req, res, next) => {
    //console.log('Fetching all pengajuans');
    let perbaikans = await Perbaikan.findAll();
    perbaikans = perbaikans.map(t => ({
        ...t.toJSON(),
        jadwal: formatTanggal(t.jadwal),
    }));
    const dataaset = await Dataaset.findAll();
    res.render('kalab/perbaikan', { title: 'Perbaikan Aset', perbaikans, dataaset });
};

exports.postPerbaikan = async (req, res) => {
    try {
        const { nama_aset, deskripsi, jadwal } = req.body;


        await Perbaikan.create({
            nama_aset: nama_aset,
            deskripsi: deskripsi,
            jadwal: jadwal
        });

        res.redirect('/kalab/perbaikan'); 
    } catch (error) {
        console.error('Error adding perbaikan:', error);
        res.redirect('/kalab/perbaikan?error=Failed to add perbaikan');
    }
};

// Controller untuk mendapatkan data pengajuan berdasarkan ID
exports.getEditPengajuan = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pengajuan = await Pengajuan.findByPk(id);

        if (!pengajuan) {
            return res.status(404).json({ error: 'Pengajuan not found' });
        }

        res.status(200).json(pengajuan);
    } catch (error) {
        console.error('Error fetching pengajuan data:', error);
        res.status(500).json({ error: 'Failed to fetch pengajuan data' });
    }
};

// Controller untuk memperbarui status pengajuan
exports.putPengajuan = async (req, res, next) => {
    try {
        const { id_pengajuan, status } = req.body;

        if (!id_pengajuan || !status) {
            return res.status(400).json({ error: 'Missing ID or Status' });
        }

        const pengajuan = await Pengajuan.findByPk(id_pengajuan);

        if (!pengajuan) {
            return res.status(404).json({ error: 'Pengajuan not found' });
        }

        pengajuan.status = status;
        await pengajuan.save();

        res.redirect('/kadep/pengajuan'); // Redirect setelah berhasil menyimpan perubahan
    } catch (error) {
        console.error('Error updating pengajuan:', error);
        res.status(500).json({ error: 'Failed to update pengajuan' });
    }
};



exports.getAllAddPengajuan = async (req, res, next) => {
    res.render('kalab/addpengajuan', {title: 'Tambah Data Pengajuan Aset'});
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
        const id = req.params.id;
        await Pengajuan.destroy({ where: { id_pengajuan:id } });
        res.redirect('/kalab/pengajuan');
    } catch (error) {
        console.error('Error occurred:', error);
        next(error);
    }
};

exports.deletePerbaikan = async (req, res, next) => {
    try {
        const id = req.params.id_perbaikan;
        await Perbaikan.destroy({ where: { id } });
        res.redirect('/kalab/perbaikan');
    } catch (error) {
        console.error('Error occurred:', error);
        next(error);
    }
};