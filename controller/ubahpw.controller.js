const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");

const changePassword = async (req, res) => {
    try {
      const {  currentPassword, newPassword } = req.body;

      const user = await User.findByPk(req.userId);
      console.log(user)
      if (!user) {
        return res.status(404).json({ message: "Pengguna tidak ditemukan" });
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Password saat ini salah" });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      await user.update({ password: hashedNewPassword });

      let redirectUrl;
      switch (user.role) { 
          case 'Admin':
              redirectUrl = '/admin/dashboard';
              break;
          case 'Kepala Lab':
              redirectUrl = '/kalab/dashboard';
              break;
          case 'Kepala Departemen':
              redirectUrl = '/kadep/dashboard';
              break;
      }

      res.redirect(redirectUrl);
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  };

  module.exports = changePassword;
