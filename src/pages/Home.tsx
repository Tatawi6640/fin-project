import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Gamepad2, Star, Trophy, Target, Award } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import Button from '../components/Button';

const Home: React.FC = () => {
  const { progress } = useProgress();

  const isEligibleForCertificate = () => {
    return progress.completedLessons.length >= 2 || 
           progress.completedQuizzes.length >= 1 || 
           progress.completedStages.length >= 1;
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Learn HTML, CSS, and JavaScript with hands-on examples',
      link: '/lessons',
      color: 'bg-blue-500'
    },
    {
      icon: Brain,
      title: 'JavaScript Quiz',
      description: 'Test your knowledge with challenging questions',
      link: '/quiz',
      color: 'bg-purple-500'
    },
    {
      icon: Gamepad2,
      title: 'Adventure Mode',
      description: 'Build real projects in a gamified environment',
      link: '/adventure',
      color: 'bg-green-500'
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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome back, <span className="text-indigo-600">Alae!</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Continue your coding journey with interactive lessons, challenging quizzes, and hands-on projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-4">
                <Trophy className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Level {progress.level}</h3>
              <p className="text-gray-600">Current Level</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4">
                <Star className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{progress.xp} XP</h3>
              <p className="text-gray-600">Experience Points</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                <Target className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {progress.completedLessons.length + progress.completedQuizzes.length + progress.completedStages.length}
              </h3>
              <p className="text-gray-600">Completed Activities</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className={`flex items-center justify-center w-16 h-16 ${feature.color} rounded-full mx-auto mb-6`}>
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center mb-6">{feature.description}</p>
              <Link to={feature.link} className="block">
                <Button className="w-full">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of developers who are mastering web development with Dev & Tatawi
          </p>
          <Link to="/adventure">
            <Button variant="secondary" size="lg">
              Start Your Adventure
            </Button>
          </Link>
        </motion.div>
      </div>
        {/* Certificate Banner */}
        {isEligibleForCertificate() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-8 text-white text-center mb-8"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-4">
              <Award className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4">🎓 Certificate Ready!</h2>
            <p className="text-xl mb-6 opacity-90">
              Congratulations! You've earned your Dev & Tatawi certificate. Download and share your achievement!
            </p>
            <Link to="/certificate">
              <Button variant="secondary" size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Get Your Certificate
              </Button>
            </Link>
          </motion.div>
        )}

    </div>
  );
};

export default Home;