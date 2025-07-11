import { User, Lesson, VocabularyCard, ConversationScenario, Achievement, DailyChallenge, ProgressStats } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'สมชาย ใจดี',
  email: 'somchai@example.com',
  level: 'Intermediate',
  streak: 15,
  totalPoints: 2450,
  studyHours: 45,
  joinDate: '2024-01-15',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
};

export const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Basic Greetings',
    description: 'Learn essential greetings and introductions',
    category: 'Conversation',
    level: 'Beginner',
    duration: 15,
    progress: 100,
    isCompleted: true,
    isLocked: false,
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    content: {
      introduction: 'In this lesson, you will learn basic greetings in English.',
      sections: [
        {
          id: '1',
          type: 'text',
          title: 'Common Greetings',
          content: 'Hello, Hi, Good morning, Good afternoon, Good evening'
        }
      ],
      quiz: {
        id: '1',
        questions: [],
        passingScore: 80
      }
    }
  },
  {
    id: '2',
    title: 'Present Simple Tense',
    description: 'Master the present simple tense structure',
    category: 'Grammar',
    level: 'Beginner',
    duration: 25,
    progress: 75,
    isCompleted: false,
    isLocked: false,
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    content: {
      introduction: 'Learn how to use present simple tense correctly.',
      sections: [],
      quiz: { id: '2', questions: [], passingScore: 80 }
    }
  },
  {
    id: '3',
    title: 'Food Vocabulary',
    description: 'Essential food and drink vocabulary',
    category: 'Vocabulary',
    level: 'Beginner',
    duration: 20,
    progress: 0,
    isCompleted: false,
    isLocked: false,
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    content: {
      introduction: 'Learn vocabulary related to food and drinks.',
      sections: [],
      quiz: { id: '3', questions: [], passingScore: 80 }
    }
  },
  {
    id: '4',
    title: 'Pronunciation Practice',
    description: 'Improve your English pronunciation',
    category: 'Pronunciation',
    level: 'Intermediate',
    duration: 30,
    progress: 0,
    isCompleted: false,
    isLocked: true,
    thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    content: {
      introduction: 'Practice pronunciation of difficult English sounds.',
      sections: [],
      quiz: { id: '4', questions: [], passingScore: 80 }
    }
  }
];

export const mockVocabulary: VocabularyCard[] = [
  {
    id: '1',
    word: 'Hello',
    pronunciation: '/həˈloʊ/',
    translation: 'สวัสดี',
    definition: 'A greeting used when meeting someone',
    example: 'Hello, how are you today?',
    exampleTranslation: 'สวัสดี วันนี้เป็นอย่างไรบ้าง?',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    category: 'Greetings',
    difficulty: 'Easy',
    isLearned: true,
    reviewCount: 5,
    lastReviewed: '2024-01-20'
  },
  {
    id: '2',
    word: 'Restaurant',
    pronunciation: '/ˈrɛstərɑnt/',
    translation: 'ร้านอาหาร',
    definition: 'A place where people pay to sit and eat meals',
    example: 'We went to a nice restaurant for dinner.',
    exampleTranslation: 'เราไปร้านอาหารดีๆ สำหรับมื้อเย็น',
    imageUrl: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    category: 'Places',
    difficulty: 'Medium',
    isLearned: false,
    reviewCount: 2,
    lastReviewed: '2024-01-18'
  },
  {
    id: '3',
    word: 'Beautiful',
    pronunciation: '/ˈbjutɪfəl/',
    translation: 'สวยงาม',
    definition: 'Pleasing to the senses or mind aesthetically',
    example: 'The sunset is beautiful tonight.',
    exampleTranslation: 'พระอาทิตย์ตกสวยงามมากคืนนี้',
    imageUrl: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    category: 'Adjectives',
    difficulty: 'Medium',
    isLearned: true,
    reviewCount: 8,
    lastReviewed: '2024-01-19'
  },
  {
    id: '4',
    word: 'Airport',
    pronunciation: '/ˈɛrˌpɔrt/',
    translation: 'สนามบิน',
    definition: 'A place where aircraft take off and land',
    example: 'I need to go to the airport to catch my flight.',
    exampleTranslation: 'ฉันต้องไปสนามบินเพื่อขึ้นเครื่องบิน',
    imageUrl: 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    category: 'Travel',
    difficulty: 'Easy',
    isLearned: false,
    reviewCount: 1,
    lastReviewed: '2024-01-17'
  }
];

