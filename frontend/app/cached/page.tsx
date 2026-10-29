import TodoCachedApp from "./components/TodoCachedApp";
import { getTodos } from "@/lib/todos";

export default async function CachedPage() {
  const initialTodos = await getTodos();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <TodoCachedApp initialTodos={initialTodos} />
    </main>
  );
}