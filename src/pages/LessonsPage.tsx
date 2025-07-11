import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import LessonCard from '../components/Lessons/LessonCard';
import { mockLessons } from '../data/mockData';
import { Lesson } from '../types';

const LessonsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const categories = ['All', 'Vocabulary', 'Grammar', 'Conversation', 'Pronunciation'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredLessons = mockLessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || lesson.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleStartLesson = (lesson: Lesson) => {
    if (lesson.isLocked) {
      alert('บทเรียนนี้ยังล็อคอยู่ เรียนบทเรียนก่อนหน้าให้เสร็จก่อน');
      return;
    }
    alert(`เริ่มเรียน: ${lesson.title} 📚`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">บทเรียน</h1>
        <p className="text-gray-600">เลือกบทเรียนที่คุณต้องการเรียนรู้</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ค้นหาบทเรียน..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          <div className="flex items-center space-x-2 min-w-max">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">หมวดหมู่:</span>
          </div>
          
          <div className="flex space-x-2 min-w-max">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category === 'All' ? 'ทั้งหมด' : category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          <div className="flex items-center space-x-2 min-w-max">
            <span className="text-sm text-gray-600">ระดับ:</span>
          </div>
          
          <div className="flex space-x-2 min-w-max">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedLevel === level
                    ? 'bg-secondary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level === 'All' ? 'ทั้งหมด' : level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          พบ {filteredLessons.length} บทเรียน
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredLessons.map((lesson, index) => (
          <div 
            key={lesson.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <LessonCard 
              lesson={lesson} 
              onStart={handleStartLesson}
            />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบบทเรียน</h3>
          <p className="text-gray-600">ลองเปลี่ยนคำค้นหาหรือตัวกรองดู</p>
        </div>
      )}
    </div>
  );
};

export default LessonsPage;