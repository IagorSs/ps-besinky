"use client";

import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { BoldText, CommonText } from "./text";
import { Task } from "@packages/domain";

interface TaskItemProps {
  task: Task,
  isInteractionsDisabled: boolean;
  onDeleteTask: (task: Task) => Promise<void>,
  onToggleCheckBox: (task: Task) => Promise<void>
}

export default function TaskItem({ task, onDeleteTask, onToggleCheckBox, isInteractionsDisabled }: TaskItemProps) {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  const handleCheckBoxClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const isTargetChecked = e.target.checked;

    try {
      await onToggleCheckBox(task);

      setIsCompleted(isTargetChecked);
    } catch {
      // OnToggleCheckBox has made error treatment
    }
  }

  const principalColor = isCompleted ? "text-zinc-400" : "text-white";

  return (
    <li className={`flex items-center gap-2 p-4 ${task.isGeneratedByAI ? "bg-gradient-to-r from-purple-900 via-zinc-600 to-zinc-700": "bg-zinc-700"} rounded-lg border border-zinc-600 hover:bg-zinc-600 transition-all`}>
      <Checkbox
        checked={isCompleted}
        onChange={handleCheckBoxClick}
        className={`hover:bg-zinc-400/10 rounded-lg transition-all p-2 ${principalColor} ${isInteractionsDisabled && "opacity-30"}`}
        disableRipple
        disabled={isInteractionsDisabled}
      />

      { task.isGeneratedByAI && <AutoAwesomeIcon />}
      
      <div className="flex flex-col gap-1 flex-1">
        <BoldText className={`${principalColor} ${isCompleted && "line-through"}`}>
          {task.title}
        </BoldText>
        <CommonText>
          {task.createdAt.toLocaleString("pt-BR")}
        </CommonText>
      </div>

      <IconButton
        onClick={() => onDeleteTask(task)}
        aria-label="Deletar tarefa"
        className={`hover:bg-red-400/10 rounded-lg transition-all p-2 text-red-400 ${isInteractionsDisabled && "opacity-30"}`}
        disableRipple
        disabled={isInteractionsDisabled}
      >
        <DeleteIcon />
      </IconButton>
    </li>
  );
}
