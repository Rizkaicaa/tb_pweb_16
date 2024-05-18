# TB Kelompok 16

1. **Clone repo**

   ```bash
   git clone https://github.com/Rizkaicaa/tb_pweb_16
   ```

2. **Cd ke folder project**

   ```bash
   cd tb_pweb_16
   ```

3. **Install semua depedensi yang diperlukan**

   ```bash
   npm install
   ```

4. **Hidupkan MySQL XAMPP dan buat database & setting koneksi db pada config/config.json**

   ```bash
   "development": {
    "username": "root",
    "password": null,
    "database": "asetlab",
    "host": "localhost",
    "dialect": "mysql"
   }
   ```

5. **Lakukan migrasi tabel dari Express ke MySQL**

   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Jalankan seeder untuk mengirim data contoh ke dbL**

   ```bash
   npx sequelize-cli db:seed:all
   ```

7. **Jalankan Express dan Tailwind dengan perintah berikut di 2 terminal yang berbeda**

   ```bash
   npm run start # untuk menjalankan express
   npm run build # untuk menjalankan tailwind
   ```

8. **Untuk push perubahan silahkan buatlah branch baru terlebih dahulu**

   ```bash
   git branch (nama_branch) //buat branch baru
   git checkout (nama_branch)
   git add .
   git commit -m "lihat profil"
   git push -u origin (nama_branch)
   ```
