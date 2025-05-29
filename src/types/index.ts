
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'student';
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  constraints?: string;
  sampleInput?: string;
  sampleOutput?: string;
  timeLimit: number;
  memoryLimit: number;
  solvedCount: number;
  totalSubmissions: number;
  isSolved?: boolean;
  isBookmarked?: boolean;
}

export interface Submission {
  id: number;
  problemId: number;
  problemTitle: string;
  language: string;
  code: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compilation Error';
  runtime?: number;
  memory?: number;
  submittedAt: string;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  category: 'Aptitude' | 'Verbal' | 'Reasoning' | 'Technical';
  duration: number; // in minutes
  totalQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdAt: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface TopicCard {
  id: string;
  title: string;
  icon: string;
  gradient: string;
  stats: {
    topics?: number;
    problems?: number;
    contests?: number;
    modules?: number;
    quizzes?: number;
    chapters?: number;
  };
  progress: number;
  route: string;
}
