import { NavigatorScreenParams } from "@react-navigation/native"

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
};

export type QuizSourceKind = 'scan' | 'pdf' | 'text';

// What the quiz was made from — carried from the Create screens through setup.
export type QuizSource = {
  kind: QuizSourceKind;
  title: string;
  detail: string;
  topicId: string;
  imageUris?: string[];
  text?: string;
};

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type QuizSettings = {
  questionCount: number;
  difficulty: Difficulty;
  multipleChoice: boolean;
  trueFalse: boolean;
  timeLimitMinutes: number | null;
};

export type Quiz = {
  id: string;
  title: string;
  source: QuizSource;
  settings: QuizSettings;
  questions: QuizQuestion[];
  createdAt: number;
};

export type QuizAttempt = {
  quiz: Quiz;
  answers: (string | null)[];
  flagged: number[];
  correctCount: number;
  secondsTaken: number;
};

export type SavedQuiz = {
  quiz: Quiz;
  status: 'toAttempt' | 'completed';
  scorePercent?: number;
  completedAt?: number;
};

export type CreateStackNavigationType = {
  CreateHome: undefined;
  CreatePasteText: undefined;
  CreateScan: undefined;
  QuizSetup: { source: QuizSource };
  Generating: { source: QuizSource; settings: QuizSettings };
  QuizTaking: { quiz: Quiz };
  QuizResults: { attempt: QuizAttempt };
  FlaggedQuestions: { attempt: QuizAttempt };
};

export type ProfileStackNavigationType = {
  ProfileHome: undefined;
  Credits: undefined;
  Language: undefined;
};

export type BottomTabNavigationType = {
  Home: undefined,
  Create: NavigatorScreenParams<CreateStackNavigationType>,
  Saved: undefined,
  Profile: NavigatorScreenParams<ProfileStackNavigationType>,
}

export type RootStackNavigationType = {
  App: NavigatorScreenParams<BottomTabNavigationType>,
  Auth: NavigatorScreenParams<AuthStackNavigationType>,
  Splash: undefined
}

export type AuthStackNavigationType = {
  SignIn: undefined,
}
