const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'systemsupport'
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi Mysql Gagal:', err.message);
        return;
    }
    console.log('Node.js terhubung ke MySql');
});

// Endpoint untuk mengambil data user
app.get('/api/data', (req, res) => {
    const querysql = 'select * from user';
    
    db.query(querysql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Menghidupkan server di port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan aktif di http://localhost:${PORT}`);
});
