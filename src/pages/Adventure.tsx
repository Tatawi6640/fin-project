import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stages, Stage } from '../data/stages';
import { useProgress } from '../hooks/useProgress';
import StageCard from '../components/StageCard';
import CodeEditor from '../components/CodeEditor';
import Button from '../components/Button';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

const Adventure: React.FC = () => {
  const { progress, completeStage } = useProgress();
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [currentTask, setCurrentTask] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  // Update stage unlock logic
  const getUnlockedStages = () => {
    const updatedStages = stages.map((stage, index) => ({
      ...stage,
      unlocked: index === 0 || progress.completedStages.includes(stages[index - 1].id),
      completed: progress.completedStages.includes(stage.id)
    }));
    return updatedStages;
  };

  const handleStartStage = (stage: Stage) => {
    setSelectedStage(stage);
    setCurrentTask(0);
    setCompletedTasks([]);
  };

  const handleCompleteTask = () => {
    if (!selectedStage) return;
    
    const newCompletedTasks = [...completedTasks, currentTask];
    setCompletedTasks(newCompletedTasks);
    
    if (currentTask < selectedStage.tasks.length - 1) {
      setCurrentTask(currentTask + 1);
    } else {
      // All tasks completed
      completeStage(selectedStage.id, selectedStage.xp);
      setSelectedStage(null);
    }
  };

  const handleSaveCode = (code: string) => {
    console.log('Code saved:', code);
  };

  const handleRunCode = (code: string) => {
    console.log('Running code:', code);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Adventure Mode</h1>
          <p className="text-xl text-gray-600">Build real projects and level up your skills</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getUnlockedStages().map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StageCard
                stage={stage}
                onStartStage={handleStartStage}
                isCompleted={progress.completedStages.includes(stage.id)}
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedStage && (
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
                className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedStage.title}</h2>
                      <p className="text-gray-600">{selectedStage.description}</p>
                    </div>
                    <Button onClick={() => setSelectedStage(null)} variant="secondary" size="sm">
                      <X size={16} />
                    </Button>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Task {currentTask + 1} of {selectedStage.tasks.length}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {selectedStage.tasks.map((_, index) => (
                          <div
                            key={index}
                            className={`w-3 h-3 rounded-full ${
                              completedTasks.includes(index)
                                ? 'bg-green-500'
                                : index === currentTask
                                ? 'bg-blue-500'
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 mb-4">
                      <p className="text-blue-800 font-medium">
                        {selectedStage.tasks[currentTask]}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <CodeEditor
                      initialCode={selectedStage.codeTemplate}
                      onSave={handleSaveCode}
                      onRun={handleRunCode}
                      language="javascript"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">
                        Progress: {completedTasks.length} / {selectedStage.tasks.length} tasks
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <Button onClick={() => setSelectedStage(null)} variant="secondary">
                        Close
                      </Button>
                      <Button onClick={handleCompleteTask} variant="success">
                        {currentTask === selectedStage.tasks.length - 1 ? (
                          <>
                            <CheckCircle className="mr-2" size={16} />
                            Complete Stage
                          </>
                        ) : (
                          <>
                            <ArrowRight className="mr-2" size={16} />
                            Next Task
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-lg p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready for the Challenge?</h2>
          <p className="text-xl mb-6 opacity-90">
            Complete all stages to unlock your personal portfolio template and become a certified Dev & Tatawi developer!
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <p className="text-2xl font-bold">{progress.completedStages.length}</p>
              <p className="text-sm">Completed</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <p className="text-2xl font-bold">{stages.length - progress.completedStages.length}</p>
              <p className="text-sm">Remaining</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Adventure;