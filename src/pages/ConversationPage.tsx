import React, { useState } from 'react';
import { Play, CheckCircle, Clock, Users } from 'lucide-react';
import ConversationInterface from '../components/Conversation/ConversationInterface';
import { mockConversations } from '../data/mockData';
import { ConversationScenario } from '../types';

const ConversationPage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ConversationScenario | null>(null);

  const handleStartConversation = (scenario: ConversationScenario) => {
    setSelectedScenario(scenario);
  };

  const handleCompleteConversation = (scenarioId: string) => {
    console.log('Completed conversation:', scenarioId);
    // Here you would update the scenario completion status
    setSelectedScenario(null);
  };

  const handleBackToList = () => {
    setSelectedScenario(null);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-600 bg-green-50';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'Advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (selectedScenario) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBackToList}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← กลับ
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            {selectedScenario.title}
          </h1>
        </div>
        
        <ConversationInterface
          scenario={selectedScenario}
          onComplete={handleCompleteConversation}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">บทสนทนา</h1>
        <p className="text-gray-600">ฝึกฝนการสนทนาภาษาอังกฤษในสถานการณ์จริง</p>
      </div>

      {/* Scenarios List */}
      <div className="space-y-4">
        {mockConversations.map((scenario, index) => (
          <div 
            key={scenario.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{scenario.title}</h3>
                    {scenario.isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{scenario.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{scenario.participants.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{scenario.messages.length} ข้อความ</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(scenario.level)}`}>
                    {scenario.level}
                  </span>
                  <div className="text-2xl">
                    {scenario.setting === 'Restaurant' ? '🍽️' : 
                     scenario.setting === 'Airport' ? '✈️' : '💼'}
                  </div>
                </div>
              </div>

              {/* Vocabulary Preview */}
              {scenario.vocabulary.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">คำศัพท์ที่จะได้เรียนรู้:</h4>
                  <div className="flex flex-wrap gap-2">
                    {scenario.vocabulary.slice(0, 3).map(vocab => (
                      <span 
                        key={vocab.id}
                        className="px-2 py-1 bg-primary-50 text-primary-600 rounded-full text-xs"
                      >
                        {vocab.word}
                      </span>
                    ))}
                    {scenario.vocabulary.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                        +{scenario.vocabulary.length - 3} เพิ่มเติม
                      </span>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={() => handleStartConversation(scenario)}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  scenario.isCompleted
                    ? 'bg-green-50 text-green-600 hover:bg-green-100'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg btn-hover'
                }`}
              >
                <Play className="w-4 h-4" />
                <span>{scenario.isCompleted ? 'ฝึกซ้ำ' : 'เริ่มสนทนา'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {mockConversations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีบทสนทนา</h3>
          <p className="text-gray-600">บทสนทนาใหม่จะมาเร็วๆ นี้</p>
        </div>
      )}
    </div>
  );
};

export default ConversationPage;