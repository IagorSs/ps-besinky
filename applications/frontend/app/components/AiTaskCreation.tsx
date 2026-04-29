"use client";

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { TextField } from './input';

const initialAiPromptSuggestion = "Me gere uma lista de tarefas para ";

interface AiTaskCreationProps {
  handleCreateAiTasks: (openAiApiKey: string, aiPrompt: string) => Promise<void>
}

export default function AiTaskCreation({ handleCreateAiTasks }: AiTaskCreationProps) {
  const [aiPrompt, setAiPrompt] = useState(initialAiPromptSuggestion);
  const [openAiApiKey, setOpenAiApiKey] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateTasksFormSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const aiPromptTrim = aiPrompt.trim();
    const openAiApiKeyTrim = openAiApiKey.trim();

    if ([
      "",
      initialAiPromptSuggestion.trim()
    ].includes(aiPromptTrim) || openAiApiKeyTrim === "") return;

    setLoading(true);

    handleCreateAiTasks(openAiApiKeyTrim, aiPromptTrim)
      .then(() => {
        setAiPrompt(initialAiPromptSuggestion);
        setLoading(false);
      })
  }

  return (
    <form className='space-y-4' onSubmit={handleCreateTasksFormSubmit}>
      <TextField
        value={openAiApiKey}
        onChange={setOpenAiApiKey}
        placeholder="Coloque aqui sua chave de api do OpenAi"
        loading={loading}
        required
        styles={{
          everClassNames: "w-full bg-linear-to-r from-sky-900 to-sky-950 focus:ring-sky-300",
          loadingClassNames: "border-0 text-zinc-400",
          nonLoadingClassNames: "border-sky-200 text-white",
        }}
      />

      <div className="flex gap-2">
        <TextField
          value={aiPrompt}
          loading={loading}
          required
          onChange={setAiPrompt}
          styles={{
            everClassNames: "flex-1 bg-linear-to-r from-pink-900 to-pink-950 focus:ring-pink-300",
            loadingClassNames: "border-0 text-zinc-400",
            nonLoadingClassNames: "border-pink-200 text-white",
          }}
        />
        
        <IconButton
          type="submit"
          aria-label="Gerar tarefas"
          className={`py-3 px-4 text-white rounded-lg bg-linear-to-br ${loading ? "from-purple-800/50 to-indigo-800/50" : "from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"}`}
          disableRipple
          disabled={loading}
        >
          {
            loading ? <CircularProgress size={24} sx={{color: "white"}} /> : <AutoFixHighIcon />
          }
        </IconButton>
      </div>
    </form>
  )
}
