"use client";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

interface ManualTaskCreationProps {
  handleAddTask: (title: string) => void
}

export default function ManualTaskCreation({ handleAddTask }: ManualTaskCreationProps) {
  const [taskTitle, setTaskTitle] = useState("");

    const handleAddTaskFormSubmit = (e: React.SubmitEvent) => {
      e.preventDefault();
      if (taskTitle.trim() === "") return;

      handleAddTask(taskTitle);

      setTaskTitle("");
    };

  return (
    <form className="flex gap-2" onSubmit={handleAddTaskFormSubmit}>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Digite uma nova tarefa..."
        className="flex-1 px-4 py-3 border border-zinc-600 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      
      <IconButton
        type="submit"
        aria-label="Adicionar tarefa"
        className="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        disableRipple
      >
        <AddIcon />
      </IconButton>
    </form>
  )
}
