import React, { useState } from 'react';
import { Trophy, Star, Filter } from 'lucide-react';
import AchievementCard from '../components/Achievements/AchievementCard';
import { mockAchievements, mockUser } from '../data/mockData';

const AchievementsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Learning', 'Streak', 'Social', 'Challenge'];
  const unlockedAchievements = mockAchievements.filter(a => a.isUnlocked);
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0);

  const filteredAchievements = mockAchievements.filter(achievement => 
    selectedCategory === 'All' || achievement.category === selectedCategory
  );

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'All': return 'ทั้งหมด';
      case 'Learning': return 'การเรียนรู้';
      case 'Streak': return 'ความต่อเนื่อง';
      case 'Social': return 'สังคม';
      case 'Challenge': return 'ท้าทาย';
      default: return category;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">ความสำเร็จ</h1>
        <p className="text-gray-600">ติดตามความก้าวหน้าและรางวัลของคุณ</p>
      </div>

      {/* Stats Overview */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-6 h-6" />
            </div>
            <p className="text-primary-100 text-sm">ปลดล็อคแล้ว</p>
            <p className="text-xl font-bold">{unlockedAchievements.length}</p>
          </div>
          
          <div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6" />
            </div>
            <p className="text-primary-100 text-sm">คะแนนรวม</p>
            <p className="text-xl font-bold">{totalPoints.toLocaleString()}</p>
          </div>
          
          <div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="text-2xl">🎯</div>
            </div>
            <p className="text-primary-100 text-sm">ความก้าวหน้า</p>
            <p className="text-xl font-bold">
              {Math.round((unlockedAchievements.length / mockAchievements.length) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
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
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          พบ {filteredAchievements.length} รางวัล
        </p>
        <p className="text-sm text-gray-600">
          ปลดล็อคแล้ว {filteredAchievements.filter(a => a.isUnlocked).length} รางวัล
        </p>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAchievements.map((achievement, index) => (
          <div 
            key={achievement.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <AchievementCard achievement={achievement} />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบรางวัล</h3>
          <p className="text-gray-600">ลองเปลี่ยนหมวดหมู่ดู</p>
        </div>
      )}

      {/* Motivational message */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">🌟</div>
        <h3 className="font-semibold text-gray-900 mb-2">เก่งมาก!</h3>
        <p className="text-gray-600 text-sm">
          คุณได้ปลดล็อครางวัลแล้ว {unlockedAchievements.length} รางวัล 
          เรียนรู้ต่อไปเพื่อรับรางวัลเพิ่มเติม!
        </p>
      </div>
    </div>
  );
};

export default AchievementsPage;