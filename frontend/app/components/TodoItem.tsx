"use client";

import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border p-4 transition ${
        todo.completed
          ? "border-green-200 bg-green-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-4 w-4 accent-green-600"
        />

        <span
          className={`text-sm ${
            todo.completed
              ? "text-gray-400 line-through"
              : "text-gray-700"
          }`}
        >
          {todo.title}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <a
          href={`/task/${todo.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          Detail
        </a>

        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          title="Hapus tugas"
          className="text-sm font-medium text-red-600 hover:text-red-700"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}