const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/index');

const form = (req, res) => {
  const token = req.cookies.token;


  if (token) {
    jwt.verify(token, 'yangtautauaja', function (err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({
            auth: false,
            message: "Gagal untuk melakukan verifikasi token.",
          });
      }

      req.userId = decoded.id;
      req.userRole = decoded.role;
      req.userEmail = decoded.email;
    });
    
    if (req.userRole == "Admin"){
        return res.redirect("/admin/dashboard");
      } else if (req.userRole == "Kepala Lab"){
        return res.redirect("/kalab/dashboard");
      } else if(req.userRole == "Kepala Departemen"){
        return res.redirect("/kadep/dashboard");
      }
  }
  res.render('login');
};

const prosesLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'yangtautauaja', { expiresIn: 900 });

  res.cookie('token', token, { httpOnly: true });

  if (user.role == 'Admin') {
    return res.redirect('/admin/dashboard');
  } else if (user.role == 'Kepala Lab') {
    return res.redirect('/kalab/dashboard');
  } else if (user.role == 'Kepala Departemen') {
    return res.redirect('/kadep/dashboard');
  }

  res.status(200).send({ auth: true, token: token });
};

function logout(req, res) {
  res.clearCookie('token');
  res.redirect('/auth/login');
}

module.exports = {
  form,
  prosesLogin,
  logout,
};
