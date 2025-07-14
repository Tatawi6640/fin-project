import { useState } from 'react';
import { QuizQuestion } from '../data/quiz';

export const useQuiz = (questions: QuizQuestion[]) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
  };

  const getScorePercentage = () => {
    return Math.round((score / questions.length) * 100);
  };

  const getXPEarned = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return 100;
    if (percentage >= 80) return 80;
    if (percentage >= 70) return 60;
    if (percentage >= 60) return 40;
    return 20;
  };

  return {
    currentQuestion,
    selectedAnswer,
    score,
    showResult,
    answers,
    handleAnswer,
    nextQuestion,
    resetQuiz,
    getScorePercentage,
    getXPEarned
  };
};