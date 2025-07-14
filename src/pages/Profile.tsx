import React from 'react';
import { motion } from 'framer-motion';
import { User, Download, Star, Trophy, Target, Award, ExternalLink } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import ProgressTracker from '../components/ProgressTracker';
import Button from '../components/Button';

const Profile: React.FC = () => {
  const { progress, exportData } = useProgress();

  const handleExportData = () => {
    const dataStr = exportData();
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'dev-tatawi-progress.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const isEligibleForCertificate = () => {
    return progress.completedLessons.length >= 2 || 
           progress.completedQuizzes.length >= 1 || 
           progress.completedStages.length >= 1;
  };

  const achievements = [
    {
      id: 'first-lesson',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: Target,
      earned: progress.completedLessons.length > 0
    },
    {
      id: 'quiz-master',
      title: 'Quiz Master',
      description: 'Complete a quiz with 80% or higher',
      icon: Trophy,
      earned: progress.completedQuizzes.length > 0
    },
    {
      id: 'stage-warrior',
      title: 'Stage Warrior',
      description: 'Complete your first adventure stage',
      icon: Award,
      earned: progress.completedStages.length > 0
    },
    {
      id: 'xp-collector',
      title: 'XP Collector',
      description: 'Earn 500 XP',
      icon: Star,
      earned: progress.xp >= 500
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center w-24 h-24 bg-indigo-100 rounded-full mx-auto mb-6">
            <User className="text-indigo-600" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, Alae!</h1>
          <p className="text-xl text-gray-600">Your learning journey with Dev & Tatawi</p>
        </motion.div>

        {/* Certificate Section */}
        {isEligibleForCertificate() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-8 text-white mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">🎓 Certificate Available!</h3>
                <p className="text-lg opacity-90">
                  You've earned your certificate! Download and share your achievement.
                </p>
              </div>
              <Button 
                onClick={() => window.location.href = '/certificate'} 
                variant="secondary" 
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                <ExternalLink className="mr-2" size={20} />
                View Certificate
              </Button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <ProgressTracker progress={progress} />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button onClick={handleExportData} variant="secondary" className="w-full">
                <Download className="mr-2" size={16} />
                Export Progress
              </Button>
              {isEligibleForCertificate() && (
                <Button 
                  onClick={() => window.location.href = '/certificate'} 
                  variant="success" 
                  className="w-full"
                >
                  <Award className="mr-2" size={16} />
                  Get Certificate
                </Button>
              )}
              <div className="text-sm text-gray-600 mt-4">
                <p>Level: {progress.level}</p>
                <p>Total XP: {progress.xp}</p>
                <p>Lessons Completed: {progress.completedLessons.length}</p>
                <p>Quizzes Completed: {progress.completedQuizzes.length}</p>
                <p>Stages Completed: {progress.completedStages.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-6 rounded-xl text-center transition-all duration-200 ${
                  achievement.earned
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <div className={`flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4 ${
                  achievement.earned ? 'bg-yellow-100' : 'bg-gray-200'
                }`}>
                  <achievement.icon
                    className={achievement.earned ? 'text-yellow-600' : 'text-gray-400'}
                    size={32}
                  />
                </div>
                <h4 className={`text-lg font-semibold mb-2 ${
                  achievement.earned ? 'text-yellow-800' : 'text-gray-500'
                }`}>
                  {achievement.title}
                </h4>
                <p className={`text-sm ${
                  achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>
                {achievement.earned && (
                  <div className="mt-3">
                    <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                      Earned
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;