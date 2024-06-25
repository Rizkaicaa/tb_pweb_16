const { Dataaset, Lab } = require('../models');

exports.getAllDataasets = async (req, res, next) => {
    try {
        const userId = req.user.id; 
        console.log('User ID:', userId);

        const lab = await Lab.findOne({ where: { id_user: userId } });

        if (!lab) {
            return res.status(404).json({ error: 'Maaf, tidak bisa melihat aset, Lab tidak ditemukan' });
        }

        const labId = lab.id; 
        const nama_lab = lab.nama_lab; 
        console.log('Lab ID:', labId);

        const dataasets = await Dataaset.findAll({
            where: { id_lab: labId }, 
        });

        console.log('Dataasets:', dataasets); 
        res.render('kalab/dataaset', { title: 'Data Aset', nama_lab: nama_lab, dataasets: dataasets });
    } catch (error) {
        console.error('Error fetching dataasets:', error);
        next(error);
    }
};

exports.getAllDataasetsSearch = async (req, res, next) => {
    try {
        let dataasets = ''
        if (req.query.id_lab != undefined) {
            dataasets = await Dataaset.findAll({
                where: { id_lab: req.query.id_lab, id: req.query.id_aset },
            });
        } else {
            dataasets = await Dataaset.findAll();
        }

        const datalab = await Lab.findAll();
        const dataasetsearch = await Dataaset.findAll();

        res.render('kalab/dataaset-cari', { title: 'Cari Aset', dataasets, datalab, dataasetsearch });
    } catch (error) {
        console.error('Error fetching dataasets:', error);
        next(error);
    }
};

exports.addDataaset = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body); 
        console.log('File:', req.file); 
        const { namaAset, kategoriAset, jumlahAset, spesifikasiAset } = req.body;
        const userId = req.user.id; 

        const lab = await Lab.findOne({ where: { id_user: userId } });

        if (!lab) {
            return res.status(404).json({ error: 'Gagal, Lab tidak ditemukan' });
        }

        await Dataaset.create({
            id_lab: lab.id,
            nama_aset: namaAset,
            jenis_aset: kategoriAset,
            spesifikasi: spesifikasiAset,
            jumlah: jumlahAset,
            foto: req.file ? req.file.filename : null 
        });

        res.redirect('/kalab/dataaset'); 
    } catch (error) {
        console.error('Error adding dataaset:', error);
        res.redirect('/kalab/dataaset?error=Gagal menambahkan data aset');
    }
};

exports.getEditDataaset = async (req, res, next) => {
    try {
        const dataaset = await Dataaset.findByPk(req.params.id);
        if (!dataaset) {
            return res.status(404).json({ error: 'Gagal, Data Aset tidak ditemukan' });
        }
        res.json(dataaset); 
    } catch (error) {
        console.error('Error fetching dataaset data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.editDataaset = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body); 
        console.log('File:', req.file); 
        const { namaAset, kategoriAset, jumlahAset, spesifikasiAset } = req.body;
        const dataasetId = req.params.id;
        const userId = req.user.id; 

        const lab = await Lab.findOne({ where: { id_user: userId } });

        if (!lab) {
            return res.status(404).json({ error: 'Gagal, Lab tidak ditemukan' });
        }

        const dataaset = await Dataaset.findByPk(dataasetId);
        if (!dataaset) {
            return res.status(404).send('Gagal, Dataaset tidak ditemukan');
        }

        if (dataaset.id_lab !== lab.id) {
            return res.status(403).send('Gagal, Anda tidak memiliki izin untuk mengedit dataaset ini');
        }

        let fotoAset = dataaset.foto;
        if (req.file) { 
            fotoAset = req.file.filename;
        }

        await dataaset.update({
            nama_aset: namaAset,
            jenis_aset: kategoriAset,
            spesifikasi: spesifikasiAset,
            jumlah: jumlahAset,
            foto: fotoAset
        });

        res.redirect('/kalab/dataaset');
    } catch (error) {
        console.error('Error editing dataaset:', error);
        next(error);
    }
};

exports.deleteDataaset = async (req, res, next) => {
    try {
        const dataasetId = req.params.id;
        const userId = req.user.id; 

        const lab = await Lab.findOne({ where: { id_user: userId } });

        if (!lab) {
            return res.status(404).json({ error: 'Gagal, Lab tidak ditemukan untuk pengguna yang sedang login' });
        }

        const dataaset = await Dataaset.findByPk(dataasetId);
        if (!dataaset) {
            return res.status(404).send('Gagal, Dataaset tidak ditemukan');
        }

        if (dataaset.id_lab !== lab.id) {
            return res.status(403).send('Gagal, Anda tidak memiliki izin untuk menghapus dataaset ini');
        }

        await dataaset.destroy();
        res.redirect('/kalab/dataaset'); 
    } catch (error) {
        console.error('Error deleting dataaset:', error);
        next(error);
    }
};

