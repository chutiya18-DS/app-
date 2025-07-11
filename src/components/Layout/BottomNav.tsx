import React from 'react';
import { Home, BookOpen, MessageCircle, Trophy, Book } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', label: 'หน้าหลัก', icon: Home },
    { id: 'lessons', label: 'บทเรียน', icon: BookOpen },
    { id: 'vocabulary', label: 'คำศัพท์', icon: Book },
    { id: 'conversation', label: 'สนทนา', icon: MessageCircle },
    { id: 'achievements', label: 'รางวัล', icon: Trophy },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 sticky bottom-0 z-50">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-primary-600' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-primary-600' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;