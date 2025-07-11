export interface User {
  id: string;
  name: string;
  email: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  streak: number;
  totalPoints: number;
  studyHours: number;
  joinDate: string;
  avatar?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'Vocabulary' | 'Grammar' | 'Conversation' | 'Pronunciation';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  progress: number; // 0-100
  isCompleted: boolean;
  isLocked: boolean;
  thumbnail?: string;
  content: LessonContent;
}

export interface LessonContent {
  introduction: string;
  sections: LessonSection[];
  quiz: Quiz;
}

export interface LessonSection {
  id: string;
  type: 'text' | 'audio' | 'video' | 'exercise';
  title: string;
  content: string;
  audioUrl?: string;
  videoUrl?: string;
  exercise?: Exercise;
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'pronunciation';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  points: number;
}

export interface VocabularyCard {
  id: string;
  word: string;
  pronunciation: string;
  translation: string;
  definition: string;
  example: string;
  exampleTranslation: string;
  imageUrl?: string;
  audioUrl?: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isLearned: boolean;
  reviewCount: number;
  lastReviewed?: string;
}

export interface ConversationScenario {
  id: string;
  title: string;
  description: string;
  setting: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  participants: string[];
  messages: ConversationMessage[];
  vocabulary: VocabularyCard[];
  isCompleted: boolean;
}

export interface ConversationMessage {
  id: string;
  speaker: string;
  text: string;
  translation: string;
  audioUrl?: string;
  isUserTurn: boolean;
  options?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Learning' | 'Streak' | 'Social' | 'Challenge';
  requirement: number;
  progress: number;
  isUnlocked: boolean;
  unlockedDate?: string;
  points: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'vocabulary' | 'grammar' | 'listening' | 'speaking';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number; // in minutes
  points: number;
  isCompleted: boolean;
  expiresAt: string;
  content: ChallengeContent;
}

export interface ChallengeContent {
  questions: ChallengeQuestion[];
  totalQuestions: number;
}

export interface ChallengeQuestion {
  id: string;
  type: 'multiple-choice' | 'translation' | 'pronunciation';
  question: string;
  options?: string[];
  correctAnswer: string;
  points: number;
  timeLimit?: number;
}

export interface ProgressStats {
  totalLessons: number;
  completedLessons: number;
  totalVocabulary: number;
  learnedVocabulary: number;
  studyStreak: number;
  totalStudyTime: number; // in minutes
  weeklyProgress: WeeklyProgress[];
  strongAreas: string[];
  improvementAreas: string[];
}

export interface WeeklyProgress {
  day: string;
  minutes: number;
  lessons: number;
  vocabulary: number;
}

export interface UserPreferences {
  language: 'th' | 'en';
  notifications: boolean;
  soundEffects: boolean;
  dailyGoal: number; // minutes per day
  reminderTime: string;
  theme: 'light' | 'dark';
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  isActive: boolean;
}