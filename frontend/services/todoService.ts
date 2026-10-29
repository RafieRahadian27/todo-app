import { apiClient } from './api';
import { ApiTodo, TodosApiResponse as DummyJsonTodosResponse } from '@/types/api-todo';

export interface BackendTodo {
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodosResponse {
  success: boolean;
  message: string;
  data: BackendTodo[];
}

export interface SingleTodoResponse {
  success: boolean;
  message: string;
  data: BackendTodo;
}

export interface FetchTodosParams {
  limit?: number;
  skip?: number;
}

export interface CreateTodoInput {
  todo: string;
  completed?: boolean;
  userId?: number;
}

export const todoService = {

  async getTodos(): Promise<BackendTodo[]> {
    const res = await apiClient<TodosResponse>('/todos?perPage=50');
    return res.data || [];
  },

  async getTodoById(id: number | string): Promise<BackendTodo> {
    const res = await apiClient<SingleTodoResponse>(`/todos/${id}`);
    return res.data;
  },

  async createTodo(payload: string | CreateTodoInput): Promise<BackendTodo> {
    const task = typeof payload === 'string' ? payload : payload.todo;
    const res = await apiClient<SingleTodoResponse>('/todos', {
      method: 'POST',
      body: JSON.stringify({ task }),
    });
    return res.data;
  },

  async updateTodo(
    id: number | string,
    payload: { task?: string; is_completed?: boolean }
  ): Promise<void> {
    await apiClient(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteTodo(id: number | string): Promise<void> {
    await apiClient(`/todos/${id}`, {
      method: 'DELETE',
    });
  },

  // ---------------------------------------------------------------
  // Fungsi kompatibilitas untuk halaman lama (lib/tasks.ts, /api-todos,
  // app/api/todos) yang masih memakai bentuk data DummyJSON.
  // Datanya sekarang diambil dari backend Express.
  // ---------------------------------------------------------------
  async fetchTodos(params: FetchTodosParams = { limit: 15, skip: 0 }): Promise<DummyJsonTodosResponse> {
    try {
      const todos = await this.getTodos();
      const mapped: ApiTodo[] = todos.map((t) => ({
        id: t.id,
        todo: t.todo,
        completed: t.completed,
        userId: 1,
      }));
      return {
        todos: mapped,
        total: mapped.length,
        skip: params.skip || 0,
        limit: params.limit || mapped.length,
      };
    } catch {
      // Gagal (mis. belum login / backend mati) -> kembalikan daftar kosong
      return { todos: [], total: 0, skip: params.skip || 0, limit: params.limit || 0 };
    }
  },

  async fetchTodoById(id: number | string): Promise<ApiTodo> {
    const t = await this.getTodoById(id);
    return { id: t.id, todo: t.todo, completed: t.completed, userId: 1 };
  },
};
