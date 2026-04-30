export interface WebSerializedTask {
  id: number;
  title: string;
  isCompleted: boolean;
  isGeneratedByAI: boolean;
  createdAt: string;
}

export default abstract class Task {
  abstract id: number;
  abstract title: string;
  abstract isCompleted: boolean;
  abstract isGeneratedByAI: boolean;
  abstract createdAt: Date;
}
