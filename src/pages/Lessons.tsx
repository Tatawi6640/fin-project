import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lessons, Lesson } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import LessonCard from '../components/LessonCard';
import Button from '../components/Button';
import { X, CheckCircle } from 'lucide-react';

const Lessons: React.FC = () => {
  const { progress, completeLesson } = useProgress();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [filter, setFilter] = useState<'all' | 'html' | 'css' | 'javascript'>('all');

  const filteredLessons = filter === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === filter);

  const handleStartLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCompleteLesson = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      completeLesson(lessonId, lesson.xp);
    }
  };

  const closeLessonModal = () => {
    setSelectedLesson(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interactive Lessons</h1>
          <p className="text-xl text-gray-600">Master web development with hands-on lessons</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['all', 'html', 'css', 'javascript'].map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category as any)}
              variant={filter === category ? 'primary' : 'secondary'}
              size="sm"
            >
              {category === 'all' ? 'All Lessons' : category.toUpperCase()}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <LessonCard
                lesson={lesson}
                onStartLesson={handleStartLesson}
                onCompleteLesson={handleCompleteLesson}
                isCompleted={progress.completedLessons.includes(lesson.id)}
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedLesson && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedLesson.title}</h2>
                      <p className="text-gray-600">{selectedLesson.summary}</p>
                    </div>
                    <Button onClick={closeLessonModal} variant="secondary" size="sm">
                      <X size={16} />
                    </Button>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Lesson Content</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedLesson.content}</p>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Code Example</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{selectedLesson.codeExample}</code>
                    </pre>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Mini Quiz</h3>
                    <p className="text-blue-700 mb-4">
                      What is the main purpose of {selectedLesson.category.toUpperCase()}?
                    </p>
                    <div className="space-y-2">
                      <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-blue-100 transition-colors">
                        A) To create interactive web applications
                      </button>
                      <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-blue-100 transition-colors">
                        B) To style web pages
                      </button>
                      <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-blue-100 transition-colors">
                        C) To structure web content
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {progress.completedLessons.includes(selectedLesson.id) && (
                        <>
                          <CheckCircle className="text-green-600" size={20} />
                          <span className="text-green-600 font-medium">Completed</span>
                        </>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <Button onClick={closeLessonModal} variant="secondary">
                        Close
                      </Button>
                      {!progress.completedLessons.includes(selectedLesson.id) && (
                        <Button
                          onClick={() => {
                            handleCompleteLesson(selectedLesson.id);
                            closeLessonModal();
                          }}
                          variant="success"
                        >
                          Mark as Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Lessons;