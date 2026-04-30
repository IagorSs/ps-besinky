"use client";

import Skeleton from '@mui/material/Skeleton';
import { Task } from "@packages/domain";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import { AiTaskCreation, InteractionModeSwitch, ManualTaskCreation, TaskList } from "./components";
import type { InteractionMode } from './components/InteractionModeSwitch';
import { Title, Title2 } from "./components/text";
import { taskService } from "./services";

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
    const fetchTasks = async () => {
      try {
        const tasks = await taskService.getTasks();

        setTasks(tasks);
      } catch {
        enqueueSnackbar("Não foi possível buscar as tarefas criadas.");
      } finally {
        setStarting(false);
      }
    }

    fetchTasks();
  }, []);

  const handleAddTask = async (taskTitle: string): Promise<void> => {
    setLoading(true);

    try {
      const newTask = await taskService.addTask({
        title: taskTitle
      })

      setTasks([newTask, ...tasks]);
    } catch (error) {
      enqueueSnackbar(`Não foi possível criar a tarefa: ${taskTitle}`);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (task: Task): Promise<void> => {
    setLoading(true);

    try {
      await taskService.deleteTask(task);

      // TODO optimize to change render on specific item, not on entire list
      setTasks(tasks.filter(({ id }) => id !== task.id))
    } catch {
      enqueueSnackbar(`Não foi deletar a tarefa: ${task.title}`);
    } finally {
      setLoading(false);
    }
  }

  // FIXME this can generate inconsistencies between frontend and backend, maybe
  // change to simple patch to complete or uncomplete task
  const handleToggleCheckbox = async (task: Task): Promise<void> => {
    setLoading(true);
    
    try {
      const taskIdx = tasks.findIndex(t => t.id === task.id);

      await taskService.toggleTaskCompletion(task);

      const copiedTask = [...tasks];
      
      copiedTask[taskIdx] = {
        ...tasks[taskIdx],
        isCompleted: !tasks[taskIdx].isCompleted
      }

      setTasks(copiedTask);
    } catch (error) {
      enqueueSnackbar(`Não foi possível alterar o estado da tarefa: ${task.title}`);

      throw error;
    } finally {
      setLoading(false);
    }
  }

  const handleCreateAiTasks = async (openAiApiKey: string, aiPrompt: string) => {
    setLoading(true);

    try {
      const aiGeneratedTasks = await taskService.generateTasksWithAiPrompt(openAiApiKey, aiPrompt);
  
      setTasks([...aiGeneratedTasks, ...tasks]);
    } catch (error) {
      enqueueSnackbar(`Não foi criar tarefas com a instrução: ${aiPrompt}`);

      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 justify-center font-sans bg-zinc-900">
      <SnackbarProvider maxSnack={10} variant='error' anchorOrigin={{ horizontal: 'right', vertical: 'top' }} disableWindowBlurListener />
      <main className="flex flex-col min-w-xl w-3/4 max-w-7xl space-y-8 h-screen py-12">

        <div className="flex">
          <Title className="flex-1">Smart To-Do List</Title>

          <InteractionModeSwitch disabled={loading} onChange={setInteractionMode} />
        </div>

        {
          interactionMode === 'manual'
            ? <ManualTaskCreation handleAddTask={handleAddTask} />
            : <AiTaskCreation handleCreateAiTasks={handleCreateAiTasks} isLoading={loading} />
        }

        <div className="flex-1 space-y-3 overflow-hidden pb-12">
          <Title2>Tarefas ({completedTasks} / {tasks.length})</Title2>

          {
            starting
              ? (
                <Skeleton variant="rounded" width='100%' height={400} sx={{ bgcolor: '#3f3f46' }} />
              )
              : (
                <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} handleToggleCheckbox={handleToggleCheckbox} isLoading={loading} />
              )
          }

        </div>
      </main>
    </div>
  );
}
