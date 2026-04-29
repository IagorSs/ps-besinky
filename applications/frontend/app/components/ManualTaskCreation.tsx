"use client";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { TextField } from "./input";

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
      <TextField
        value={taskTitle}
        onChange={setTaskTitle}
        placeholder="Digite uma nova tarefa..."
        styles={{
          everClassNames: "flex-1 border-zinc-600 bg-zinc-700 text-white focus:ring-zinc-400"
        }}
        required
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
