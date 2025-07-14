import React from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion } from '../data/quiz';
import Button from './Button';

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
  currentQuestion: number;
  totalQuestions: number;
  showExplanation: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  currentQuestion,
  totalQuestions,
  showExplanation
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectAnswer(index)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedAnswer === index
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <span className="w-6 h-6 rounded-full border-2 border-current mr-3 flex items-center justify-center text-sm">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </div>
          </motion.button>
        ))}
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
        >
          <p className="text-blue-800">{question.explanation}</p>
        </motion.div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={selectedAnswer === null}
          className="min-w-32"
        >
          {currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </motion.div>
  );
};

export default QuizCard;