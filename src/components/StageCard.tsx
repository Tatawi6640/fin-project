import React from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Lock, Star } from 'lucide-react';
import { Stage } from '../data/stages';
import Button from './Button';

interface StageCardProps {
  stage: Stage;
  onStartStage: (stage: Stage) => void;
  isCompleted: boolean;
}

const StageCard: React.FC<StageCardProps> = ({ stage, onStartStage, isCompleted }) => {
  const getStageIcon = () => {
    if (isCompleted) return <CheckCircle className="text-green-600" size={32} />;
    if (!stage.unlocked) return <Lock className="text-gray-400" size={32} />;
    return <Play className="text-indigo-600" size={32} />;
  };

  const getStageColor = () => {
    if (isCompleted) return 'border-green-200 bg-green-50';
    if (!stage.unlocked) return 'border-gray-200 bg-gray-50';
    return 'border-indigo-200 bg-indigo-50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: stage.unlocked ? 1.05 : 1 }}
      className={`relative bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 border-2 ${getStageColor()}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStageIcon()}
          <div>
            <h3 className="text-xl font-bold text-gray-800">{stage.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="text-yellow-600" size={16} />
              <span className="text-sm font-medium text-yellow-600">{stage.xp} XP</span>
            </div>
          </div>
        </div>
        {isCompleted && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Completed
          </div>
        )}
      </div>

      <p className="text-gray-600 mb-4">{stage.description}</p>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Tasks:</h4>
        <ul className="space-y-1">
          {stage.tasks.map((task, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-indigo-400 rounded-full" />
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={() => onStartStage(stage)}
        disabled={!stage.unlocked}
        className="w-full"
        variant={isCompleted ? 'success' : 'primary'}
      >
        {isCompleted ? 'Review Stage' : !stage.unlocked ? 'Locked' : 'Start Stage'}
      </Button>
    </motion.div>
  );
};

export default StageCard;