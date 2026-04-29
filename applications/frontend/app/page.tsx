"use client";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { EmptyTaskListWarning, TaskItem } from "./components";
import { Title, Title2 } from "./components/text";
import { Task } from "@packages/domain";
import { taskService } from "./services";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // TODO error treatment
    taskService
      .getTasks()
      .then((tasks) => setTasks(tasks));
  }, []);

  const handleAddTask = () => {
    if (inputValue.trim() === "") return;

    // TODO add loading
    
    // TODO error treatment
    taskService.addTask({
      title: inputValue
    }).then(newTask => {
      setTasks([newTask, ...tasks]);
      setInputValue("");
    });
  };

  const handleFormSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    handleAddTask();
  };

  return (
    <div className="flex flex-1 justify-center font-sans bg-zinc-900">
      <main className="flex flex-col min-w-xl w-3/4 max-w-7xl space-y-8 h-screen py-12">
        <Title>Smart To-Do List</Title>

        <form className="flex gap-2" onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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

        <div className="flex-1 space-y-3 overflow-hidden pb-12">
          <Title2>Tarefas ({tasks.length})</Title2>

          {tasks.length === 0 ? (
            <EmptyTaskListWarning />
          ) : (
            <ul className="h-full space-y-2 overflow-y-auto scrollbar scrollbar-thumb-zinc-600 scrollbar-track-zinc-400/10">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
