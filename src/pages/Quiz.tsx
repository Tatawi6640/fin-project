import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '../data/quiz';
import { useQuiz } from '../hooks/useQuiz';
import { useProgress } from '../hooks/useProgress';
import QuizCard from '../components/QuizCard';
import Button from '../components/Button';
import { Trophy, RotateCcw, Star } from 'lucide-react';

const Quiz: React.FC = () => {
  const { progress, completeQuiz } = useProgress();
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const {
    currentQuestion,
    selectedAnswer,
    score,
    showResult,
    handleAnswer,
    nextQuestion,
    resetQuiz,
    getScorePercentage,
    getXPEarned
  } = useQuiz(quizQuestions);

  const startQuiz = () => {
    setQuizStarted(true);
    resetQuiz();
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setShowExplanation(true);
      setTimeout(() => {
        setShowExplanation(false);
        nextQuestion();
      }, 2000);
    }
  };

  const handleRestart = () => {
    setQuizStarted(false);
    resetQuiz();
  };

  const handleQuizComplete = () => {
    completeQuiz('javascript-quiz', getXPEarned());
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full mx-auto mb-8">
                <Trophy className="text-purple-600" size={48} />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">JavaScript Knowledge Quiz</h1>
              <p className="text-xl text-gray-600 mb-8">
                Test your JavaScript skills with 12 challenging questions
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <h3 className="text-2xl font-bold text-blue-600">12</h3>
                  <p className="text-blue-600">Questions</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <h3 className="text-2xl font-bold text-green-600">~10</h3>
                  <p className="text-green-600">Minutes</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <h3 className="text-2xl font-bold text-yellow-600">100</h3>
                  <p className="text-yellow-600">Max XP</p>
                </div>
              </div>

              <Button onClick={startQuiz} size="lg" className="px-12">
                Start Quiz
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mx-auto mb-8">
                <Trophy className="text-green-600" size={48} />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Great job! Here are your results:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <h3 className="text-3xl font-bold text-blue-600">{score}/{quizQuestions.length}</h3>
                  <p className="text-blue-600">Correct Answers</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <h3 className="text-3xl font-bold text-green-600">{getScorePercentage()}%</h3>
                  <p className="text-green-600">Score</p>
                </div>
                <div className="text-center p-6 bg-yellow-50 rounded-xl">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="text-yellow-600 mr-1" size={20} />
                    <h3 className="text-3xl font-bold text-yellow-600">{getXPEarned()}</h3>
                  </div>
                  <p className="text-yellow-600">XP Earned</p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={handleRestart} variant="secondary" size="lg">
                  <RotateCcw className="mr-2" size={20} />
                  Retake Quiz
                </Button>
                <Button onClick={handleQuizComplete} size="lg">
                  Continue Learning
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <QuizCard
            key={currentQuestion}
            question={quizQuestions[currentQuestion]}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleAnswer}
            onNext={handleNext}
            currentQuestion={currentQuestion}
            totalQuestions={quizQuestions.length}
            showExplanation={showExplanation}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;