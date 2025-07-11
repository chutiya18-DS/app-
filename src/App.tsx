import React, { useState } from 'react';
import Header from './components/Layout/Header';
import BottomNav from './components/Layout/BottomNav';
import HomePage from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import ConversationPage from './pages/ConversationPage';
import AchievementsPage from './pages/AchievementsPage';
import ProfilePage from './pages/ProfilePage';
import VocabularyPage from './pages/VocabularyPage';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'lessons':
        return <LessonsPage />;
      case 'vocabulary':
        return <VocabularyPage />;
      case 'conversation':
        return <ConversationPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-6 pb-20">
        {renderPage()}
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

export default App;