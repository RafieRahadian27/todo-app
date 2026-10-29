# Backend todo-app (Praktikum 4, 5 & 6)

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
├── types/                     kontrak request/response (auth, todo, common, express.d.ts)
├── utils/response.ts          sendSuccess, sendSuccessPagination, sendError
├── app.ts                     cors, X-Request-Id + log, /api, 404 handler, error handler
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
| GET | `/api/todos?page=1&perPage=10` | Bearer | – (perPage maks 50) |
| GET | `/api/todos/:id` | Bearer | – |
| POST | `/api/todos` | Bearer | `{ task }` |
| PUT | `/api/todos/:id` | Bearer | `{ task?, is_completed? }` (minimal salah satu) |
| DELETE | `/api/todos/:id` | Bearer | – |

## Format response

```json
{
  "success": true,
  "message": "Berhasil!",
  "data": [{ "id": 13, "todo": "Belajar Express", "completed": false }],
  "meta": {
    "timestamp": "2026-10-21T01:38:12.861Z",
    "pagination": { "page": 1, "perPage": 10, "total": 8, "totalPages": 1 }
  }
}
```

- Field database ditransformasi: `task` → `todo`, `is_completed` → `completed` (boolean).
- Response error: `{ success: false, message, meta: { timestamp } }`.
- Token login ada di `data.token`.
- Setiap response membawa header `X-Request-Id`; server mencatat `[requestId] METHOD url` di terminal.

Route lain → `404 { success: false, message: "Route GET /api/... tidak ditemukan!" }`.
User contoh (Andi, Budi, Citra, Doni) bisa login dengan password `password123`.

## Uji di Postman

Import `postman/todo-app.postman_collection.json`, jalankan berurutan:
**Register → login → add task → index → index (pagination) → Edit task → GetTaskById → Hapus Task → 404 Handler → Auth Handler**.

- *login* menyimpan token ke `{{jwt_token}}`.
- *add task* menyimpan id todo baru ke `{{todo_id}}`, dipakai Edit / GetTaskById / Hapus.
