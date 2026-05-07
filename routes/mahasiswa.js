const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswaController');

// GET semua mahasiswa
router.get('/', mahasiswaController.getAllMahasiswa);

// GET mahasiswa by NIM
router.get('/:nim', mahasiswaController.getMahasiswaByNim);

// CREATE mahasiswa baru
router.post('/', mahasiswaController.createMahasiswa);

// UPDATE mahasiswa
router.put('/:nim', mahasiswaController.updateMahasiswa);

// DELETE mahasiswa
router.delete('/:nim', mahasiswaController.deleteMahasiswa);

module.exports = router;
