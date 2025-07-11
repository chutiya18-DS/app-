import React from 'react';
import WelcomeCard from '../components/Home/WelcomeCard';
import DailyChallengeCard from '../components/Home/DailyChallengeCard';
import ProgressOverview from '../components/Home/ProgressOverview';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <WelcomeCard />
      <DailyChallengeCard />
      <ProgressOverview />
    </div>
  );
};

export default HomePage;