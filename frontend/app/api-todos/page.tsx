import { getTasks } from "@/lib/tasks";
import ApiTodoList from "./components/ApiTodoList";

export default async function ApiTodosPage() {
  const { tasks } = await getTasks({
    limit: 10,
    skip: 0,
  });

  return (
    <main className="mx-auto max-w-4xl p-6">
      <ApiTodoList initialTasks={tasks} />
    </main>
  );
}