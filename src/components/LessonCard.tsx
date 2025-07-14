import React from 'react';
import { motion } from 'framer-motion';
import { Book, CheckCircle, Star } from 'lucide-react';
import { Lesson } from '../data/lessons';
import Button from './Button';

interface LessonCardProps {
  lesson: Lesson;
  onStartLesson: (lesson: Lesson) => void;
  onCompleteLesson: (lessonId: string) => void;
  isCompleted: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({ 
  lesson, 
  onStartLesson, 
  onCompleteLesson, 
  isCompleted 
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'html': return 'bg-orange-100 text-orange-800';
      case 'css': return 'bg-blue-100 text-blue-800';
      case 'javascript': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Book className="text-indigo-600" size={24} />
          <h3 className="text-xl font-bold text-gray-800">{lesson.title}</h3>
        </div>
        {isCompleted && (
          <CheckCircle className="text-green-600" size={24} />
        )}
      </div>
      
      <p className="text-gray-600 mb-4">{lesson.summary}</p>
      
      <div className="flex items-center space-x-2 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(lesson.category)}`}>
          {lesson.category.toUpperCase()}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
          {lesson.difficulty}
        </span>
        <div className="flex items-center space-x-1 text-yellow-600">
          <Star size={16} />
          <span className="text-sm font-medium">{lesson.xp} XP</span>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <pre className="text-sm text-gray-700 overflow-x-auto">
          <code>{lesson.codeExample}</code>
        </pre>
      </div>
      
      <div className="flex space-x-3">
        <Button onClick={() => onStartLesson(lesson)} className="flex-1">
          Start Lesson
        </Button>
        {!isCompleted && (
          <Button 
            onClick={() => onCompleteLesson(lesson.id)} 
            variant="success"
            className="flex-1"
          >
            Mark Complete
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default LessonCard;