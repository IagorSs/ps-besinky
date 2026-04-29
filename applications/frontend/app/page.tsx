"use client";

import { useEffect, useState } from "react";
import { EmptyTaskListWarning, ManualTaskCreation, TaskItem } from "./components";
import { Title, Title2 } from "./components/text";
import { Task } from "@packages/domain";
import { taskService } from "./services";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // TODO loading
    // TODO error treatment
    taskService
      .getTasks()
      .then((tasks) => setTasks(tasks));
  }, []);

  const handleAddTask = (taskTitle: string) => {
    // TODO add loading
    // TODO error treatment
    taskService.addTask({
      title: taskTitle
    }).then(newTask => {
      setTasks([newTask, ...tasks]);
    });
  };


  const handleDeleteTask = (task: Task) => {
    taskService
    .deleteTask(task)
    .then(() => {
        // TODO optimize to change rende on specific item, not on entire list
        setTasks(tasks.filter(({id}) => id !== task.id))
      })
  }

  return (
    <div className="flex flex-1 justify-center font-sans bg-zinc-900">
      <main className="flex flex-col min-w-xl w-3/4 max-w-7xl space-y-8 h-screen py-12">
        <Title>Smart To-Do List</Title>

        <ManualTaskCreation handleAddTask={handleAddTask} />

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
                  onDeleteTask={handleDeleteTask}
                />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
