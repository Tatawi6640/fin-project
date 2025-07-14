import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Award, Calendar, Star } from 'lucide-react';
import { UserProgress } from '../hooks/useProgress';
import Button from './Button';

interface CertificateProps {
  progress: UserProgress;
  studentName: string;
  onShare: (platform: 'linkedin' | 'twitter' | 'github') => void;
  onDownload: () => void;
}

const Certificate: React.FC<CertificateProps> = ({
  progress,
  studentName,
  onShare,
  onDownload
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getCertificateTitle = () => {
    if (progress.completedStages.length >= 5) return 'Full-Stack Developer';
    if (progress.completedStages.length >= 3) return 'Front-End Explorer';
    if (progress.completedLessons.length >= 4) return 'Web Development Fundamentals';
    return 'JavaScript Specialist';
  };

  const getCompletionLevel = () => {
    const totalActivities = progress.completedLessons.length + 
                           progress.completedQuizzes.length + 
                           progress.completedStages.length;
    
    if (totalActivities >= 15) return 'Advanced';
    if (totalActivities >= 10) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Certificate Display */}
      <div
        ref={certificateRef}
        className="bg-white p-12 rounded-3xl shadow-2xl border-8 border-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #fefefe 0%, #f8f9fa 100%)',
          border: '8px solid',
          borderImage: 'linear-gradient(45deg, #fbbf24, #f59e0b, #d97706) 1'
        }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full opacity-20 -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-indigo-200 to-purple-300 rounded-full opacity-20 translate-x-20 translate-y-20" />
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold text-xl">DT</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dev & Tatawi</h1>
              <p className="text-gray-600">Interactive Learning Platform</p>
            </div>
          </div>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
        </div>

        {/* Certificate Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-gray-700 mb-6">Certificate of Achievement</h2>
          
          <div className="mb-6">
            <p className="text-lg text-gray-600 mb-2">This is to certify that</p>
            <h3 className="text-4xl font-bold text-gray-900 mb-2 font-serif">{studentName}</h3>
            <p className="text-lg text-gray-600">has successfully completed</p>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
            <h4 className="text-2xl font-bold text-indigo-800 mb-2">{getCertificateTitle()}</h4>
            <p className="text-indigo-600 text-lg">{getCompletionLevel()} Level Completed</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                <Star className="text-blue-600" size={24} />
              </div>
              <p className="text-sm text-gray-600">Total XP</p>
              <p className="text-xl font-bold text-blue-600">{progress.xp}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                <Award className="text-green-600" size={24} />
              </div>
              <p className="text-sm text-gray-600">Level</p>
              <p className="text-xl font-bold text-green-600">{progress.level}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-bold text-purple-600">{currentDate}</p>
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="border-t-2 border-gray-200 pt-6">
          <div className="flex justify-between items-end">
            <div className="text-left">
              <div className="w-48 border-b-2 border-gray-400 mb-2"></div>
              <p className="text-sm text-gray-600">Student Signature</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="text-white" size={32} />
              </div>
              <p className="text-xs text-gray-500">Official Seal</p>
            </div>
            <div className="text-right">
              <div className="w-48 border-b-2 border-gray-400 mb-2 ml-auto"></div>
              <p className="text-sm text-gray-600">Instructor: El Houssaine Ouahad</p>
              <p className="text-xs text-gray-500">Certified Developer & Educator</p>
            </div>
          </div>
        </div>

        {/* Certificate ID */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">
            Certificate ID: DT-{progress.level}-{Date.now().toString().slice(-6)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button onClick={onDownload} size="lg" className="flex items-center">
          <Download className="mr-2" size={20} />
          Download Certificate
        </Button>
        
        <div className="flex gap-2">
          <Button
            onClick={() => onShare('linkedin')}
            variant="secondary"
            size="lg"
            className="flex items-center bg-blue-600 text-white hover:bg-blue-700"
          >
            <Share2 className="mr-2" size={16} />
            LinkedIn
          </Button>
          <Button
            onClick={() => onShare('twitter')}
            variant="secondary"
            size="lg"
            className="flex items-center bg-sky-500 text-white hover:bg-sky-600"
          >
            <Share2 className="mr-2" size={16} />
            Twitter
          </Button>
          <Button
            onClick={() => onShare('github')}
            variant="secondary"
            size="lg"
            className="flex items-center bg-gray-800 text-white hover:bg-gray-900"
          >
            <Share2 className="mr-2" size={16} />
            GitHub
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Certificate;