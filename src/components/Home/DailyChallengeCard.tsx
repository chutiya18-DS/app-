import React, { useState, useEffect } from 'react';
import { Clock, Star, Zap } from 'lucide-react';
import { mockDailyChallenge } from '../../data/mockData';

const DailyChallengeCard: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const expiry = new Date(mockDailyChallenge.expiresAt);
      const diff = expiry.getTime() - now.getTime();

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}ชม. ${minutes}นาที`);
      } else {
        setTimeLeft('หมดเวลาแล้ว');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">ท้าทายประจำวัน</h3>
            <p className="text-xs text-gray-500">รับคะแนนพิเศษ!</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(mockDailyChallenge.difficulty)}`}>
          {mockDailyChallenge.difficulty}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-1">
          {mockDailyChallenge.title}
        </h4>
        <p className="text-sm text-gray-600">
          {mockDailyChallenge.description}
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{mockDailyChallenge.timeLimit} นาที</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>{mockDailyChallenge.points} คะแนน</span>
          </div>
        </div>
        <div className="text-xs text-orange-600 font-medium">
          เหลือ {timeLeft}
        </div>
      </div>

      <button 
        className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 btn-hover"
        onClick={() => alert('เริ่มท้าทายแล้ว! 🎯')}
      >
        เริ่มท้าทาย
      </button>
    </div>
  );
};

export default DailyChallengeCard;