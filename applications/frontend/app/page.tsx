"use client";

import { Task } from "@packages/domain";
import { useEffect, useState } from "react";
import { AiTaskCreation, InteractionModeSwitch, ManualTaskCreation, TaskList } from "./components";
import type { InteractionMode } from './components/InteractionModeSwitch';
import { Title, Title2 } from "./components/text";
import { taskService } from "./services";
import Skeleton from '@mui/material/Skeleton';

export default function Home() {
  const [tasks, setTasksState] = useState<Task[]>([]);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>("manual");
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [starting, setStarting] = useState<boolean>(true);

  const setTasks = (newTasks: Task[]) => {
    setTasksState(newTasks);
    setCompletedTasks(
      newTasks.filter(({ isCompleted }) => isCompleted).length
    )
  }

  useEffect(() => {
    // TODO error treatment
    taskService
      .getTasks()
      .then((tasks) => {
        setTasks(tasks);
        setStarting(false);
      });
  }, []);

  const handleAddTask = (taskTitle: string) => {
    setLoading(true);

    // TODO error treatment
    taskService.addTask({
      title: taskTitle
    }).then(newTask => {
      setTasks([newTask, ...tasks]);
      setLoading(false);
    });
  };

  const handleDeleteTask = (task: Task) => {
    taskService
      .deleteTask(task)
      .then(() => {
          // TODO optimize to change render on specific item, not on entire list
          setTasks(tasks.filter(({id}) => id !== task.id))
        })
  }

  // FIXME this can generate inconsistencies between frontend and backend, maybe
  // change to simple patch to complete or uncomplete task
  const handleToggleCheckbox = async (task: Task): Promise<void> => {
    const taskIdx = tasks.findIndex(t => t.id === task.id);

    return taskService.toggleTaskCompletion(task)
      .then(() => {
        tasks[taskIdx] = {
          ...tasks[taskIdx],
          isCompleted: !tasks[taskIdx].isCompleted
        }

        setTasks(tasks);
      })
  }

  const handleCreateAiTasks = async (openAiApiKey: string, aiPrompt: string) => {
    setLoading(true);

    // TODO error treatment
    const aiGeneratedTasks = await taskService.generateTasksWithAiPrompt(openAiApiKey, aiPrompt);

    setTasks([...aiGeneratedTasks, ...tasks]);

    setLoading(false);
  }

  return (
    <div className="flex flex-1 justify-center font-sans bg-zinc-900">
      <main className="flex flex-col min-w-xl w-3/4 max-w-7xl space-y-8 h-screen py-12">

        <div className="flex">
          <Title className="flex-1">Smart To-Do List</Title>

          <InteractionModeSwitch disabled={loading} onChange={setInteractionMode} />
        </div>

        {
          interactionMode === 'manual'
            ? <ManualTaskCreation handleAddTask={handleAddTask} />
            : <AiTaskCreation handleCreateAiTasks={handleCreateAiTasks} />
        }

        <div className="flex-1 space-y-3 overflow-hidden pb-12">
          <Title2>Tarefas ({completedTasks} / {tasks.length})</Title2>

          {
            starting
              ? (
                <Skeleton variant="rounded" width='100%' height={400} sx={{ bgcolor: '#3f3f46' }} />
              )
              : (
                <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} handleToggleCheckbox={handleToggleCheckbox} />
              )
          }

        </div>
      </main>
    </div>
  );
}
