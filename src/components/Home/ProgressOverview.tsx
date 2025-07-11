import React from 'react';
import { BookOpen, MessageSquare, Award, TrendingUp } from 'lucide-react';
import { mockProgressStats } from '../../data/mockData';

const ProgressOverview: React.FC = () => {
  const progressItems = [
    {
      icon: BookOpen,
      label: 'บทเรียน',
      current: mockProgressStats.completedLessons,
      total: mockProgressStats.totalLessons,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: MessageSquare,
      label: 'คำศัพท์',
      current: mockProgressStats.learnedVocabulary,
      total: mockProgressStats.totalVocabulary,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      icon: Award,
      label: 'ความสำเร็จ',
      current: 3,
      total: 6,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      label: 'เวลาเรียน',
      current: Math.floor(mockProgressStats.totalStudyTime / 60),
      total: 50,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      unit: 'ชม.'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">ความก้าวหน้า</h3>
        <button className="text-sm text-primary-600 font-medium hover:text-primary-700">
          ดูทั้งหมด
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {progressItems.map((item, index) => {
          const Icon = item.icon;
          const percentage = Math.round((item.current / item.total) * 100);
          
          return (
            <div 
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 card-hover animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${item.textColor}`} />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                  <span className="text-xs text-gray-500">
                    {percentage}%
                  </span>
                </div>
                
                <div className="bg-gray-100 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${item.color} rounded-full h-2 progress-bar`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {item.current} / {item.total} {item.unit || ''}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mt-6">
        <h4 className="font-medium text-gray-900 mb-4">สถิติสัปดาห์นี้</h4>
        <div className="flex items-end justify-between space-x-2 h-24">
          {mockProgressStats.weeklyProgress.map((day, index) => {
            const maxMinutes = Math.max(...mockProgressStats.weeklyProgress.map(d => d.minutes));
            const height = (day.minutes / maxMinutes) * 100;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-sm w-full transition-all duration-500 hover:from-primary-600 hover:to-primary-500"
                  style={{ 
                    height: `${height}%`,
                    minHeight: day.minutes > 0 ? '8px' : '2px'
                  }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{day.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;