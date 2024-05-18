const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");

const form = (req, res) => {
  res.render("login");
};

const prosesLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
  
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      'yangtautauaja',
      { expiresIn: 86400 }
    );

    // Set cookie dengan token
    res.cookie("token", token, { httpOnly: true });

    // Redirect ke halaman sesuai dengan peran pengguna
    if (user.role == "Admin"){
      return res.redirect("/admin/dashboard");
    } else if (user.role == "Kepala Lab"){
      return res.redirect("/kalab/dashboard");
    } else if(user.role == "Kepala Departemen"){
      return res.redirect("/kadep/dashboard");
    }

    // Jika tidak ada peran yang cocok, berikan respons standar
    res.status(200).send({ auth: true, token: token });

  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/auth/login");
 
}


// const changePassword = async (req, res, next) => {
//   try {
//       const { currentPassword, newPassword} = req.body;
  
//       // Cari pengguna berdasarkan userId
//       const user = await User.findByPk(req.userId);
//       console.log(user)
//       if (!user) {
//         return res.status(404).json({ message: "Pengguna tidak ditemukan" });
//       }
  
//       // Periksa apakah password saat ini cocok
//       const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ message: "Password saat ini salah" });
//       }
  
//       // Enkripsi password baru
//       const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
//       // Perbarui password pengguna di database
//       await user.update({ password: hashedNewPassword });
//       return res.status(200).json({ message: "Password berhasil diubah" });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ message: "Terjadi kesalahan server" });
//     }
//   };


module.exports = {
  form,
  prosesLogin,
  logout,
};
