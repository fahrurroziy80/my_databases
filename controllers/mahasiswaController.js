const pool = require('../config/database');

// GET semua mahasiswa
exports.getAllMahasiswa = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [mahasiswa] = await connection.query('SELECT * FROM mahasiswa');
    connection.release();

    res.json({
      success: true,
      data: mahasiswa,
      total: mahasiswa.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving mahasiswa',
      error: error.message
    });
  }
};

// GET mahasiswa by NIM
exports.getMahasiswaByNim = async (req, res) => {
  try {
    const { nim } = req.params;
    const connection = await pool.getConnection();
    const [mahasiswa] = await connection.query('SELECT * FROM mahasiswa WHERE nim = ?', [nim]);
    connection.release();

    if (mahasiswa.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Mahasiswa not found'
      });
    }

    res.json({
      success: true,
      data: mahasiswa[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving mahasiswa',
      error: error.message
    });
  }
};

// CREATE mahasiswa baru
exports.createMahasiswa = async (req, res) => {
  try {
    const { nim, nama, jurusan, email, no_hp } = req.body;

    // Validasi input
    if (!nim || !nama || !jurusan || !email || !no_hp) {
      return res.status(400).json({
        success: false,
        message: 'Semua field harus diisi'
      });
    }

    const connection = await pool.getConnection();
    
    // Check jika NIM sudah ada
    const [existing] = await connection.query('SELECT nim FROM mahasiswa WHERE nim = ?', [nim]);
    if (existing.length > 0) {
      connection.release();
      return res.status(409).json({
        success: false,
        message: 'NIM sudah terdaftar'
      });
    }

    // Insert data
    await connection.query(
      'INSERT INTO mahasiswa (nim, nama, jurusan, email, no_hp) VALUES (?, ?, ?, ?, ?)',
      [nim, nama, jurusan, email, no_hp]
    );
    connection.release();

    res.status(201).json({
      success: true,
      message: 'Mahasiswa berhasil ditambahkan',
      data: { nim, nama, jurusan, email, no_hp }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating mahasiswa',
      error: error.message
    });
  }
};

// UPDATE mahasiswa
exports.updateMahasiswa = async (req, res) => {
  try {
    const { nim } = req.params;
    const { nama, jurusan, email, no_hp } = req.body;

    const connection = await pool.getConnection();
    
    // Check jika mahasiswa ada
    const [existing] = await connection.query('SELECT nim FROM mahasiswa WHERE nim = ?', [nim]);
    if (existing.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Mahasiswa not found'
      });
    }

    // Update data
    const updates = [];
    const values = [];
    
    if (nama !== undefined) {
      updates.push('nama = ?');
      values.push(nama);
    }
    if (jurusan !== undefined) {
      updates.push('jurusan = ?');
      values.push(jurusan);
    }
    if (email !== undefined) {
      updates.push('email = ?');
      values.push(email);
    }
    if (no_hp !== undefined) {
      updates.push('no_hp = ?');
      values.push(no_hp);
    }

    if (updates.length === 0) {
      connection.release();
      return res.status(400).json({
        success: false,
        message: 'Tidak ada data yang diupdate'
      });
    }

    values.push(nim);
    const query = `UPDATE mahasiswa SET ${updates.join(', ')} WHERE nim = ?`;
    
    await connection.query(query, values);
    connection.release();

    res.json({
      success: true,
      message: 'Mahasiswa berhasil diupdate'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating mahasiswa',
      error: error.message
    });
  }
};

// DELETE mahasiswa
exports.deleteMahasiswa = async (req, res) => {
  try {
    const { nim } = req.params;
    const connection = await pool.getConnection();
    
    // Check jika mahasiswa ada
    const [existing] = await connection.query('SELECT nim FROM mahasiswa WHERE nim = ?', [nim]);
    if (existing.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Mahasiswa not found'
      });
    }

    // Delete data
    await connection.query('DELETE FROM mahasiswa WHERE nim = ?', [nim]);
    connection.release();

    res.json({
      success: true,
      message: 'Mahasiswa berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting mahasiswa',
      error: error.message
    });
  }
};
