"use client";

import React, { useState } from "react";
import { TaskItem } from "@/types/api-todo";
import { todoService } from "@/services/todoService";
interface ApiTodoListProps {
  initialTasks: TaskItem[];
}

export default function ApiTodoList({
  initialTasks,
}: ApiTodoListProps) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
    const handleToggleTask = async (
    taskId: number,
    currentCompleted: boolean
  ) => {
    const targetStatus = !currentCompleted;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, completed: targetStatus }
          : task
      )
    );

    try {
      await todoService.updateTodo(taskId, targetStatus);
    } catch (error) {
      console.warn(
        "Simulasi update ke API DummyJSON gagal (fallback state):",
        error
      );
    }
  };

  return (
  <div className="space-y-4">
    <div>
      <h2 className="text-2xl font-bold">Todo dari API</h2>
      <p className="text-sm text-gray-500">
        Data tugas dari DummyJSON API
      </p>
    </div>

    {tasks.length === 0 ? (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-gray-500">
          Belum ada tugas.
        </p>
      </div>
    ) : (
      <div>
        {tasks.map((task) => (
          <div
  key={task.id}
  onClick={() => handleToggleTask(task.id, task.completed)}
  className={`flex items-center gap-3 rounded-lg border p-4 ${
    task.completed
      ? "bg-gray-100 opacity-70"
      : "bg-white"
  }`}
>
            <input
  type="checkbox"
  checked={task.completed}
  readOnly
  className="mt-0.5 sm:mt-0 h-5 w-5 shrink-0 cursor-pointer accent-primary-70"
/>
            <span
  className={`flex-1 ${
    task.completed
      ? "line-through text-gray-500"
      : "text-gray-900"
  }`}
>
  {task.title}
</span>
<div className="mt-1 text-xs text-gray-500">
  ID: {task.id} · User: {task.userId}
</div>
<span
  className={`rounded-full px-2 py-1 text-xs font-medium ${
    task.completed
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700"
  }`}
>
  {task.completed ? "Selesai" : "Pending"}
</span>
          </div>
        ))}
      </div>
    )}
  </div>
);
}