'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Button } from '@/app/components/ui/button';
import { authService } from '@/services/authService';
import { todoService } from '@/services/todoService';
import { ApiError } from '@/services/api';
import { Todo } from '@/types/todo';

export default function TodoApp() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  // Jika token kedaluwarsa / tidak valid -> logout & kembali ke halaman login
  const handleAuthError = (err: unknown): boolean => {
    if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
      authService.logout();
      router.replace('/login');
      return true;
    }
    return false;
  };

  // Auth Guard & Pemuatan Data Awal saat halaman dibuka
  useEffect(() => {
    const token = authService.getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    const loadTodos = async () => {
      try {
        setLoading(true);
        setUsername(authService.getUser()?.username ?? null);
        const data = await todoService.getTodos();
        const formatted: Todo[] = data.map((item) => ({
          id: item.id,
          title: item.todo,
          completed: Boolean(item.completed),
          createdAt: new Date().toISOString().split('T')[0],
        }));
        setTodos(formatted);
      } catch (err) {
        if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
          authService.logout();
          router.replace('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [router]);

  // Handler Tambah Tugas Baru (Create -> POST /api/todos)
  const handleAddTodo = async (title: string) => {
    try {
      const created = await todoService.createTodo(title);
      const newTodo: Todo = {
        id: created.id,
        title: created.todo,
        completed: Boolean(created.completed),
        createdAt: new Date().toISOString().split('T')[0],
      };
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      if (handleAuthError(err)) return;
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      alert(`Gagal menambah tugas: ${message}`);
    }
  };

  // Handler Checklist / Toggle Status Completed (Update -> PUT /api/todos/:id)
  const handleToggleTodo = async (id: number) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;

    const nextCompleted = !target.completed;

    // Optimistic update: ubah tampilan dulu, baru kirim ke server
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: nextCompleted } : t))
    );

    try {
      await todoService.updateTodo(id, { is_completed: nextCompleted });
    } catch (err) {
      // Rollback jika gagal
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: target.completed } : t))
      );
      if (handleAuthError(err)) return;
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      alert(`Gagal mengubah status tugas: ${message}`);
    }
  };

  // Handler Hapus Tugas (Delete -> DELETE /api/todos/:id)
  const handleDeleteTodo = async (id: number) => {
    if (!confirm('Yakin ingin menghapus tugas ini?')) return;

    const previous = todos;
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      await todoService.deleteTodo(id);
    } catch (err) {
      setTodos(previous); // Rollback jika gagal
      if (handleAuthError(err)) return;
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      alert(`Gagal menghapus tugas: ${message}`);
    }
  };

  // Handler Logout
  const handleLogout = () => {
    authService.logout();
    router.replace('/login');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          Masuk sebagai{' '}
          <span className="font-semibold text-gray-800">{username ?? '-'}</span>
        </p>
        <Button type="button" variant="outline-secondary" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <TodoForm onAddTodo={handleAddTodo} />

      {loading ? (
        <p className="text-center text-sm text-gray-400 py-8">Memuat tugas...</p>
      ) : (
        <TodoList
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      )}
    </div>
  );
}
