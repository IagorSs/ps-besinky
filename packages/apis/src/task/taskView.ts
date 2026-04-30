import { Task, WebSerializedTask } from "@packages/domain";

export class TaskView extends Task {
  id: number;
  title: string;
  isCompleted: boolean;
  isGeneratedByAI: boolean;
  createdAt: Date;

  constructor(taskPlain: WebSerializedTask) {
    console.log({taskPlain});
    super();
    
    this.id = taskPlain.id;
    this.title = taskPlain.title;
    this.isCompleted = taskPlain.isCompleted;
    this.isGeneratedByAI = taskPlain.isGeneratedByAI;
    this.createdAt = new Date(taskPlain.createdAt);
  }
}
