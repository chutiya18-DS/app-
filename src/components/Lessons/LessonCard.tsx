import React from 'react';
import { Clock, CheckCircle, Lock, Play } from 'lucide-react';
import { Lesson } from '../../types';

interface LessonCardProps {
  lesson: Lesson;
  onStart: (lesson: Lesson) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onStart }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Vocabulary': return 'from-blue-500 to-blue-600';
      case 'Grammar': return 'from-green-500 to-green-600';
      case 'Conversation': return 'from-purple-500 to-purple-600';
      case 'Pronunciation': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Vocabulary': return '📚';
      case 'Grammar': return '✍️';
      case 'Conversation': return '💬';
      case 'Pronunciation': return '🗣️';
      default: return '📖';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-600 bg-green-50';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'Advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover">
      {/* Thumbnail */}
      <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200">
        {lesson.thumbnail ? (
          <img 
            src={lesson.thumbnail} 
            alt={lesson.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getCategoryColor(lesson.category)} flex items-center justify-center`}>
            <span className="text-4xl">{getCategoryIcon(lesson.category)}</span>
          </div>
        )}
        
        {/* Progress overlay */}
        {lesson.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2">
            <div className="flex items-center justify-between mb-1">
              <span>ความก้าวหน้า</span>
              <span>{lesson.progress}%</span>
            </div>
            <div className="bg-white/20 rounded-full h-1">
              <div 
                className="bg-white rounded-full h-1 transition-all duration-300"
                style={{ width: `${lesson.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Status badges */}
        <div className="absolute top-2 left-2 flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(lesson.level)}`}>
            {lesson.level}
          </span>
        </div>

        <div className="absolute top-2 right-2">
          {lesson.isCompleted ? (
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          ) : lesson.isLocked ? (
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">{getCategoryIcon(lesson.category)}</span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {lesson.category}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {lesson.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {lesson.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{lesson.duration} นาที</span>
          </div>
        </div>

        <button
          onClick={() => onStart(lesson)}
          className={`w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            lesson.isLocked
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : lesson.isCompleted
              ? 'bg-green-50 text-green-600 hover:bg-green-100'
              : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg btn-hover'
          }`}
        >
          {lesson.isLocked ? (
            <>
              <Lock className="w-4 h-4" />
              <span>ล็อค</span>
            </>
          ) : lesson.isCompleted ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>ทบทวน</span>
            </>
          ) : lesson.progress > 0 ? (
            <>
              <Play className="w-4 h-4" />
              <span>เรียนต่อ</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>เริ่มเรียน</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LessonCard;