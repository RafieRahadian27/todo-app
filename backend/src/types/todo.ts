export interface CreateTodoRequest {
  task: string;
}

// task & is_completed dibuat opsional (?) karena validateUpdateTodo
// membolehkan client mengirim salah satu saja.
export interface UpdateTodoRequest {
  task?: string;
  is_completed?: boolean;
}

// Bentuk data todo yang dikirim ke client (nama field sudah ditransformasi)
export interface TodoResponse {
  id: number;
  todo: string;
  completed: boolean;
}

// Bentuk baris todo dari database
export interface TodoRow {
  id: number;
  task: string;
  is_completed: number | boolean;
}
