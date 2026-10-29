import TodoCachedApp from "./cached/components/TodoCachedApp";
import { getTodos } from "@/lib/todos";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Todo List
        </h1>

        <p className="text-gray-500 mb-6">
          Kelola tugas kamu dengan mudah.
        </p>

        <TodoCachedApp initialTodos={todos} />
      </div>
    </main>
  );
}