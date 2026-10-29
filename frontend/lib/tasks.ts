import { todoService, FetchTodosParams } from "@/services/todoService";
import { ApiTodo, TodosApiResponse, TaskItem } from "@/types/api-todo";

function formatApiTodoToTaskItem(apiTodo: ApiTodo): TaskItem {
  return {
    id: apiTodo.id,
    title: apiTodo.todo,
    completed: apiTodo.completed,
    userId: apiTodo.userId,
    source: "dummyjson-api",
  };
}

export async function getTasks(
  params: FetchTodosParams
): Promise<{
  tasks: TaskItem[];
  total: number;
  limit: number;
  skip: number;
}> {
  const { limit, skip } = params;

  try {
    const response = await todoService.fetchTodos(params);

    return {
      tasks: response.todos.map(formatApiTodoToTaskItem),
      total: response.total,
      limit: response.limit,
      skip: response.skip,
    };
  } catch (error) {
    console.error("[lib/tasks.ts] Error mengambil tasks dari API:", error);
    throw error;
  }
}

export async function getTaskById(
  id: number
): Promise<TaskItem | null> {
  try {
    const response = await todoService.fetchTodoById(id);
    return formatApiTodoToTaskItem(response);
  } catch (error) {
    console.error("[lib/tasks.ts] Error mengambil task:", error);
    throw error;
  }
}
export function getTaskStats(tasks: TaskItem[]) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const completionPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    pending,
    completionPercentage,
  };
}