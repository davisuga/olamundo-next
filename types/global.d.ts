type Exercise = {
  id: number;
  choices: string[];
  content?: Content;
  type: "multiple_choice";
  answer: string;
  url: string;
  type: "text" | "multiple_choice" | null;
  lessonId: number;
  title: string;
  description: string;
};
type Lesson = {
  url: string;
  id: string;
  worldId: string;
  title: string;
  description: string;
  content?: string;
};
type Content = {
  htmlContent: string;
};
