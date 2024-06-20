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

        res.redirect('/kalab/perbaikan'); // Pengalihan ke halaman admin/lab setelah berhasil
    } catch (error) {
        console.error('Error adding perbaikan:', error);
        res.redirect('/kalab/perbaikan?error=Failed to add perbaikan');
    }
};


exports.putPengajuan = async (req, res) => {
    try {
        const { status, id } = req.body;


        await Pengajuan.update({
            status: status
        }, {
            where: {
                id_pengajuan: id
            }
        })

        res.redirect('/kadep/pengajuan'); // Pengalihan ke halaman admin/lab setelah berhasil
    } catch (error) {
        console.error('Error adding perbaikan:', error);
        res.redirect('/kalab/pengajuan?error=Failed to update pengajuan');
    }
};

exports.getEditPengajuan = async (req, res, next) => {
    try {
        const pengajuan = await Pengajuan.findByPk(req.params.id);
        if (!pengajuan) {
            return res.status(404).json({ error: 'Lab not found' });
        }
        res.json(pengajuan); // Mengirim data laboratorium dalam format JSON
    } catch (error) {
        console.error('Error fetching lab data:', error);
        res.status(500).json({ error: 'Internal server error' });
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
        const id = req.params.id_pengajuan;
        await Pengajuan.destroy({ where: { id } });
        res.redirect('/kalab/pengajuan');
    } catch (error) {
        console.error('Error occurred:', error);
        next(error);
    }
};