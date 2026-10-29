import { apiClient } from "./api";
import {
  ApiTodo,
  TodosApiResponse,
} from "@/types/api-todo";
import type { Todo } from "@/types/todo";

export interface FetchTodosParams {
  limit?: number;
  skip?: number;
}

export const todoService = {
  async fetchTodos(
    params: FetchTodosParams = {}
  ): Promise<TodosApiResponse> {
    const { limit = 10, skip = 0 } = params;

    return apiClient<TodosApiResponse>(
      `/todos?limit=${limit}&skip=${skip}`
    );
  },

  async fetchTodoById(id: number): Promise<ApiTodo> {
    return apiClient<ApiTodo>(`/todos/${id}`);
  },

  async createTodo(
    todo: string,
    userId: number
  ): Promise<Todo> {
    return apiClient<Todo>("/todos/add", {
      method: "POST",
      body: JSON.stringify({
        todo,
        completed: false,
        userId,
      }),
    });
  },

  async updateTodo(
    id: number,
    completed: boolean
  ): Promise<Todo> {
    return apiClient<Todo>(`/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed,
      }),
    });
  },
};