const { Dataaset, Lab } = require('../models');

// Mendapatkan semua dataaset
exports.getAllDataasets = async (req, res, next) => {
    try {
        const userId = req.user.id; // Ambil ID user yang sedang login
        console.log('User ID:', userId);

        // Temukan lab terkait dengan userId
        const lab = await Lab.findOne({ where: { id_user: userId } });

        if (!lab) {
            return res.status(404).json({ error: 'Lab tidak ditemukan' });
        }

        const labId = lab.id; // Ambil ID lab dari lab yang ditemukan
        const nama_lab = lab.nama_lab; // Ambil nama_lab dari lab yang ditemukan
        console.log('Lab ID:', labId);

        const dataasets = await Dataaset.findAll({
            where: { id_lab: labId }, // Filter dataaset berdasarkan ID lab
        });

        console.log('Dataasets:', dataasets); // Log dataaset untuk memastikan data diambil

        res.render('kalab/dataaset', { title: 'Data Aset', nama_lab: nama_lab, dataasets: dataasets });
    } catch (error) {
        console.error('Error fetching dataasets:', error);
        next(error);
    }
};


// Menambah dataaset baru melalui modal
exports.addDataaset = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body); // Log request body
        console.log('File:', req.file); // Log file info
        const { namaAset, kategoriAset, jumlahAset, spesifikasiAset } = req.body;
        const userId = req.user.id; // Ambil user ID dari lab yang sedang login

        // Temukan lab terkait dengan userId
        const lab = await Lab.findOne({ where: { id_user: userId } });

        if (!lab) {
            return res.status(404).json({ error: 'Lab tidak ditemukan' });
        }

        // Jika semua pengecekan lolos, buat dataaset baru
        await Dataaset.create({
            id_lab: lab.id,
            nama_aset: namaAset,
            jenis_aset: kategoriAset,
            spesifikasi: spesifikasiAset,
            jumlah: jumlahAset,
            foto: req.file ? req.file.filename : null // Periksa apakah file ada
        });

        res.redirect('/kalab/dataaset'); // Pengalihan ke halaman daftar dataaset setelah berhasil
    } catch (error) {
        console.error('Error adding dataaset:', error);
        res.redirect('/kalab/dataaset?error=Failed to add dataaset');
    }
};

// Menampilkan form untuk mengedit dataaset
exports.getEditDataaset = async (req, res, next) => {
    try {
        const dataaset = await Dataaset.findByPk(req.params.id);
        if (!dataaset) {
            return res.status(404).json({ error: 'Data Aset tidak ditemukan' });
        }
        res.json(dataaset); // Return JSON instead of rendering
    } catch (error) {
        console.error('Error fetching dataaset data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Mengedit dataaset
exports.editDataaset = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body); // Log request body
        console.log('File:', req.file); // Log file info
        const { namaAset, kategoriAset, jumlahAset, spesifikasiAset } = req.body;
        const dataasetId = req.params.id;
        const userId = req.user.id; // Ambil user ID dari pengguna yang sedang login

        // Temukan lab terkait dengan userId
        const lab = await Lab.findOne({ where: { id_user: userId } });

        if (!lab) {
            return res.status(404).json({ error: 'Lab tidak ditemukan' });
        }

        const dataaset = await Dataaset.findByPk(dataasetId);
        if (!dataaset) {
            return res.status(404).send('Dataaset tidak ditemukan');
        }

        // Pastikan hanya lab yang sesuai dengan pengguna yang sedang login yang dapat mengedit dataaset tersebut
        if (dataaset.id_lab !== lab.id) {
            return res.status(403).send('Anda tidak memiliki izin untuk mengedit dataaset ini');
        }

        let fotoAset = dataaset.foto;
        if (req.file) { // Gunakan req.file untuk mendapatkan file yang diunggah
            fotoAset = req.file.filename;
        }

        // Saat menyimpan foto baru, cukup gunakan req.file.filename
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


// Menghapus dataaset
// Menghapus dataaset
exports.deleteDataaset = async (req, res, next) => {
    try {
        const dataasetId = req.params.id;
        const userId = req.user.id; // Ambil user ID dari pengguna yang sedang login

        // Temukan lab terkait dengan userId
        const lab = await Lab.findOne({ where: { id_user: userId } });

        if (!lab) {
            return res.status(404).json({ error: 'Lab tidak ditemukan untuk pengguna yang sedang login' });
        }

        const dataaset = await Dataaset.findByPk(dataasetId);
        if (!dataaset) {
            return res.status(404).send('Dataaset tidak ditemukan');
        }

        // Pastikan hanya lab yang sesuai dengan pengguna yang sedang login yang dapat menghapus dataaset tersebut
        if (dataaset.id_lab !== lab.id) {
            return res.status(403).send('Anda tidak memiliki izin untuk menghapus dataaset ini');
        }

        await dataaset.destroy();
        res.redirect('/kalab/dataaset'); // Redirect kembali ke halaman daftar dataaset setelah berhasil menghapus
    } catch (error) {
        console.error('Error deleting dataaset:', error);
        next(error);
    }
};

