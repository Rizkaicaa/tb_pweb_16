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

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      'yangtautauaja',
      { expiresIn: 86400 }
    );

    res.cookie("token", token, { httpOnly: true });

    if (user.role == "Admin"){
      return res.redirect("/admin/dashboard");
    } else if (user.role == "Kepala Lab"){
      return res.redirect("/kalab/dashboard");
    } else if(user.role == "Kepala Departemen"){
      return res.redirect("/kadep/dashboard");
    }

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



module.exports = {
  form,
  prosesLogin,
  logout,
};
