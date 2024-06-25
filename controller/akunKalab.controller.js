const { User, Lab } = require('../models');
const bcrypt = require('bcrypt');

const { Op } = require('sequelize');


exports.getAllAkunKalab = async (req, res, next) => {
try {
    const users = await User.findAll({ where: { role: 'Kepala Lab' } });
    const labs = await Lab.findAll(); 
    res.render('admin/akunKalab', { title: 'Manajemen Akun', users, labs }); 
} catch (error) {
    console.error('Error in getAllAkunKalab:', error);
    next(error);
}
};

exports.addAkunKalab = async (req, res) => {
try {
const { email, password, confirm_password, nama, nip, tanggal_lahir, jenis_kelamin, no_hp, alamat } = req.body;

if (!email || !password || !confirm_password || !nama || !nip || !tanggal_lahir || !jenis_kelamin || !no_hp || !alamat ) {
    return res.redirect('/admin/akunKalab?error=Semua data harus diisi');
}

if (password !== confirm_password) {
    return res.redirect('/admin/akunKalab?error=Password saat ini dan Password baru tidak sesuai');
}

let existingUser = await User.findOne({ where: { email } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=Gagal, Email sudah terdaftar untuk kepala lab lain');
}

existingUser = await User.findOne({ where: { nip } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=Gagal, NIP tidak boleh sama');
}

existingUser = await User.findOne({ where: { nama } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=Gagal, Nama Kepala Lab sudah terdaftar di Lab lain');
}

existingUser = await User.findOne({ where: { no_hp } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=Gagal, No HP tidak boleh sama');
}

const hashedPassword = await bcrypt.hash(password, 10);

await User.create({
    email,
    password: hashedPassword,
    role: 'Kepala Lab',
    nama,
    nip,
    tanggal_lahir,
    jenis_kelamin,
    no_hp,
    alamat
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
    return res.status(404).json({ error: 'Maaf, Akun Kalab tidak ditemukan' });
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

if (!email || !nama || !nip || !tanggal_lahir || !jenis_kelamin || !no_hp || !alamat ) {
    return res.redirect('/admin/akunKalab?error=Semua data harus diisi');
}

const user = await User.findByPk(req.params.id);

if (!user) {
    return res.status(404).send('Gagal, Akun Kalab tidak ditemukan');
}

let existingUser = await User.findOne({ where: { email, id: { [Op.ne]: user.id } } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=Gagal, Email sudah terdaftar untuk kepala lab lain');
}

existingUser = await User.findOne({ where: { nip, id: { [Op.ne]: user.id } } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=Gagal, NIP tidak boleh sama');
}

existingUser = await User.findOne({ where: { nama, id: { [Op.ne]: user.id } } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=Gagal, Nama Kepala Lab sudah terdaftar di Lab lain');
}

existingUser = await User.findOne({ where: { no_hp, id: { [Op.ne]: user.id } } });
if (existingUser) {
    return res.redirect('/admin/akunKalab?error=Gagal, No Hp tidak boleh sama');
}

user.email = email;
user.nama = nama;
user.nip = nip;
user.tanggal_lahir = tanggal_lahir;
user.jenis_kelamin = jenis_kelamin;
user.no_hp = no_hp;
user.alamat = alamat;

await user.save();

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