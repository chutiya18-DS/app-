import React from 'react';
import { Calendar, Clock, BookOpen, Award, TrendingUp, Target } from 'lucide-react';
import { mockUser, mockProgressStats } from '../../data/mockData';

const ProfileStats: React.FC = () => {
  const stats = [
    {
      icon: Calendar,
      label: 'วันที่เข้าร่วม',
      value: new Date(mockUser.joinDate).toLocaleDateString('th-TH'),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: Clock,
      label: 'เวลาเรียนทั้งหมด',
      value: `${mockUser.studyHours} ชั่วโมง`,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      icon: BookOpen,
      label: 'บทเรียนที่เสร็จ',
      value: `${mockProgressStats.completedLessons} / ${mockProgressStats.totalLessons}`,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      icon: Award,
      label: 'คะแนนรวม',
      value: mockUser.totalPoints.toLocaleString(),
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      icon: TrendingUp,
      label: 'คำศัพท์ที่เรียนรู้',
      value: `${mockProgressStats.learnedVocabulary} คำ`,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      icon: Target,
      label: 'เป้าหมายประจำวัน',
      value: '30 นาที',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* User Level Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
            {mockUser.avatar ? (
              <img 
                src={mockUser.avatar} 
                alt={mockUser.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl text-white font-bold">
                {mockUser.name.charAt(0)}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{mockUser.name}</h2>
          <p className="text-gray-600">{mockUser.email}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">ระดับปัจจุบัน</span>
            <span className="font-semibold text-primary-600">{mockUser.level}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">ความก้าวหน้าไปยังระดับถัดไป</span>
              <span className="font-medium">75%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full h-3 progress-bar" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-1 text-orange-600 bg-orange-50 py-2 rounded-lg">
            <span className="text-lg">🔥</span>
            <span className="font-semibold">{mockUser.streak} วันติดต่อกัน</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <div 
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 card-hover animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${stat.textColor}`} />
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Strong Areas & Improvement Areas */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">การวิเคราะห์ผลการเรียน</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-green-600 mb-2">จุดแข็ง</h4>
            <div className="flex flex-wrap gap-2">
              {mockProgressStats.strongAreas.map((area, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-orange-600 mb-2">ควรพัฒนา</h4>
            <div className="flex flex-wrap gap-2">
              {mockProgressStats.improvementAreas.map((area, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;