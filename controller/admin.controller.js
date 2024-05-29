const { Kalab } = require('../models');

const adminController = {
  // Menampilkan halaman manajemen Kalab
  showManajemenKalab: async (req, res) => {
    try {
      // Ambil semua Kalab dari database
      const kalabs = await Kalab.findAll();
      res.render('admin/manajemen_kalab', { kalabs });
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan pada server');
    }
  },

  // Menampilkan halaman tambah Kalab
  tambahKalab: (req, res) => {
    // Tampilkan halaman tambah Kalab
    res.render('admin/tambah_kalab');
  }
};

module.exports = adminController;
