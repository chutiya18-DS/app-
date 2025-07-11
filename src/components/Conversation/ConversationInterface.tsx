import React, { useState } from 'react';
import { Volume2, Send, RotateCcw } from 'lucide-react';
import { ConversationScenario, ConversationMessage } from '../../types';

interface ConversationInterfaceProps {
  scenario: ConversationScenario;
  onComplete: (scenarioId: string) => void;
}

const ConversationInterface: React.FC<ConversationInterfaceProps> = ({ scenario, onComplete }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);

  const currentMessage = scenario.messages[currentMessageIndex];
  const isLastMessage = currentMessageIndex === scenario.messages.length - 1;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSendResponse = () => {
    if (!selectedOption) return;

    const newResponses = [...userResponses, selectedOption];
    setUserResponses(newResponses);
    setSelectedOption('');
    setShowTranslation(false);

    if (isLastMessage) {
      onComplete(scenario.id);
    } else {
      setCurrentMessageIndex(currentMessageIndex + 1);
    }
  };

  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    } else {
      alert('เบราว์เซอร์ไม่รองรับการเล่นเสียง');
    }
  };

  const handleRestart = () => {
    setCurrentMessageIndex(0);
    setUserResponses([]);
    setSelectedOption('');
    setShowTranslation(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{scenario.title}</h3>
            <p className="text-primary-100 text-sm">{scenario.setting}</p>
          </div>
          <button
            onClick={handleRestart}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        
        {/* Progress */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-sm text-primary-100 mb-1">
            <span>ความก้าวหน้า</span>
            <span>{currentMessageIndex + 1} / {scenario.messages.length}</span>
          </div>
          <div className="bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${((currentMessageIndex + 1) / scenario.messages.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="p-4 space-y-4 min-h-[300px]">
        {/* Previous messages */}
        {userResponses.map((response, index) => (
          <div key={index} className="space-y-2">
            {index < scenario.messages.length - 1 && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2 max-w-xs">
                  <p className="text-gray-800">{scenario.messages[index].text}</p>
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <div className="bg-primary-500 text-white rounded-2xl rounded-br-sm px-4 py-2 max-w-xs">
                <p>{response}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Current message */}
        {!currentMessage.isUserTurn ? (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 max-w-xs">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium text-gray-800">{currentMessage.speaker}</span>
                <button
                  onClick={() => handlePlayAudio(currentMessage.text)}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-800 mb-2">{currentMessage.text}</p>
              
              {showTranslation && (
                <p className="text-gray-600 text-sm border-t pt-2 animate-fade-in">
                  {currentMessage.translation}
                </p>
              )}
              
              {!showTranslation && (
                <button
                  onClick={() => setShowTranslation(true)}
                  className="text-primary-600 text-sm hover:text-primary-700"
                >
                  แสดงคำแปล
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-center text-gray-600 text-sm">เลือกคำตอบของคุณ:</p>
            
            {currentMessage.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 ${
                  selectedOption === option
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      {currentMessage.isUserTurn && (
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              {selectedOption ? (
                <div className="bg-primary-50 text-primary-700 px-3 py-2 rounded-lg">
                  {selectedOption}
                </div>
              ) : (
                <div className="text-gray-500 px-3 py-2">
                  เลือกคำตอบด้านบน
                </div>
              )}
            </div>
            <button
              onClick={handleSendResponse}
              disabled={!selectedOption}
              className={`p-3 rounded-full transition-colors ${
                selectedOption
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Completion */}
      {isLastMessage && selectedOption && (
        <div className="border-t border-gray-100 p-4 bg-green-50">
          <div className="text-center">
            <p className="text-green-600 font-medium mb-2">🎉 เยี่ยมมาก!</p>
            <p className="text-green-700 text-sm">คุณได้เสร็จสิ้นบทสนทนานี้แล้ว</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationInterface;