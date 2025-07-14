import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Play, Save, RotateCcw } from 'lucide-react';
import Button from './Button';

interface CodeEditorProps {
  initialCode: string;
  onSave: (code: string) => void;
  onRun?: (code: string) => void;
  language?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  onSave,
  onRun,
  language = 'javascript'
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');

  const handleRun = () => {
    if (onRun) {
      onRun(code);
    }
    setOutput('Code executed successfully!');
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code size={20} />
          <span className="font-medium">Code Editor ({language})</span>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" onClick={handleReset} variant="secondary">
            <RotateCcw size={16} />
          </Button>
          {onRun && (
            <Button size="sm" onClick={handleRun} variant="success">
              <Play size={16} />
            </Button>
          )}
          <Button size="sm" onClick={() => onSave(code)}>
            <Save size={16} />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="Write your code here..."
        />
        
        {output && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
            <h4 className="font-medium text-green-800 mb-2">Output:</h4>
            <pre className="text-sm text-green-700">{output}</pre>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CodeEditor;