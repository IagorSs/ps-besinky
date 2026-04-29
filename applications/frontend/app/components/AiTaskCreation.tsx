"use client";

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

const initialAiPromptSuggestion = "Me gere uma lista de tarefas para ";

interface AiTaskCreationProps {
  handleCreateAiTasks: (aiPrompt: string) => Promise<void>
}

export default function AiTaskCreation({ handleCreateAiTasks }: AiTaskCreationProps) {
  const [aiPrompt, setAiPrompt] = useState(initialAiPromptSuggestion);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateTasksFormSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const aiPromptTrim = aiPrompt.trim();

    if ([
      "",
      initialAiPromptSuggestion.trim()
    ].includes(aiPromptTrim)) return;

    setLoading(true);

    handleCreateAiTasks(aiPromptTrim)
      .then(() => {
        setAiPrompt(initialAiPromptSuggestion);
        setLoading(false);
      })
  }

  return (
    <form className="flex gap-2" onSubmit={handleCreateTasksFormSubmit}>
      <input
        type="text"
        value={aiPrompt}
        onChange={(e) => setAiPrompt(e.target.value)}
        className={`flex-1 px-4 py-3 border rounded-lg bg-linear-to-r from-pink-950 to-sky-950 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all ${loading ? "border-pink-900 text-zinc-400" : "border-pink-200 text-white"}`}
        disabled={loading}
      />
      
      <IconButton
        type="submit"
        aria-label="Gerar tarefas"
        className={`py-3 px-4 text-white rounded-lg ${loading ? "bg-pink-900" : "bg-pink-500 hover:bg-pink-600"}`}
        disableRipple
        disabled={loading}
      >
        {
          loading ? <CircularProgress size={24} sx={{color: "white"}} /> : <AutoFixHighIcon />
        }
      </IconButton>
    </form>
  )
}
