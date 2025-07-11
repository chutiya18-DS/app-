import React from 'react';
import { Lock, Calendar } from 'lucide-react';
import { Achievement } from '../../types';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Learning': return 'from-blue-500 to-blue-600';
      case 'Streak': return 'from-orange-500 to-orange-600';
      case 'Social': return 'from-purple-500 to-purple-600';
      case 'Challenge': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const progressPercentage = Math.min((achievement.progress / achievement.requirement) * 100, 100);

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 ${
      achievement.isUnlocked 
        ? 'bg-white shadow-sm border border-gray-100' 
        : 'bg-gray-50 border border-gray-200'
    } card-hover`}>
      
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${getCategoryColor(achievement.category)} opacity-10 rounded-full -mr-10 -mt-10`}></div>
      
      {/* Lock overlay for locked achievements */}
      {!achievement.isUnlocked && (
        <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center">
          <div className="text-center">
            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">ยังไม่ปลดล็อค</p>
          </div>
        </div>
      )}

      <div className="relative">
        {/* Icon and title */}
        <div className="flex items-start space-x-4 mb-4">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getCategoryColor(achievement.category)} flex items-center justify-center text-2xl ${
            achievement.isUnlocked ? '' : 'grayscale opacity-50'
          }`}>
            {achievement.icon}
          </div>
          
          <div className="flex-1">
            <h3 className={`font-semibold mb-1 ${
              achievement.isUnlocked ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {achievement.title}
            </h3>
            <p className={`text-sm ${
              achievement.isUnlocked ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {achievement.description}
            </p>
          </div>

          {achievement.isUnlocked && (
            <div className="text-right">
              <div className="text-yellow-500 text-lg">⭐</div>
              <p className="text-xs text-gray-500">{achievement.points} คะแนน</p>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className={achievement.isUnlocked ? 'text-gray-600' : 'text-gray-400'}>
              ความก้าวหน้า
            </span>
            <span className={achievement.isUnlocked ? 'text-gray-900 font-medium' : 'text-gray-500'}>
              {achievement.progress} / {achievement.requirement}
            </span>
          </div>
          
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${getCategoryColor(achievement.category)} rounded-full h-2 transition-all duration-500 ${
                achievement.isUnlocked ? '' : 'opacity-50'
              }`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Unlock date */}
        {achievement.isUnlocked && achievement.unlockedDate && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>ปลดล็อคเมื่อ {new Date(achievement.unlockedDate).toLocaleDateString('th-TH')}</span>
            </div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-0 right-0">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(achievement.category)} text-white`}>
            {achievement.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;