import React, { useState } from 'react';
import { Volume2, RotateCcw, CheckCircle, X } from 'lucide-react';
import { VocabularyCard as VocabCard } from '../../types';

interface VocabularyCardProps {
  card: VocabCard;
  onMarkLearned: (cardId: string) => void;
  onPlayAudio: (word: string) => void;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({ card, onMarkLearned, onPlayAudio }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className={`flip-card ${isFlipped ? 'flipped' : ''} h-80`}>
        <div className="flip-card-inner">
          {/* Front Side */}
          <div className="flip-card-front bg-white shadow-lg border border-gray-200 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(card.difficulty)}`}>
                  {card.difficulty}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {card.category}
                </span>
              </div>

              {card.imageUrl && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={card.imageUrl} 
                    alt={card.word}
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}

              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {card.word}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {card.pronunciation}
                </p>
                <button
                  onClick={() => onPlayAudio(card.word)}
                  className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="text-sm">ฟังเสียง</span>
                </button>
              </div>

              <div className="text-center">
                <p className="text-lg text-gray-700 mb-2">
                  {card.translation}
                </p>
                <p className="text-sm text-gray-600">
                  {card.definition}
                </p>
              </div>
            </div>

            <button
              onClick={handleFlip}
              className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ดูตัวอย่าง</span>
            </button>
          </div>

          {/* Back Side */}
          <div className="flip-card-back bg-gradient-to-br from-primary-500 to-secondary-500 text-white p-6 flex flex-col justify-between">
            <div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{card.word}</h3>
                <p className="text-primary-100">ตัวอย่างการใช้</p>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white mb-2 font-medium">
                    "{card.example}"
                  </p>
                  {showAnswer && (
                    <p className="text-primary-100 text-sm animate-fade-in">
                      "{card.exampleTranslation}"
                    </p>
                  )}
                </div>

                {!showAnswer && (
                  <button
                    onClick={handleShowAnswer}
                    className="w-full bg-white/20 text-white py-2 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    แสดงคำแปล
                  </button>
                )}
              </div>

              <div className="mt-6 text-center">
                <p className="text-primary-100 text-sm mb-2">
                  ทบทวนแล้ว {card.reviewCount} ครั้ง
                </p>
                {card.isLearned && (
                  <div className="flex items-center justify-center space-x-1 text-green-300">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">เรียนรู้แล้ว</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {!card.isLearned && (
                <button
                  onClick={() => onMarkLearned(card.id)}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>เรียนรู้แล้ว</span>
                </button>
              )}
              
              <button
                onClick={handleFlip}
                className="w-full bg-white/20 text-white py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>กลับ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyCard;