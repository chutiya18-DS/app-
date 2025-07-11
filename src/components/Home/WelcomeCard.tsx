import React from 'react';
import { Calendar, Clock, Target } from 'lucide-react';
import { mockUser } from '../../data/mockData';

const WelcomeCard: React.FC = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'สวัสดีตอนเช้า' : currentHour < 18 ? 'สวัสดีตอนบ่าย' : 'สวัสดีตอนเย็น';

  return (
    <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-2xl p-6 text-white shadow-lg animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold mb-1">
            {greeting}!
          </h2>
          <p className="text-primary-100 text-sm">
            พร้อมเรียนรู้ภาษาอังกฤษกันไหม?
          </p>
        </div>
        <div className="text-4xl">
          {currentHour < 12 ? '🌅' : currentHour < 18 ? '☀️' : '🌙'}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mb-2 mx-auto">
            <Target className="w-5 h-5" />
          </div>
          <p className="text-xs text-primary-100">เป้าหมายวันนี้</p>
          <p className="text-sm font-semibold">30 นาที</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mb-2 mx-auto">
            <Calendar className="w-5 h-5" />
          </div>
          <p className="text-xs text-primary-100">ติดต่อกัน</p>
          <p className="text-sm font-semibold">{mockUser.streak} วัน</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mb-2 mx-auto">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-xs text-primary-100">เรียนแล้ว</p>
          <p className="text-sm font-semibold">{mockUser.studyHours} ชม.</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-primary-100">ความก้าวหน้าระดับ {mockUser.level}</span>
          <span className="font-semibold">75%</span>
        </div>
        <div className="mt-2 bg-white/20 rounded-full h-2">
          <div className="bg-white rounded-full h-2 progress-bar" style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;