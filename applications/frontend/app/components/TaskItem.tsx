"use client";

import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { BoldText, CommonText } from "./text";
import { Task } from "@packages/domain";

interface TaskItemProps {
  task: Task,
  onDeleteTask: (task: Task) => void,
  onToggleCheckBox: (task: Task) => Promise<void>
}

export default function TaskItem({ task, onDeleteTask, onToggleCheckBox }: TaskItemProps) {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  const handleCheckBoxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isTargetChecked = e.target.checked;

    onToggleCheckBox(task)
      .then(() => {
        setIsCompleted(isTargetChecked);
      })
  }

  const principalColor = isCompleted ? "text-zinc-400" : "text-white";

  return (
    <li className="flex items-center gap-2 p-4 bg-zinc-700 rounded-lg border border-zinc-600 hover:bg-zinc-600 transition-all">
      <Checkbox
        checked={isCompleted}
        onChange={handleCheckBoxClick}
        className={`hover:bg-zinc-400/10 rounded-lg transition-all p-2 ${principalColor}`}
        disableRipple
      />
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
        className="hover:bg-red-400/10 rounded-lg transition-all text-red-400 p-2"
        disableRipple
      >
        <DeleteIcon />
      </IconButton>
    </li>
  );
}
