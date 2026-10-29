# todo-app — Praktikum 7 (Integrasi Frontend & Backend)

Frontend **Next.js** (port 3000) ↔ Backend **Express** (port 5000) ↔ **MySQL** (`todo_db`).

## Menjalankan

1. **XAMPP**: Start **MySQL** (database `todo_db` dari `backend/todo_db.sql` sudah dibuat sebelumnya).
2. **Terminal 1 — backend**
   ```
   cd todo-app/backend
   npm install
   npm run dev
   ```
   → `Server berjalan di http://localhost:5000`
3. **Terminal 2 — frontend** (klik ikon **+** di panel terminal VS Code)
   ```
   cd todo-app/frontend
   npm install
   npm run dev
   ```
   → buka **http://localhost:3000**

Alamat backend bisa diganti lewat `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
(tanpa file ini, frontend otomatis memakai `http://localhost:5000/api`).

## Alur pengujian (bagian E modul)

1. **Register & Login** — `/register` → otomatis ke `/login` → login → masuk ke `/`.
2. **Tambah tugas** — ketik tugas → **Tambah** (POST `/api/todos`).
3. **Ubah status & detail** — centang checkbox (PUT `/api/todos/:id`), klik **Detail** (GET `/api/todos/:id`).
4. **Hapus & Logout** — **Hapus** (DELETE `/api/todos/:id`), lalu **Logout**.
5. Cek tabel `todos` di phpMyAdmin — data berubah sesuai aksi di atas.

User contoh (Andi, Budi, Citra, Doni) bisa login dengan password `password123`.

## Riwayat praktikum

Setiap praktikum ditandai dengan tag Git:

| Praktikum | Isi | Kode |
|---|---|---|
| 4 | RESTful API Express + MySQL + JWT (register, login, get & post todo) | [`praktikum-4`](../../tree/praktikum-4) |
| 5 | Update, delete, get by id, route terpisah, 404 & error handler | [`praktikum-5`](../../tree/praktikum-5) |
| 6 | Kontrak tipe, standar response, pagination, `X-Request-Id` | [`praktikum-6`](../../tree/praktikum-6) |
| 7 | Integrasi frontend Next.js dengan backend Express | [`praktikum-7`](../../tree/praktikum-7) |
