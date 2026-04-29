export default abstract class Task {
  abstract id: number;
  abstract title: string;
  abstract isCompleted: boolean;
  abstract isGeneratedByAI: boolean;
  abstract createdAt: Date;
}
