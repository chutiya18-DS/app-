import React, { useState } from 'react';
import { Search, Filter, Shuffle, BookOpen } from 'lucide-react';
import VocabularyCard from '../components/Vocabulary/VocabularyCard';
import { mockVocabulary } from '../data/mockData';
import { VocabularyCard as VocabCard } from '../types';

const VocabularyPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [showOnlyUnlearned, setShowOnlyUnlearned] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [vocabularyData, setVocabularyData] = useState(mockVocabulary);

  const categories = ['All', ...Array.from(new Set(mockVocabulary.map(v => v.category)))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredVocabulary = vocabularyData.filter(vocab => {
    const matchesSearch = vocab.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vocab.translation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || vocab.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || vocab.difficulty === selectedDifficulty;
    const matchesLearned = !showOnlyUnlearned || !vocab.isLearned;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesLearned;
  });

  const handleMarkLearned = (cardId: string) => {
    setVocabularyData(prev => 
      prev.map(vocab => 
        vocab.id === cardId 
          ? { ...vocab, isLearned: true, reviewCount: vocab.reviewCount + 1 }
          : vocab
      )
    );
  };

  const handlePlayAudio = (word: string) => {
    // Simulate audio playback
    console.log('Playing audio for:', word);
    // In a real app, you would use Web Speech API or audio files
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...filteredVocabulary].sort(() => Math.random() - 0.5);
    setCurrentCardIndex(0);
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % filteredVocabulary.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + filteredVocabulary.length) % filteredVocabulary.length);
  };

  const learnedCount = vocabularyData.filter(v => v.isLearned).length;
  const totalCount = vocabularyData.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">คำศัพท์</h1>
        <p className="text-gray-600">ฝึกฝนและจดจำคำศัพท์ภาษาอังกฤษ</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold mb-1">ความก้าวหน้าคำศัพท์</h3>
            <p className="text-green-100 text-sm">เรียนรู้แล้ว {learnedCount} จาก {totalCount} คำ</p>
          </div>
          <div className="text-3xl">📚</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-100">ความก้าวหน้า</span>
            <span className="font-semibold">{Math.round((learnedCount / totalCount) * 100)}%</span>
          </div>
          <div className="bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 progress-bar"
              style={{ width: `${(learnedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ค้นหาคำศัพท์..."
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
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedDifficulty === difficulty
                    ? 'bg-secondary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {difficulty === 'All' ? 'ทั้งหมด' : difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showOnlyUnlearned}
              onChange={(e) => setShowOnlyUnlearned(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-600">แสดงเฉพาะคำที่ยังไม่เรียนรู้</span>
          </label>
          
          <button
            onClick={handleShuffle}
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            <Shuffle className="w-4 h-4" />
            <span>สุ่ม</span>
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          พบ {filteredVocabulary.length} คำศัพท์
        </p>
        {filteredVocabulary.length > 0 && (
          <p className="text-sm text-gray-600">
            {currentCardIndex + 1} / {filteredVocabulary.length}
          </p>
        )}
      </div>

      {/* Vocabulary Card */}
      {filteredVocabulary.length > 0 ? (
        <div className="space-y-4">
          <VocabularyCard
            card={filteredVocabulary[currentCardIndex]}
            onMarkLearned={handleMarkLearned}
            onPlayAudio={handlePlayAudio}
          />
          
          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handlePrevCard}
              disabled={filteredVocabulary.length <= 1}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← ก่อนหน้า
            </button>
            
            <div className="flex space-x-1">
              {filteredVocabulary.slice(0, 5).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentCardIndex ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
              {filteredVocabulary.length > 5 && (
                <span className="text-xs text-gray-500 ml-2">...</span>
              )}
            </div>
            
            <button
              onClick={handleNextCard}
              disabled={filteredVocabulary.length <= 1}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ถัดไป →
            </button>
          </div>
        </div>
      ) : (
        /* Empty state */
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📖</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบคำศัพท์</h3>
          <p className="text-gray-600">ลองเปลี่ยนคำค้นหาหรือตัวกรองดู</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">เรียนรู้แล้ว</p>
          <p className="text-xl font-bold text-gray-900">{learnedCount}</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl mb-2">🎯</div>
          <p className="text-sm text-gray-600">เหลือ</p>
          <p className="text-xl font-bold text-gray-900">{totalCount - learnedCount}</p>
        </div>
      </div>
    </div>
  );
};

export default VocabularyPage;