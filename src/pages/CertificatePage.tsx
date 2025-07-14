import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import Certificate from '../components/Certificate';
import Button from '../components/Button';
import { Award, Edit3, Check } from 'lucide-react';

const CertificatePage: React.FC = () => {
  const { progress } = useProgress();
  const [studentName, setStudentName] = useState('Alae');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName);

  const isEligibleForCertificate = () => {
    return progress.completedLessons.length >= 2 || 
           progress.completedQuizzes.length >= 1 || 
           progress.completedStages.length >= 1;
  };

  const handleDownload = () => {
    // Create a canvas to convert the certificate to image
    const certificateElement = document.querySelector('[data-certificate]') as HTMLElement;
    if (certificateElement) {
      // In a real implementation, you would use html2canvas or similar library
      // For now, we'll simulate the download
      const link = document.createElement('a');
      link.download = `dev-tatawi-certificate-${studentName.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = '#'; // Would be the actual image data URL
      
      // Simulate download
      alert('Certificate download started! (In production, this would download a PNG file)');
    }
  };

  const handleShare = (platform: 'linkedin' | 'twitter' | 'github') => {
    const certificateText = `🎓 Just earned my ${getCertificateTitle()} certificate from Dev & Tatawi! 
    
Level ${progress.level} • ${progress.xp} XP earned
Completed ${progress.completedLessons.length} lessons, ${progress.completedQuizzes.length} quizzes, and ${progress.completedStages.length} adventure stages!

#WebDevelopment #JavaScript #React #Learning #DevTatawi`;

    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(certificateText)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(certificateText)}`,
      github: `https://github.com` // Could link to a portfolio or achievement
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const getCertificateTitle = () => {
    if (progress.completedStages.length >= 5) return 'Full-Stack Developer';
    if (progress.completedStages.length >= 3) return 'Front-End Explorer';
    if (progress.completedLessons.length >= 4) return 'Web Development Fundamentals';
    return 'JavaScript Specialist';
  };

  const handleNameEdit = () => {
    if (isEditingName) {
      setStudentName(tempName);
      setIsEditingName(false);
    } else {
      setTempName(studentName);
      setIsEditingName(true);
    }
  };

  if (!isEligibleForCertificate()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="flex items-center justify-center w-24 h-24 bg-yellow-100 rounded-full mx-auto mb-8">
                <Award className="text-yellow-600" size={48} />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Certificate Not Available Yet</h1>
              <p className="text-xl text-gray-600 mb-8">
                Complete at least one lesson, quiz, or adventure stage to unlock your certificate!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <h3 className="text-2xl font-bold text-blue-600">{progress.completedLessons.length}</h3>
                  <p className="text-blue-600">Lessons Completed</p>
                  <p className="text-sm text-gray-500 mt-1">Need: 2+</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <h3 className="text-2xl font-bold text-green-600">{progress.completedQuizzes.length}</h3>
                  <p className="text-green-600">Quizzes Passed</p>
                  <p className="text-sm text-gray-500 mt-1">Need: 1+</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-600">{progress.completedStages.length}</h3>
                  <p className="text-purple-600">Stages Completed</p>
                  <p className="text-sm text-gray-500 mt-1">Need: 1+</p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={() => window.location.href = '/lessons'}>
                  Start Learning
                </Button>
                <Button onClick={() => window.location.href = '/quiz'} variant="secondary">
                  Take Quiz
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center w-24 h-24 bg-yellow-100 rounded-full mx-auto mb-6">
            <Award className="text-yellow-600" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🎓 Your Certificate</h1>
          <p className="text-xl text-gray-600">Congratulations on your learning achievement!</p>
          
          {/* Name Editor */}
          <div className="mt-6 flex items-center justify-center space-x-3">
            <span className="text-gray-600">Certificate Name:</span>
            {isEditingName ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your name"
                />
                <Button onClick={handleNameEdit} size="sm" variant="success">
                  <Check size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800">{studentName}</span>
                <Button onClick={handleNameEdit} size="sm" variant="secondary">
                  <Edit3 size={16} />
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        <div data-certificate>
          <Certificate
            progress={progress}
            studentName={studentName}
            onShare={handleShare}
            onDownload={handleDownload}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Keep Learning!</h2>
          <p className="text-xl mb-6 opacity-90">
            This is just the beginning of your web development journey. Continue exploring and building amazing projects!
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => window.location.href = '/adventure'} variant="secondary" size="lg">
              Continue Adventure
            </Button>
            <Button onClick={() => window.location.href = '/lessons'} variant="secondary" size="lg">
              More Lessons
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CertificatePage;