const { Pengajuan, Pengadaan } = require('../models');

exports.addPengadaan = async (req, res, next) => {
    try {
        const { id_pengajuan, harga_beli } = req.body;
        const bukti = req.file.filename;  // Asumsi Anda menggunakan multer untuk upload file

        // Periksa apakah pengajuan dengan id_pengajuan dan status 'disetujui' ada
        const pengajuan = await Pengajuan.findOne({
            where: { id_pengajuan, status: '1' }
        });

        if (!pengajuan) {
            return res.redirect('/kalab/pengadaan?error=Pengajuan tidak ditemukan atau mungkin belum disetujui');
        }

        // Periksa apakah sudah ada pengadaan dengan id_pengajuan yang sama
        const existingPengadaan = await Pengadaan.findOne({ where: { id_pengajuan } });
        if (existingPengadaan) {
            return res.redirect('/kalab/pengadaan?error=Gagal, Data pengadaan dengan id_pengajuan yang sama ditemukan');
        }

        const jumlah = pengajuan.jumlah;
        const total_harga = harga_beli * jumlah;

        // Buat entri pengadaan
        const pengadaan = await Pengadaan.create({
            id_pengajuan,
            nama_aset: pengajuan.nama_aset,
            jumlah,
            harga_beli,
            total: total_harga,
            bukti
        });

        res.redirect('/kalab/pengadaan');
    } catch (error) {
        console.error('Error occurred:', error);
        next(error);
    }
};

exports.getAllPengadaanKalab = async (req, res, next) => {
    try {
        // Fetch all pengadaan data
        const pengadaans = await Pengadaan.findAll({
            include: [{
                model: Pengajuan,
                as: 'pengajuan'
            }]
        });

        // Fetch all 'disetujui' pengajuan data
        const pengajuans = await Pengajuan.findAll({
            where: { status: 'disetujui' }
        });

        // Render the view with the pengadaan and pengajuan data
        res.render('kalab/pengadaan', { 
            title: 'Data Pengadaan Aset', // Define the title variable
            pengadaans,
            pengajuans, 
            nama_lab: 'Nama Lab' // Adjust 'Nama Lab' as necessary
        });
    } catch (error) {
        console.error('Error occurred:', error);
        next(error);
    }
};

exports.deletePengadaan = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Pengadaan.destroy({ where: { id } });
        res.redirect('/kalab/pengadaan');
    } catch (error) {
        console.error('Error occurred:', error);
        next(error);
    }
};