export const mockConversations: ConversationScenario[] = [
  {
    id: '1',
    title: 'Ordering Food at Restaurant',
    description: 'Practice ordering food and drinks at a restaurant',
    setting: 'Restaurant',
    level: 'Beginner',
    participants: ['Customer', 'Waiter'],
    isCompleted: false,
    vocabulary: mockVocabulary.slice(0, 2),
    messages: [
      {
        id: '1',
        speaker: 'Waiter',
        text: 'Good evening! Welcome to our restaurant. How many people?',
        translation: 'สวัสดีตอนเย็น! ยินดีต้อนรับสู่ร้านอาหารของเรา กี่คนครับ?',
        isUserTurn: false,
        options: []
      },
      {
        id: '2',
        speaker: 'Customer',
        text: '',
        translation: '',
        isUserTurn: true,
        options: [
          'Table for two, please.',
          'Just one person.',
          'We have a reservation.'
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'At the Airport',
    description: 'Navigate through airport procedures',
    setting: 'Airport',
    level: 'Intermediate',
    participants: ['Passenger', 'Staff'],
    isCompleted: true,
    vocabulary: mockVocabulary.slice(2, 4),
    messages: [
      {
        id: '1',
        speaker: 'Staff',
        text: 'May I see your passport and boarding pass?',
        translation: 'ขอดูหนังสือเดินทางและบัตรขึ้นเครื่องได้ไหมครับ?',
        isUserTurn: false,
        options: []
      }
    ]
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    category: 'Learning',
    requirement: 1,
    progress: 1,
    isUnlocked: true,
    unlockedDate: '2024-01-15',
    points: 50
  },
  {
    id: '2',
    title: 'Vocabulary Master',
    description: 'Learn 100 new words',
    icon: '📚',
    category: 'Learning',
    requirement: 100,
    progress: 45,
    isUnlocked: false,
    points: 200
  },
  {
    id: '3',
    title: 'Week Warrior',
    description: 'Study for 7 days in a row',
    icon: '🔥',
    category: 'Streak',
    requirement: 7,
    progress: 7,
    isUnlocked: true,
    unlockedDate: '2024-01-22',
    points: 150
  },
  {
    id: '4',
    title: 'Conversation Expert',
    description: 'Complete 10 conversation scenarios',
    icon: '💬',
    category: 'Learning',
    requirement: 10,
    progress: 3,
    isUnlocked: false,
    points: 300
  },
  {
    id: '5',
    title: 'Challenge Champion',
    description: 'Complete 20 daily challenges',
    icon: '🏆',
    category: 'Challenge',
    requirement: 20,
    progress: 8,
    isUnlocked: false,
    points: 250
  },
  {
    id: '6',
    title: 'Grammar Guru',
    description: 'Master all grammar lessons',
    icon: '✍️',
    category: 'Learning',
    requirement: 15,
    progress: 5,
    isUnlocked: false,
    points: 400
  }
];

export const mockDailyChallenge: DailyChallenge = {
  id: '1',
  title: 'Vocabulary Sprint',
  description: 'Translate 10 words in 5 minutes',
  type: 'vocabulary',
  difficulty: 'Medium',
  timeLimit: 5,
  points: 100,
  isCompleted: false,
  expiresAt: '2024-01-25T23:59:59Z',
  content: {
    totalQuestions: 10,
    questions: [
      {
        id: '1',
        type: 'translation',
        question: 'Translate: สวัสดี',
        correctAnswer: 'Hello',
        points: 10,
        timeLimit: 30
      },
      {
        id: '2',
        type: 'multiple-choice',
        question: 'What does "Beautiful" mean in Thai?',
        options: ['สวยงาม', 'น่าเกลียด', 'ใหญ่', 'เล็ก'],
        correctAnswer: 'สวยงาม',
        points: 10,
        timeLimit: 30
      }
    ]
  }
};

export const mockProgressStats: ProgressStats = {
  totalLessons: 50,
  completedLessons: 12,
  totalVocabulary: 500,
  learnedVocabulary: 85,
  studyStreak: 15,
  totalStudyTime: 2700, // 45 hours in minutes
  weeklyProgress: [
    { day: 'Mon', minutes: 45, lessons: 2, vocabulary: 8 },
    { day: 'Tue', minutes: 30, lessons: 1, vocabulary: 5 },
    { day: 'Wed', minutes: 60, lessons: 3, vocabulary: 12 },
    { day: 'Thu', minutes: 25, lessons: 1, vocabulary: 4 },
    { day: 'Fri', minutes: 40, lessons: 2, vocabulary: 7 },
    { day: 'Sat', minutes: 55, lessons: 2, vocabulary: 9 },
    { day: 'Sun', minutes: 35, lessons: 1, vocabulary: 6 }
  ],
  strongAreas: ['Vocabulary', 'Reading'],
  improvementAreas: ['Pronunciation', 'Grammar']
};