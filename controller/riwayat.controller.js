const { Riwayat, Dataaset } = require('../models');

exports.getAllRiwayat = async (req, res, next) => {
    console.log('Fetching all Riwayats');
    const dataaset = await Dataaset.findAll();
    const riwayats = await Riwayat.findAll();
    console.log('Labs fetched:', riwayats);
    res.render('kalab/riwayat', { title: 'Riwayat Tindakan', riwayats, dataaset });
};

exports.postRiwayat = async (req, res) => {
    try {
        const { nama_aset, tindakan } = req.body;


        await Riwayat.create({
            nama_aset: nama_aset,
            tindakan: tindakan
        });

        res.redirect('/kalab/riwayat'); 
    } catch (error) {
        console.error('Error adding riwayat:', error);
        res.redirect('/kalab/riwayat?error=Failed to add Riwayat');
    }
};

exports.deleteRiwayat = async (req, res, next) => {
    try {
        const id = req.params.id_riwayat;
        await Riwayat.destroy({ where: { id } });
        res.redirect('/kalab/riwayat');
    } catch (error) {
        console.error('Error occurred:', error);
        next(error);
    }
};