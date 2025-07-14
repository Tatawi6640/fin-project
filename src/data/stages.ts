export interface Stage {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  unlocked: boolean;
  tasks: string[];
  codeTemplate: string;
}

export const stages: Stage[] = [
  {
    id: 'stage1',
    title: 'HTML & Git Basics',
    description: 'Learn HTML structure and version control with Git',
    xp: 100,
    completed: false,
    unlocked: true,
    tasks: [
      'Create a basic HTML document',
      'Add headings and paragraphs',
      'Initialize a Git repository',
      'Make your first commit'
    ],
    codeTemplate: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <!-- Add your content here -->
</body>
</html>`
  },
  {
    id: 'stage2',
    title: 'CSS & Flexbox Styling',
    description: 'Style your webpage with CSS and master Flexbox layouts',
    xp: 150,
    completed: false,
    unlocked: false,
    tasks: [
      'Add CSS styles to your HTML',
      'Create a flexbox layout',
      'Add colors and typography',
      'Make it responsive'
    ],
    codeTemplate: `/* Add your CSS styles here */
.container {
    display: flex;
    /* Add flexbox properties */
}

.item {
    /* Style your items */
}`
  },
  {
    id: 'stage3',
    title: 'JavaScript ToDo App',
    description: 'Build a dynamic ToDo application with JavaScript',
    xp: 200,
    completed: false,
    unlocked: false,
    tasks: [
      'Create HTML structure for ToDo app',
      'Add JavaScript functionality',
      'Implement add/remove tasks',
      'Add local storage'
    ],
    codeTemplate: `// ToDo App JavaScript
const todos = [];

function addTodo(text) {
    // Implement add functionality
}

function removeTodo(index) {
    // Implement remove functionality
}

// Add more functions here`
  },
  {
    id: 'stage4',
    title: 'React & Tailwind Refactor',
    description: 'Convert your ToDo app to React with Tailwind CSS',
    xp: 250,
    completed: false,
    unlocked: false,
    tasks: [
      'Set up React components',
      'Add Tailwind CSS styling',
      'Implement state management',
      'Add component interactions'
    ],
    codeTemplate: `import React, { useState } from 'react';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    
    // Implement your React component
    
    return (
        <div className="container mx-auto p-4">
            {/* Add your JSX here */}
        </div>
    );
}`
  },
  {
    id: 'stage5',
    title: 'Deploy Personal Portfolio',
    description: 'Create and deploy your personal portfolio website',
    xp: 300,
    completed: false,
    unlocked: false,
    tasks: [
      'Design portfolio layout',
      'Add your projects',
      'Optimize for performance',
      'Deploy to production'
    ],
    codeTemplate: `// Portfolio Template
import React from 'react';

function Portfolio() {
    return (
        <div>
            <header>
                <h1>Your Name</h1>
                <p>Your Title</p>
            </header>
            <main>
                {/* Add your portfolio content */}
            </main>
        </div>
    );
}`
  }
];