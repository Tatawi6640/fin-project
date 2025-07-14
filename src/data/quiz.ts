export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the correct way to declare a variable in JavaScript?',
    options: ['var myVar = 5;', 'variable myVar = 5;', 'v myVar = 5;', 'declare myVar = 5;'],
    correctAnswer: 0,
    explanation: 'The "var" keyword is used to declare variables in JavaScript.'
  },
  {
    id: 'q2',
    question: 'Which operator is used for strict equality in JavaScript?',
    options: ['=', '==', '===', '!='],
    correctAnswer: 2,
    explanation: 'The "===" operator checks for strict equality (same value and type).'
  },
  {
    id: 'q3',
    question: 'What does DOM stand for?',
    options: ['Document Object Model', 'Data Object Management', 'Dynamic Object Method', 'Document Oriented Model'],
    correctAnswer: 0,
    explanation: 'DOM stands for Document Object Model, which represents the page structure.'
  },
  {
    id: 'q4',
    question: 'Which method is used to add an event listener in JavaScript?',
    options: ['attachEvent()', 'addEventListener()', 'addEvent()', 'listen()'],
    correctAnswer: 1,
    explanation: 'addEventListener() is the standard method to add event listeners.'
  },
  {
    id: 'q5',
    question: 'What is the result of "3" + 2 in JavaScript?',
    options: ['5', '32', 'Error', 'undefined'],
    correctAnswer: 1,
    explanation: 'JavaScript concatenates the string "3" with the number 2, resulting in "32".'
  },
  {
    id: 'q6',
    question: 'Which loop is best for iterating over arrays?',
    options: ['for loop', 'while loop', 'do-while loop', 'all of the above'],
    correctAnswer: 3,
    explanation: 'All loop types can iterate over arrays, but each has different use cases.'
  },
  {
    id: 'q7',
    question: 'What is the purpose of the "return" statement in a function?',
    options: ['To stop the function', 'To output a value', 'To restart the function', 'To declare a variable'],
    correctAnswer: 1,
    explanation: 'The "return" statement outputs a value from a function and stops execution.'
  },
  {
    id: 'q8',
    question: 'Which method is used to find an element by its ID?',
    options: ['getElementsById()', 'getElementById()', 'findById()', 'selectById()'],
    correctAnswer: 1,
    explanation: 'getElementById() is the method to find an element by its ID attribute.'
  },
  {
    id: 'q9',
    question: 'What is the difference between "let" and "var"?',
    options: ['No difference', 'let has block scope', 'var has block scope', 'let is older'],
    correctAnswer: 1,
    explanation: 'let has block scope, while var has function scope.'
  },
  {
    id: 'q10',
    question: 'Which event is fired when a page finishes loading?',
    options: ['onready', 'onload', 'onstart', 'onfinish'],
    correctAnswer: 1,
    explanation: 'The "onload" event is fired when a page finishes loading.'
  },
  {
    id: 'q11',
    question: 'What is the correct syntax for an if statement?',
    options: ['if i = 5 then', 'if (i == 5)', 'if i == 5', 'if (i = 5)'],
    correctAnswer: 1,
    explanation: 'The correct syntax is if (condition) with parentheses around the condition.'
  },
  {
    id: 'q12',
    question: 'Which method adds an element to the end of an array?',
    options: ['add()', 'append()', 'push()', 'insert()'],
    correctAnswer: 2,
    explanation: 'The push() method adds elements to the end of an array.'
  }
];