# API Akademik - Mahasiswa Management

Backend API untuk manajemen data mahasiswa menggunakan Express.js dan MySQL.

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Setup database:
```sql
CREATE DATABASE akademik;

CREATE TABLE mahasiswa (
  nim varchar(10) NOT NULL PRIMARY KEY,
  nama varchar(200) NOT NULL,
  jurusan varchar(20) NOT NULL,
  email varchar(50) NOT NULL,
  no_hp varchar(13) NOT NULL
);
```

3. Buat file `.env` dari `.env.example`:
```bash
cp .env.example .env
```

4. Sesuaikan konfigurasi database di file `.env`

## Menjalankan Server

```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

### 1. GET Semua Mahasiswa
```
GET /akademik/mahasiswa/
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "nim": "001",
      "nama": "John Doe",
      "jurusan": "Teknik Informatika",
      "email": "john@example.com",
      "no_hp": "081234567890"
    }
  ],
  "total": 1
}
```

### 2. GET Mahasiswa by NIM
```
GET /akademik/mahasiswa/:nim
```

**Contoh:**
```
GET /akademik/mahasiswa/001
```

**Response:**
```json
{
  "success": true,
  "data": {
    "nim": "001",
    "nama": "John Doe",
    "jurusan": "Teknik Informatika",
    "email": "john@example.com",
    "no_hp": "081234567890"
  }
}
```

### 3. CREATE Mahasiswa Baru
```
POST /akademik/mahasiswa/
```

**Body (JSON):**
```json
{
  "nim": "001",
  "nama": "John Doe",
  "jurusan": "Teknik Informatika",
  "email": "john@example.com",
  "no_hp": "081234567890"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Mahasiswa berhasil ditambahkan",
  "data": {
    "nim": "001",
    "nama": "John Doe",
    "jurusan": "Teknik Informatika",
    "email": "john@example.com",
    "no_hp": "081234567890"
  }
}
```

### 4. UPDATE Mahasiswa
```
PUT /akademik/mahasiswa/:nim
```

**Body (JSON) - Hanya field yang ingin diupdate:**
```json
{
  "nama": "John Updated",
  "email": "john.updated@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Mahasiswa berhasil diupdate"
}
```

### 5. DELETE Mahasiswa
```
DELETE /akademik/mahasiswa/:nim
```

**Response:**
```json
{
  "success": true,
  "message": "Mahasiswa berhasil dihapus"
}
```

## Contoh Penggunaan dengan cURL

### GET semua mahasiswa
```bash
curl http://localhost:3000/akademik/mahasiswa/
```

### GET mahasiswa by NIM
```bash
curl http://localhost:3000/akademik/mahasiswa/001
```

### CREATE mahasiswa baru
```bash
curl -X POST http://localhost:3000/akademik/mahasiswa/ \
  -H "Content-Type: application/json" \
  -d '{
    "nim": "001",
    "nama": "John Doe",
    "jurusan": "Teknik Informatika",
    "email": "john@example.com",
    "no_hp": "081234567890"
  }'
```

### UPDATE mahasiswa
```bash
curl -X PUT http://localhost:3000/akademik/mahasiswa/001 \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "John Updated"
  }'
```

### DELETE mahasiswa
```bash
curl -X DELETE http://localhost:3000/akademik/mahasiswa/001
```

## Struktur Folder

```
myapp/
├── server.js                    # Entry point
├── package.json                 # Dependencies
├── .env.example                 # Environment variables template
├── config/
│   └── database.js              # Database connection
├── controllers/
│   └── mahasiswaController.js   # Business logic
└── routes/
    └── mahasiswa.js             # API routes
```

## Error Handling

API akan mengembalikan error dengan format:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

Status codes yang digunakan:
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `409` - Conflict (NIM sudah ada)
- `500` - Server Error
