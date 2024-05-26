const { Lab } = require('../models');

// Menampilkan daftar laboratorium
exports.getAllLabs = async (req, res, next) => {
  try {
    const labs = await Lab.findAll();
    res.render('admin/lab', { labs });
  } catch (error) {
    next(error);
  }
};
