# Backend todo-app (Praktikum 4)

RESTful API Express + TypeScript + MySQL dengan autentikasi JWT, struktur MVC:
`config/` (koneksi pool) · `models/` (query SQL) · `middlewares/` (validasi & verifikasi token) · `controllers/` · `routes/`.

## Menjalankan

1. Start MySQL di XAMPP, buka phpMyAdmin → tab **SQL**, jalankan isi `todo_db.sql`.
2. Salin `.env.example` menjadi `.env` bila belum ada, sesuaikan kredensial database.
3. `npm install` lalu `npm run dev` → `Server berjalan di http://localhost:5000`.

## Endpoint

| Method | URL | Auth | Body |
|---|---|---|---|
| POST | `/api/auth/register` | – | `{ username, email, password }` |
| POST | `/api/auth/login` | – | `{ username, password }` → `token` |
| GET | `/api/todos` | Bearer token | – |
| POST | `/api/todos` | Bearer token | `{ task }` |

User contoh (Andi, Budi, Citra, Doni) bisa login dengan password `password123`.

## Uji di Postman

Import `postman/todo-app.postman_collection.json`, lalu jalankan berurutan:
**Register → login → add task → index**. Request *login* punya script Post-response
yang menyimpan token ke variabel global `{{jwt_token}}`, dipakai otomatis oleh request todo.
