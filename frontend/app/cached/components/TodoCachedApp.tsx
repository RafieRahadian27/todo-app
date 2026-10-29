"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import TodoForm from "@/app/components/TodoForm";
import TodoList from "@/app/components/TodoList";
import { Todo } from "@/types/todo";

type TodoCachedAppProps = {
  initialTodos: Todo[];
};

export default function TodoCachedApp({
  initialTodos,
}: TodoCachedAppProps) {
      const [todos, setTodos] = useLocalStorage<Todo[]>(
    "TODO_LIST_CACHE",
    initialTodos
  );

    const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      description: "",
      createdAt: new Date().toLocaleString(),
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

    const handleToggleTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

    const handleDeleteTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  };

    const handleReset = () => {
    setTodos(initialTodos);
  };
  return (
  <div>
    <TodoForm onAddTodo={handleAddTodo} />

    <TodoList
      todos={todos}
      onToggleTodo={handleToggleTodo}
      onDeleteTodo={handleDeleteTodo}
    />

     <button onClick={handleReset}>
    Reset
  </button>
</div>
);
}