const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");

const changePassword = async (req, res) => {
    try {
      const {  currentPassword, newPassword } = req.body;
  
      // Cari pengguna berdasarkan userId
      const user = await User.findByPk(req.userId);
      console.log(user)
      if (!user) {
        return res.status(404).json({ message: "Pengguna tidak ditemukan" });
      }
  
      // Periksa apakah password saat ini cocok
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Password saat ini salah" });
      }
  
      // Enkripsi password baru
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Perbarui password pengguna di database
      await user.update({ password: hashedNewPassword });
  

      // Tentukan URL redirect berdasarkan peran pengguna
      let redirectUrl;
      switch (user.role) { // 'role' adalah kolom yang menyimpan peran pengguna
          case 'Admin':
              redirectUrl = '/admin/dashboard';
              break;
          case 'Kepala Lab':
              redirectUrl = '/kalab/dashboard';
              break;
          case 'Kepala Departemen':
              redirectUrl = '/kadep/dashboard';
              break;
          default:
              redirectUrl = '/dashboard'; // Default redirect jika peran tidak dikenal
              break;
      }

      // Redirect pengguna ke URL yang sesuai
      res.redirect(redirectUrl);
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  };

  module.exports = changePassword;
