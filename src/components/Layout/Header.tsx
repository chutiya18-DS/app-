import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { mockUser } from '../../data/mockData';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
              {mockUser.avatar ? (
                <img 
                  src={mockUser.avatar} 
                  alt={mockUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">
                สวัสดี, {mockUser.name.split(' ')[0]}!
              </h1>
              <p className="text-xs text-gray-500">
                Level: {mockUser.level}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Streak */}
            <div className="flex items-center space-x-1 bg-orange-50 px-2 py-1 rounded-full">
              <span className="text-orange-500">🔥</span>
              <span className="text-xs font-semibold text-orange-600">
                {mockUser.streak}
              </span>
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">2</span>
              </div>
            </button>

            {/* Settings */}
            <button 
              onClick={() => window.location.reload()}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;