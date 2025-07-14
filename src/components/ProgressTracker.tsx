import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Target } from 'lucide-react';
import { UserProgress } from '../hooks/useProgress';

interface ProgressTrackerProps {
  progress: UserProgress;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  const getXPToNextLevel = () => {
    const currentLevelXP = (progress.level - 1) * 100;
    const nextLevelXP = progress.level * 100;
    return nextLevelXP - progress.xp;
  };

  const getXPProgress = () => {
    const currentLevelXP = (progress.level - 1) * 100;
    const nextLevelXP = progress.level * 100;
    const progressInLevel = progress.xp - currentLevelXP;
    const totalXPInLevel = nextLevelXP - currentLevelXP;
    return (progressInLevel / totalXPInLevel) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Progress Overview</h3>
        <div className="flex items-center space-x-2">
          <Trophy className="text-yellow-600" size={24} />
          <span className="text-lg font-bold text-yellow-600">Level {progress.level}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Experience Points</span>
          <span className="text-sm font-bold text-indigo-600">{progress.xp} XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${getXPProgress()}%` }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full"
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {getXPToNextLevel()} XP to next level
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <Target className="text-blue-600 mx-auto mb-2" size={24} />
          <p className="text-2xl font-bold text-blue-600">{progress.completedLessons.length}</p>
          <p className="text-sm text-blue-600">Lessons</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <Star className="text-green-600 mx-auto mb-2" size={24} />
          <p className="text-2xl font-bold text-green-600">{progress.completedQuizzes.length}</p>
          <p className="text-sm text-green-600">Quizzes</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-xl">
          <Trophy className="text-purple-600 mx-auto mb-2" size={24} />
          <p className="text-2xl font-bold text-purple-600">{progress.completedStages.length}</p>
          <p className="text-sm text-purple-600">Stages</p>
        </div>
      </div>

      {progress.badges.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Badges</h4>
          <div className="flex flex-wrap gap-2">
            {progress.badges.map((badge, index) => (
              <span
                key={index}
                className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProgressTracker;