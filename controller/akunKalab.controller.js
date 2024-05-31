const { User, Lab } = require('../models');
const bcrypt = require('bcrypt');

const { Op } = require('sequelize');


exports.getAllAkunKalab = async (req, res, next) => {
try {
    const users = await User.findAll({ where: { role: 'Kepala Lab' } });
    const labs = await Lab.findAll(); // Ambil data lab dari database
    res.render('admin/akunKalab', { title: 'Manajemen Akun Kepala Lab', users, labs }); // Melewatkan data lab ke template EJS
} catch (error) {
    console.error('Error in getAllAkunKalab:', error);
    next(error);
}
};

exports.addAkunKalab = async (req, res) => {
try {
const { email, password, confirm_password, nama, nip, tanggal_lahir, jenis_kelamin, no_hp, alamat, jenis_lab } = req.body;

// Validasi data tidak boleh kosong
if (!email || !password || !confirm_password || !nama || !nip || !tanggal_lahir || !jenis_kelamin || !no_hp || !alamat || !jenis_lab) {
    return res.redirect('/admin/akunKalab?error=Semua data harus diisi');
}

// Validasi password dan konfirmasi password
if (password !== confirm_password) {
    return res.redirect('/admin/akunKalab?error=Password dan Konfirmasi Password tidak sesuai');
}

// Cek apakah email sudah ada di database
let existingUser = await User.findOne({ where: { email } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=Email sudah ada');
}

// Cek apakah NIP sudah ada di database
existingUser = await User.findOne({ where: { nip } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=NIP sudah ada');
}

// Cek apakah nama sudah ada di database
existingUser = await User.findOne({ where: { nama } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=Nama sudah ada');
}

// Cek apakah no_hp sudah ada di database
existingUser = await User.findOne({ where: { no_hp } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=No HP sudah ada');
}

// Cek apakah jenis_lab sudah ada di database
existingUser = await User.findOne({ where: { jenis_lab } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=Lab sudah ada');
}

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Buat akun baru
await User.create({
    email,
    password: hashedPassword,
    role: 'Kepala Lab',
    nama,
    nip,
    tanggal_lahir,
    jenis_kelamin,
    no_hp,
    alamat,
    jenis_lab
});

res.redirect('/admin/akunKalab');
} catch (error) {
console.error('Error adding Akun Kalab:', error);
res.redirect('/admin/akunKalab?error=Gagal Menambahkan Akun Kalab');
}
};

exports.getEditAkunKalab = async (req, res, next) => {
try {
const user = await User.findByPk(req.params.id);
if (!user) {
    return res.status(404).json({ error: 'Akun Kalab tidak ditemukan' });
}
res.json(user); 
} catch (error) {
console.error('Error fetching Akun Kalab data:', error);
res.status(500).json({ error: 'Internal server error' });
}
};

exports.editAkunKalab = async (req, res, next) => {
try {
const { email, nama, nip, tanggal_lahir, jenis_kelamin, no_hp, alamat, jenis_lab } = req.body;

// Validasi data tidak boleh kosong
if (!email || !nama || !nip || !tanggal_lahir || !jenis_kelamin || !no_hp || !alamat || !jenis_lab) {
    return res.redirect('/admin/akunKalab?error=Semua data harus diisi');
}

// Cari user berdasarkan ID
const user = await User.findByPk(req.params.id);

// Jika user tidak ditemukan, kirim respons dengan pesan error
if (!user) {
    return res.status(404).send('Akun Kalab tidak ditemukan');
}

// Cek apakah email yang diinput sudah ada di database, kecuali jika email itu milik user yang sedang diedit
let existingUser = await User.findOne({ where: { email, id: { [Op.ne]: user.id } } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=Email sudah ada');
}

// Cek apakah NIP yang diinput sudah ada di database, kecuali jika NIP itu milik user yang sedang diedit
existingUser = await User.findOne({ where: { nip, id: { [Op.ne]: user.id } } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=NIP sudah ada');
}

// Cek apakah nama yang diinput sudah ada di database, kecuali jika nama itu milik user yang sedang diedit
existingUser = await User.findOne({ where: { nama, id: { [Op.ne]: user.id } } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=Nama sudah ada');
}

// Cek apakah no_hp yang diinput sudah ada di database, kecuali jika no_hp itu milik user yang sedang diedit
existingUser = await User.findOne({ where: { no_hp, id: { [Op.ne]: user.id } } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=No HP sudah ada');
}

// Cek apakah jenis_lab yang diinput sudah ada di database, kecuali jika jenis_lab itu milik user yang sedang diedit
existingUser = await User.findOne({ where: { jenis_lab, id: { [Op.ne]: user.id } } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=Lab sudah ada');
}

// Update data user
user.email = email;
user.nama = nama;
user.nip = nip;
user.tanggal_lahir = tanggal_lahir;
user.jenis_kelamin = jenis_kelamin;
user.no_hp = no_hp;
user.alamat = alamat;
user.jenis_lab = jenis_lab;

// Simpan perubahan data user
await user.save();

// Redirect ke halaman akunKalab setelah berhasil menyimpan perubahan
res.redirect('/admin/akunKalab');
} catch (error) {
console.error('Error editing Akun Kalab:', error);
next(error);
}
};

exports.deleteAkunKalab = async (req, res, next) => {
try {
const user = await User.findByPk(req.params.id);
if (!user) {
    return res.status(404).send('Akun Kalab not found');
}
await user.destroy();
res.redirect('/admin/akunKalab');
} catch (error) {
next(error);
}
};