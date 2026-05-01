"use client";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { TextField } from "./input";
import { CircularProgress } from "@mui/material";

interface ManualTaskCreationProps {
  isLoading: boolean;
  handleAddTask: (title: string) => Promise<void>
}

export default function ManualTaskCreation({ handleAddTask, isLoading }: ManualTaskCreationProps) {
  const [taskTitle, setTaskTitle] = useState("");

    const handleAddTaskFormSubmit = async (e: React.SubmitEvent) => {
      e.preventDefault();
      if (taskTitle.trim() === "") return;

      try {
        await handleAddTask(taskTitle);
  
        setTaskTitle("");
      } catch {
        // HandleAddTask has made error treatment
      }
    };

  return (
    <form className="flex gap-2" onSubmit={handleAddTaskFormSubmit}>
      <TextField
        value={taskTitle}
        onChange={setTaskTitle}
        placeholder="Digite uma nova tarefa..."
        styles={{
          everClassNames: "flex-1 bg-zinc-700 focus:ring-zinc-400",
            loadingClassNames: "border-0 text-zinc-400",
            nonLoadingClassNames: "border-zinc-600 text-white",
        }}
        required
        loading={isLoading}
      />
      
      <IconButton
        type="submit"
        aria-label="Adicionar tarefa"
        className="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        disableRipple
      >
        {
          isLoading ? <CircularProgress size={24} sx={{color: "white"}} /> : <AddIcon />
        }
      </IconButton>
    </form>
  )
}
