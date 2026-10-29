# Backend todo-app (Praktikum 4 & 5)

RESTful API Express + TypeScript + MySQL dengan autentikasi JWT, struktur MVC:

```
src/
├── config/db.ts               koneksi pool MySQL
├── models/                    query SQL (userModel, todoModel)
├── middlewares/               validator & verifyToken (JWT)
├── controllers/               authController, todoController
├── routes/
│   ├── authRoutes.ts          /register, /login
│   ├── todoRoutes.ts          CRUD todo
│   └── index.ts               penghubung: /auth & /todos (+ verifyToken)
├── app.ts                     express, cors, /api, 404 handler, global error handler
└── server.ts                  dotenv.config() + app.listen
```

## Menjalankan

1. Start MySQL di XAMPP, buka phpMyAdmin → tab **SQL**, jalankan isi `todo_db.sql`.
2. Pastikan file `.env` ada (contoh di `.env.example`).
3. `npm install` lalu `npm run dev` → `Server berjalan di http://localhost:5000`.

## Endpoint

| Method | URL | Auth | Body |
|---|---|---|---|
| POST | `/api/auth/register` | – | `{ username, email, password }` |
| POST | `/api/auth/login` | – | `{ username, password }` → `token` |
| GET | `/api/todos` | Bearer | – |
| GET | `/api/todos/:id` | Bearer | – |
| POST | `/api/todos` | Bearer | `{ task }` |
| PUT | `/api/todos/:id` | Bearer | `{ task?, is_completed? }` (minimal salah satu) |
| DELETE | `/api/todos/:id` | Bearer | – |

Route lain → `404 { success: false, message: "Route GET /api/... tidak ditemukan!" }`.
User contoh (Andi, Budi, Citra, Doni) bisa login dengan password `password123`.

## Uji di Postman

Import `postman/todo-app.postman_collection.json`, jalankan berurutan:
**Register → login → add task → index → Edit task → GetTaskById → Hapus Task → 404 Handler → Auth Handler**.

- *login* menyimpan token ke `{{jwt_token}}`.
- *add task* menyimpan id todo baru ke `{{todo_id}}`, dipakai Edit / GetTaskById / Hapus.
