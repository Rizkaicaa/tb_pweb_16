const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/index');

const form = (req, res) => {
  const token = req.cookies.token;


  if (token) {
    jwt.verify(token, 'yangtautauaja', function (err, decoded) {
      if (err) {
        res.render('login');

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

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role , nama:user.nama, no_hp: user.no_hp }, 'yangtautauaja', { expiresIn: 900 });

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

function checkUserLoggedIn(req) {
  const token = req.cookies.token;
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, 'yangtautauaja'); 
      user = {
        id: decoded.id,
        nama: decoded.nama,
        email: decoded.email,
        no_hp: decoded.no_hp,
        role: decoded.role,
      };

      console.log('User logged in:', user);
    } catch (error) {
      console.error('Token invalid or expired:', error.message);
      return { user: null };
    }
  }

  return { user };
}

const getUser = async (req) => {
  const { user } = checkUserLoggedIn(req);
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const newProfile = await User.findByPk(user.id);
  
  if (!newProfile) {
    throw new Error('User not found');
  }
  
  return newProfile;
};

const editProfil = async (req, res) => {
  const { newName, newEmail, newHp } = req.body;

  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Pengguna tidak terotentikasi" });
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    await user.update({
      nama: newName,
      email: newEmail,
      no_hp: newHp
    });

    return res.redirect('/admin/profil');
  } catch (error) {
    console.error('Error during profile editing:', error);
    return res.status(500).json({ message: 'Kesalahan server internal' });
  }
};



module.exports = {
  form,
  prosesLogin,
  logout,
  checkUserLoggedIn,
  getUser,
  editProfil,
};
