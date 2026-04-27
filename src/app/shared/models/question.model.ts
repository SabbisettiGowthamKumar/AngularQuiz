export interface Question {
  id: string;
  topic: string;
  content: string;
  options: string[];
  correctAnswer: string;
  sequence?: number;
}
