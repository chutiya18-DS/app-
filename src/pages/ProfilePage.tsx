import React, { useState } from 'react';
import { Settings, Edit, Share, LogOut, Bell, Globe, Moon, Sun } from 'lucide-react';
import ProfileStats from '../components/Profile/ProfileStats';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'settings'>('stats');

  const settingsOptions = [
    {
      icon: Bell,
      label: 'การแจ้งเตือน',
      description: 'จัดการการแจ้งเตือนและการเตือนความจำ',
      action: () => console.log('Notifications settings')
    },
    {
      icon: Globe,
      label: 'ภาษา',
      description: 'เปลี่ยนภาษาของแอป',
      action: () => console.log('Language settings')
    },
    {
      icon: Sun,
      label: 'ธีม',
      description: 'เปลี่ยนธีมสีของแอป',
      action: () => console.log('Theme settings')
    },
    {
      icon: Share,
      label: 'แชร์แอป',
      description: 'แชร์แอปให้เพื่อนๆ',
      action: () => console.log('Share app')
    },
    {
      icon: Edit,
      label: 'แก้ไขโปรไฟล์',
      description: 'เปลี่ยนชื่อ อีเมล และรูปโปรไฟล์',
      action: () => console.log('Edit profile')
    },
    {
      icon: LogOut,
      label: 'ออกจากระบบ',
      description: 'ออกจากบัญชีผู้ใช้',
      action: () => console.log('Logout'),
      isDestructive: true
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">โปรไฟล์</h1>
        <p className="text-gray-600">จัดการบัญชีและดูสถิติการเรียนรู้</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'stats'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          สถิติ
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'settings'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          ตั้งค่า
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'stats' ? (
        <ProfileStats />
      ) : (
        <div className="space-y-4">
          {settingsOptions.map((option, index) => {
            const Icon = option.icon;
            
            return (
              <button
                key={index}
                onClick={option.action}
                className={`w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-left card-hover animate-slide-up ${
                  option.isDestructive ? 'hover:bg-red-50' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    option.isDestructive 
                      ? 'bg-red-50 text-red-600' 
                      : 'bg-primary-50 text-primary-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      option.isDestructive ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                  
                  <div className="text-gray-400">
                    →
                  </div>
                </div>
              </button>
            );
          })}

          {/* App Info */}
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <h3 className="font-medium text-gray-900 mb-1">Language Learning App</h3>
            <p className="text-sm text-gray-600 mb-2">เวอร์ชัน 1.0.0</p>
            <p className="text-xs text-gray-500">
              สร้างด้วย ❤️ เพื่อการเรียนรู้ภาษาอังกฤษ
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;