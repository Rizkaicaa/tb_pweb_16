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

exports.getAllPerbaikanKadep = async (req, res, next) => {
    console.log('Fetching all perbaikans');
    const perbaikans = await Perbaikan.findAll();
    console.log('Labs fetched:', perbaikans);
    res.render('kadep/perbaikan', { title: 'Pengajuan Perbaikan', perbaikans });
};


exports.getAllPerbaikan = async (req, res, next) => {
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

exports.getEditPerbaikan = async (req, res, next) => {
    try {
        const { id } = req.params;
        const perbaikan = await Perbaikan.findByPk(id);

        if (!perbaikan) {
            return res.status(404).json({ error: 'Perbaikan not found' });
        }

        res.status(200).json(perbaikan);
    } catch (error) {
        console.error('Error fetching perbaikan data:', error);
        res.status(500).json({ error: 'Failed to fetch perbaikan data' });
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

exports.putPerbaikan = async (req, res, next) => {
    try {
        const { id_perbaikan, status } = req.body;

        if (!id_perbaikan || !status) {
            return res.status(400).json({ error: 'Missing ID or Status' });
        }

        const perbaikan = await Perbaikan.findByPk(id_perbaikan);

        if (!perbaikan) {
            return res.status(404).json({ error: 'Perbaikan not found' });
        }

        perbaikan.status = status;
        await perbaikan.save();

        res.redirect('/kadep/perbaikan'); // Redirect setelah berhasil menyimpan perubahan
    } catch (error) {
        console.error('Error updating perbaikan:', error);
        res.status(500).json({ error: 'Failed to update perbaikan' });
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