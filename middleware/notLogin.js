const jwt = require ('jsonwebtoken')

function notLogin(req, res, next) {
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

  next();
}

module.exports = notLogin;
