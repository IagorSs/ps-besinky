import { Task } from "@packages/domain"
import EmptyTaskListWarning from "./EmptyTaskListWarning"
import TaskItem from "./TaskItem"

interface TaskListProps {
  tasks: Task[];
  handleDeleteTask: (task: Task) => void;
  handleToggleCheckbox: (task: Task) => Promise<void>;
}

export default function TaskList({ tasks, handleDeleteTask, handleToggleCheckbox }: TaskListProps) {
  return tasks.length === 0 ? (
      <EmptyTaskListWarning />
    ) : (
      <ul className="h-full space-y-2 overflow-y-auto scrollbar scrollbar-thumb-zinc-600 scrollbar-track-zinc-400/10">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDeleteTask={handleDeleteTask}
            onToggleCheckBox={handleToggleCheckbox}
          />
        ))}
      </ul>
    )
}
