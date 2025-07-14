import { useState, useEffect } from 'react';

export interface UserProgress {
  xp: number;
  level: number;
  completedLessons: string[];
  completedQuizzes: string[];
  completedStages: string[];
  badges: string[];
}

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>({
    xp: 0,
    level: 1,
    completedLessons: [],
    completedQuizzes: [],
    completedStages: [],
    badges: []
  });

  useEffect(() => {
    const savedProgress = localStorage.getItem('devTatawiProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('devTatawiProgress', JSON.stringify(newProgress));
  };

  const addXP = (xp: number) => {
    const newProgress = { ...progress, xp: progress.xp + xp };
    newProgress.level = Math.floor(newProgress.xp / 100) + 1;
    saveProgress(newProgress);
  };

  const completeLesson = (lessonId: string, xp: number) => {
    if (!progress.completedLessons.includes(lessonId)) {
      const newProgress = {
        ...progress,
        completedLessons: [...progress.completedLessons, lessonId]
      };
      saveProgress(newProgress);
      addXP(xp);
    }
  };

  const completeQuiz = (quizId: string, xp: number) => {
    if (!progress.completedQuizzes.includes(quizId)) {
      const newProgress = {
        ...progress,
        completedQuizzes: [...progress.completedQuizzes, quizId]
      };
      saveProgress(newProgress);
      addXP(xp);
    }
  };

  const completeStage = (stageId: string, xp: number) => {
    if (!progress.completedStages.includes(stageId)) {
      const newProgress = {
        ...progress,
        completedStages: [...progress.completedStages, stageId]
      };
      saveProgress(newProgress);
      addXP(xp);
    }
  };

  const addBadge = (badge: string) => {
    if (!progress.badges.includes(badge)) {
      const newProgress = {
        ...progress,
        badges: [...progress.badges, badge]
      };
      saveProgress(newProgress);
    }
  };

  const exportData = () => {
    return JSON.stringify(progress, null, 2);
  };

  return {
    progress,
    addXP,
    completeLesson,
    completeQuiz,
    completeStage,
    addBadge,
    exportData
  };
};