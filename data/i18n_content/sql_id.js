/* SQL Lessons Indonesian Content Pack — 36 lessons */
(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["sql:1"] = {
    id: {
      title: "01-Apa itu SQL dan Database?",
      concept: "Database (DB) adalah kumpulan data yang disimpan dengan struktur tertentu.\n\nPada sebagian besar sistem, data dikelola dalam bentuk **Table** yang mirip dengan sheet Excel, menggunakan **Relational Database (RDB)**.\n\n**SQL** (Structured Query Language) adalah bahasa khusus untuk memberikan perintah ke database, seperti \"ambil data\" atau \"tambah data\".\n\nPada pelajaran ini kita akan mengambil seluruh data dari student master table sekolah dan mencoba perintah query paling dasar.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:2"] = {
    id: {
      title: "02-Struktur Table (Data Type dan Primary Key)",
      concept: "Table terdiri dari Column dan Row (Record).\nSetiap Column memiliki **Data Type** yang ditentukan, misalnya INT (bilangan bulat), VARCHAR (teks), DATETIME (tanggal). Data yang tidak sesuai tipe tidak dapat disimpan.\nSelain itu, untuk mengidentifikasi setiap baris secara unik, table memiliki **Primary Key**. Nilai Primary Key tidak boleh sama dalam satu table.\nContohnya pada department master table departments_mst, department_id menjadi Primary Key.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:3"] = {
    id: {
      title: "03-SELECT ① Sintaks Dasar",
      concept: "Struktur dasar untuk mengambil data adalah `SELECT nama_kolom FROM nama_tabel;`\nJika ingin mengambil semua kolom, gunakan `*` (Asterisk) sebagai pengganti nama kolom.\nJika hanya butuh kolom tertentu, sebutkan nama kolom dipisahkan koma.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:4"] = {
    id: {
      title: "04-SELECT ② Filter Kondisi: WHERE",
      concept: "Untuk memfilter data yang diambil berdasarkan kondisi tertentu, gunakan **WHERE clause**.\nSintaks: `SELECT nama_kolom FROM nama_tabel WHERE kondisi;`\nMisalnya, untuk mengambil hanya siswa yang usianya (age) 20 tahun, gunakan `WHERE age = 20`.\nSaat menentukan teks sebagai kondisi, harus dibungkus dengan single quote `'`.\nPada database sekolah, nilai `'0'` pada field gender berarti laki-laki, dan `'1'` berarti perempuan.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:5"] = {
    id: {
      title: "05-SELECT ③ Multi Kondisi: AND",
      concept: "Saat **semua kondisi harus terpenuhi**, gunakan **AND**.\nSintaks: `WHERE kondisi1 AND kondisi2`\nMisalnya, mencari siswa \"berusia 24 tahun dan department ID 1\".\n\n**【Kata Kunci Utama】**\n・**AND**: hanya mengambil baris yang memenuhi semua kondisi yang ditentukan secara bersamaan.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:6"] = {
    id: {
      title: "06-SELECT ④ Multi Kondisi: OR",
      concept: "Saat **cukup memenuhi salah satu kondisi**, gunakan **OR**.\nSintaks: `WHERE kondisi1 OR kondisi2`\nMisalnya, mengambil siswa yang \"department ID 1 atau 2\".\n\n**【Kata Kunci Utama】**\n・**OR**: jika memenuhi salah satu kondisi yang ditentukan, baris tersebut disertakan.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:7"] = {
    id: {
      title: "07-SELECT ⑤ Kombinasi AND dan OR",
      concept: "AND dan OR dapat dikombinasikan dalam satu WHERE clause.\n\n**Perhatian**: Dalam SQL **AND memiliki prioritas lebih tinggi daripada OR** (seperti perkalian dihitung sebelum penjumlahan).\n\nAgar dievaluasi sesuai urutan yang diinginkan, kelompokkan dengan tanda kurung `()` seperti dalam matematika.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:8"] = {
    id: {
      title: "08-SELECT ⑥ Comparison Operator",
      concept: "Selain tanda sama dengan (=), ada berbagai comparison operator:\n\n- `>` (lebih besar dari) / `<` (lebih kecil dari)\n- `>=` (lebih besar atau sama dengan) / `<=` (lebih kecil atau sama dengan)\n- `<>` atau `!=` (tidak sama dengan)\n\nOperator ini dapat digunakan untuk memfilter, misalnya mencari siswa dalam rentang nilai tertentu atau mengecualikan data tertentu.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:9"] = {
    id: {
      title: "09-SELECT ⑦ IS NULL / IS NOT NULL",
      concept: "Keadaan tanpa nilai yang dimasukkan disebut **NULL**.\n\nSaat membandingkan NULL, jangan gunakan `= NULL`, melainkan operator khusus **IS NULL** atau **IS NOT NULL**.\n\nPada table sekolah, field delete_at bagi siswa yang belum dihapus (belum keluar) bernilai NULL.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:10"] = {
    id: {
      title: "10-SELECT ⑧ Pencarian Pola LIKE",
      concept: "Untuk pencarian kecocokan sebagian, gunakan **LIKE** operator dengan wildcard.\n\n- **%**: string karakter apa pun sepanjang 0 karakter atau lebih\n- **_**: satu karakter apa pun\n\nMisalnya `'ヤマ%'` mencocokkan semua nama yang diawali \"ヤマ\" (kecocokan depan).",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:11"] = {
    id: {
      title: "11-SELECT ⑨ Pencarian Rentang BETWEEN",
      concept: "Untuk mengambil data dalam rentang tertentu, gunakan **BETWEEN**.\n\nDitulis `WHERE nama_kolom BETWEEN A AND B` untuk menentukan rentang \"dari A hingga B\" dalam satu kalimat.\n\nMemiliki arti yang sama dengan `>= A AND <= B` tetapi lebih ringkas.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:12"] = {
    id: {
      title: "12-SELECT ⑩ Pencarian Himpunan IN",
      concept: "Untuk menilai apakah cocok dengan salah satu dari beberapa nilai, gunakan **IN**.\n\nDitulis `WHERE nama_kolom IN (nilai1, nilai2, ...)`.\n\nLebih bersih daripada mengulang OR berkali-kali.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:13"] = {
    id: {
      title: "13-SELECT ⑪ Pengurutan: ORDER BY",
      concept: "Untuk mengambil data dalam keadaan terurut, gunakan **ORDER BY** clause.\n\n- **ASC**: menaik (dari nilai kecil) ※nilai default\n- **DESC**: menurun (dari nilai besar)\n\nDitulis di akhir SELECT statement, misalnya `SELECT * FROM nama_tabel ORDER BY nama_kolom DESC;`",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:14"] = {
    id: {
      title: "14-SELECT ⑫ Batas Jumlah Baris: LIMIT",
      concept: "Untuk menentukan batas atas jumlah baris yang diambil, gunakan **LIMIT**.\n\nDitulis `LIMIT jumlah` atau `LIMIT posisi_awal(offset), jumlah`.\n\nBerguna untuk melihat beberapa baris pertama dari data dalam jumlah besar dengan cepat.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:15"] = {
    id: {
      title: "15-SELECT ⑬ Menghapus Duplikat: DISTINCT",
      concept: "Untuk menghapus baris yang duplikat dan mengambil hanya nilai unik, gunakan **DISTINCT**.\n\nDitulis `SELECT DISTINCT nama_kolom FROM nama_tabel;` tepat setelah SELECT.\n\nMemudahkan saat ingin melihat jenis nilai apa saja yang ada dalam table.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:16"] = {
    id: {
      title: "16-Function: Teks・Tanggal dll",
      concept: "SQL memiliki berbagai built-in function untuk mengubah data.\n\n- Menghitung jumlah karakter: **LENGTH()** / **CHAR_LENGTH()**\n- Menggabungkan teks: **CONCAT()**\n- Mengambil tanggal・waktu saat ini: **NOW()** / **CURRENT_DATE()**\n\nDengan function ini, data dapat diproses langsung pada tahap query.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:17"] = {
    id: {
      title: "17-Percabangan Kondisi: CASE WHEN",
      concept: "Saat ingin percabangan kondisi dalam SQL, gunakan **CASE expression**.\n\nSintaks: `CASE WHEN kondisi THEN nilai ELSE nilai_default END`\n\nMisalnya, dapat menampilkan hasil penilaian seperti \"nilai 80 ke atas 'lulus', selain itu 'tidak lulus'\" sebagai kolom baru.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:18"] = {
    id: {
      title: "18-Aggregate Function: Jumlah・Rata-rata・Count dll",
      concept: "Function yang menghitung data banyak baris sekaligus disebut **Aggregate Function**.\n\n- **COUNT(kolom)**: menghitung jumlah baris\n- **SUM(kolom)**: menghitung jumlah total\n- **AVG(kolom)**: menghitung rata-rata\n- **MAX(kolom)** / **MIN(kolom)**: nilai maksimum / minimum\n\nAggregate function memberikan statistik seluruh kelompok, bukan per baris.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:19"] = {
    id: {
      title: "19-Aggregate Function ②: Pengelompokan GROUP BY",
      concept: "Untuk membagi data per kelompok lalu menghitung, gunakan **GROUP BY** clause.\n\nDitulis `SELECT kolom_kelompok, AVG(kolom_agregat) FROM tabel GROUP BY kolom_kelompok;`\n\nMisalnya, menghitung \"rata-rata usia siswa laki-laki\" dan \"rata-rata usia siswa perempuan\" sekaligus.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:20"] = {
    id: {
      title: "20-Aggregate Function ③: Filter Setelah Kelompok HAVING",
      concept: "Untuk memfilter hasil **setelah** dihitung dengan GROUP BY, gunakan **HAVING** clause, bukan WHERE.\n\n- **WHERE**: memfilter baris asli sebelum dikelompokkan.\n- **HAVING**: memfilter per kelompok setelah pengelompokan.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:21"] = {
    id: {
      title: "21-Desain Database dan Normalization",
      concept: "Dalam desain database, untuk menghindari redundansi dan kontradiksi yang tidak perlu, data dibagi ke beberapa table. Ini disebut **Normalization**.\n\nMisalnya, pada student table tidak menulis \"nama departemen\" secara langsung, melainkan hanya mencatat \"department ID\", lalu detail dikelola dalam \"department table\" terpisah.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:22"] = {
    id: {
      title: "22-Menggabungkan Table ①: INNER JOIN",
      concept: "Menggabungkan table yang telah dibagi menjadi satu untuk mengambil informasi disebut **JOIN**.\n\n**INNER JOIN** hanya menggabungkan baris yang key-nya cocok dan ada di kedua table.\n\nDitulis `FROM tabelA INNER JOIN tabelB ON tabelA.key = tabelB.key`",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:23"] = {
    id: {
      title: "23-Menggabungkan Table ②: LEFT / RIGHT JOIN",
      concept: "**OUTER JOIN** mempertahankan seluruh data salah satu table sambil menggabungkan dengan table lainnya.\n\n- **LEFT JOIN**: mempertahankan seluruh data table di sisi kiri FROM clause.\n- **RIGHT JOIN**: mempertahankan seluruh data table di sisi kanan.\n- Jika tidak ada pasangan yang cocok, nilainya NULL.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:24"] = {
    id: {
      title: "24-Self Join: Menggabungkan Tabel dengan Diri Sendiri",
      concept: "Menggabungkan table dengan dirinya sendiri disebut **Self Join**.\n\nBerguna saat ingin mengekstrak pasangan yang berkaitan dari table yang sama.\n\nGunakan alias seperti `students_mst AS s1` agar table yang sama diperlakukan seolah-olah table yang berbeda.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:25"] = {
    id: {
      title: "25-Subquery",
      concept: "SQL yang bersarang di dalam SQL lain disebut **Subquery**.\n\nMisalnya, untuk mencari \"daftar siswa dengan nilai di atas rata-rata\", hitung rata-rata dengan subquery terlebih dahulu, lalu hasilnya diteruskan ke WHERE SQL luar.\n\nSubquery ditulis dengan dibungkus tanda kurung `()`.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:26"] = {
    id: {
      title: "26-Menambah Data: INSERT",
      concept: "Untuk menambah data baru ke table, gunakan **INSERT** statement.\n\nDitulis `INSERT INTO nama_tabel (kolom1, kolom2) VALUES (nilai1, nilai2);`\n\nUrutan penulisan nilai harus cocok dengan urutan kolom yang ditentukan.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:27"] = {
    id: {
      title: "27-Mengubah Data: UPDATE",
      concept: "Untuk mengubah data yang telah disimpan, gunakan **UPDATE** statement.\n\nDitulis `UPDATE nama_tabel SET nama_kolom = nilai_baru WHERE kondisi;`\n\n**Hati-hati: Jika WHERE clause dilewatkan, seluruh baris pada table akan diubah!**",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:28"] = {
    id: {
      title: "28-Menghapus Data: DELETE",
      concept: "Untuk menghapus data, gunakan **DELETE** statement.\n\nDitulis `DELETE FROM nama_tabel WHERE kondisi;`\n\nSama seperti UPDATE, **tanpa WHERE clause seluruh baris pada table akan dihapus.**",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:29"] = {
    id: {
      title: "29-Membuat Table: CREATE TABLE",
      concept: "Untuk membuat table baru, gunakan **CREATE TABLE** statement.\n\nDidefinisikan dengan `CREATE TABLE nama_tabel (nama_kolom tipe_data, nama_kolom tipe_data, ...);`\n\nPada kolom yang ditetapkan sebagai Primary Key, tambahkan constraint `PRIMARY KEY`.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:30"] = {
    id: {
      title: "30-Constraint: NOT NULL / UNIQUE / DEFAULT",
      concept: "Kolom table dapat diatur aturan (constraint) untuk menjamin kualitas data.\n\n- **NOT NULL**: melarang nilai kosong (NULL)\n- **UNIQUE**: melarang nilai duplikat\n- **DEFAULT nilai**: menetapkan nilai yang dimasukkan otomatis saat nilai dihilangkan",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:31"] = {
    id: {
      title: "31-Primary Key dan Penomoran Otomatis: AUTO_INCREMENT",
      concept: "Primary Key hanya dapat ditetapkan satu per table.\n\nPada MySQL, jika menetapkan **AUTO_INCREMENT** pada Primary Key, saat menambah data baru akan diberi nomor urut otomatis seperti \"1, 2, 3...\".",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:32"] = {
    id: {
      title: "32-Mengubah Table: ALTER TABLE",
      concept: "Untuk mengubah struktur table yang sudah dibuat, gunakan **ALTER TABLE** statement.\n\n- Menambah kolom: `ALTER TABLE nama_tabel ADD COLUMN nama_kolom tipe_data;`\n- Menghapus kolom: `ALTER TABLE nama_tabel DROP COLUMN nama_kolom;`\n- Mengganti nama kolom: `ALTER TABLE nama_tabel CHANGE COLUMN nama_lama nama_baru tipe_data;`\n\nStruktur dapat disesuaikan tanpa menghapus table.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:33"] = {
    id: {
      title: "33-Menghapus Table: DROP TABLE",
      concept: "Untuk menghapus table sepenuhnya, gunakan **DROP TABLE** statement.\n\nDitulis `DROP TABLE nama_tabel;`\n\n**Perhatian: Menjalankan DROP TABLE akan menghapus struktur dan data table secara permanen. Gunakan dengan hati-hati!**",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:34"] = {
    id: {
      title: "34-View: Table Virtual",
      concept: "**View** bukan table nyata, melainkan fungsi yang menyimpan hasil SELECT statement sebagai table virtual.\n\nDibuat dengan `CREATE VIEW nama_view AS SELECT ...;`\n\nJika query kompleks yang sering dipakai disimpan sebagai view, hasil yang sama dapat diperoleh hanya dengan `SELECT * FROM nama_view;` secara sederhana.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:35"] = {
    id: {
      title: "35-Index: Optimasi Performa Pencarian",
      concept: "**Index** adalah struktur data pendukung untuk mempercepat pencarian data.\n\nDibuat dengan `CREATE INDEX nama_index ON nama_tabel(nama_kolom);`\n\nMembuat index pada kolom yang sering dipakai sebagai kondisi WHERE akan meningkatkan performa pencarian secara signifikan. Namun index memakan ruang penyimpanan dan dapat sedikit menurunkan kecepatan INSERT/UPDATE, jadi jangan membuat terlalu banyak.",
      source: "manual-sql-id-v1"
    }
  };

  window.CONTENT_I18N["sql:36"] = {
    id: {
      title: "36-Transaction: Menjamin Integritas Data",
      concept: "**Transaction** adalah mekanisme yang mengelompokkan beberapa operasi SQL menjadi satu unit, di mana semuanya berhasil atau semuanya dibatalkan.\n\n- **BEGIN** (atau START TRANSACTION): memulai transaction\n- **COMMIT**: menetapkan seluruh perubahan\n- **ROLLBACK**: membatalkan seluruh perubahan dan kembali ke keadaan semula\n\nMisalnya pada transfer bank, \"menarik dari rekening A\" dan \"menambah ke rekening B\" harus diproses bersamaan. Jika salah satu gagal, lakukan ROLLBACK.",
      source: "manual-sql-id-v1"
    }
  };

})();
