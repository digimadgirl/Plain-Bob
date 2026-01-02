
export interface WorkStage {
  name: string;
  description: string;
  trigger: string;
  visualCue: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Define the Resource interface used by the ResourceHub component
export interface Resource {
  id: string;
  url: string;
  category: 'PDF' | 'Interactive' | 'Website';
  title: string;
}
