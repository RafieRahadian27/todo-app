"use client";

import React, { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onAddTodo(trimmedTitle);
    setTitle("");
  };

  return (
    <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-100">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tambahkan tugas baru..."
          className="flex-1"
        />

        <Button
          type="submit"
          disabled={!title.trim()}
          variant="default"
          size="md"
        >
          Tambah
        </Button>
      </form>
    </div>
  );
}